import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
// Avoid loading local .env.dev on CI; rely on env vars set by the workflow
if (!process.env.CI) {
  dotenv.config({ path: '.env.dev' });
}
// Install allure reporter: npm install --save-dev allure-playwright

export default defineConfig({
  timeout: 45_000,
  retries: process.env.CI ? 2 : 0,
  use: {
    headless: process.env.CI ? true : false,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  reporter: [
    ['list'],
    ['html'],
    ['allure-playwright'],
  ],
  projects: [
    {
      name: 'dev',
      testDir: 'tests/ui/playground',
      use: {
        baseURL: process.env.BASE_URL || 'http://www.uitestingplayground.com',
      },
    },
    {
      name: 'staging',
      testDir: 'tests/ui/ecommerce',
      use: {
        baseURL: process.env.STAGING_BASE_URL || 'https://automationexercise.com',
      },
    },
    {
      name: 'api',
      testDir: 'tests/api',
      use: {
        baseURL: process.env.API_BASE || 'https://reqres.in/api',
      },
    },
  ],
});
