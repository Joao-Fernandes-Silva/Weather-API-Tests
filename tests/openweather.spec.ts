import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

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