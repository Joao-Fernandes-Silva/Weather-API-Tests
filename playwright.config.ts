import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  
  use: {
    baseURL: 'https://api.openweathermap.org/data/2.5',
  },
});