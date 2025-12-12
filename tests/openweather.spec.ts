import { test, expect } from '@playwright/test';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

test('call API for London', async ({ request }) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) throw new Error('OPENWEATHER_API_KEY not set');

  const response = await request.get(`${BASE_URL}/weather`, {
    params: { q: 'London', appid: apiKey, units: 'metric' },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log('Temperature in London:', body.main.temp, '°C');
  
  expect(body.name).toBe('London');
  expect(body.main).toHaveProperty('temp');
});