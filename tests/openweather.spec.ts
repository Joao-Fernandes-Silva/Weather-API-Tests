import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { log } from 'node:console';
import { parseArgs } from 'node:util';

dotenv.config();

const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const apiKey = process.env.OPENWEATHER_API_KEY;

console.log('API key:', process.env.OPENWEATHER_API_KEY);

test('call API for London', async ({ request }) => {
  if (!apiKey) throw new Error('Api key not set');

  const response = await request.get(`${BASE_URL}/weather`, {
    params: { q: 'London', appid: apiKey, units: 'metric' },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log('Temperature in London:', body.main.temp, '°C');
  
  expect(body.name).toBe('London');
  expect(body.main).toHaveProperty('temp');
});

test('call API for Prague', async ({ request }) => {
  if (!apiKey) throw new Error('Api key not set');
  
  const response = await request.get(`${BASE_URL}/weather`, {
    params: {appid: apiKey, q: 'Prague', units: 'metric'},
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log(`Temperature in ${body.main.name}: ${body.main.temp}°C`);
  
  expect(body.name).toBe('Prague');
  expect(body.main).toHaveProperty('temp');
});

test('call API for Lisbon', async ({ request }) => {
  if (!apiKey) throw new Error('Api key is not set');

  const response = await request.get(`${BASE_URL}/weather`, {
    params: {appid: apiKey, q: 'Lisbon', units: 'imperial'}
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log(`Temperature in ${body.main.name}: ${body.main.temp}°F`);

  expect(body.name).toBe('Lisbon');
  expect(body.main).toHaveProperty('temp');
})

test('Invalid city name', async ({ request }) =>{
  if (!apiKey) throw new Error('Api key is not set');

  const response = await request.get(`${BASE_URL}/weather`, {
    params: {appid: apiKey, q: 'InvalidCityName'}
  });

  expect(response.status()).toBe(404);

  const body = await response.json();
  console.log('Error response:', body);
  
  expect(body.message).toContain('city not found');
});

test('XMl format works', async ({  request }) => {
  if (!apiKey) throw new Error('shit aint workinf sherlock');

  const response = await request.get(`${BASE_URL}/weather`, {
    params: {appid: apiKey, q: 'Oslo', units: 'metric', mode: 'xml'}
  });

  expect(response.status()).toBe(200);

  const body = await response.text();
  console.log('XML response for Oslo', body);

  expect(body).toContain('<?xml');
  expect(body).toContain('<city');
});