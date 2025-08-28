import { defineConfig } from '@playwright/test';
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
        baseURL: 'http://www.uitestingplayground.com',
      },
    },
    {
      name: 'staging',
      testDir: 'tests/ui/ecommerce',
      use: {
        baseURL: 'https://automationexercise.com',
      },
    },
    {
      name: 'api',
      testDir: 'tests/api',
      use: {
        baseURL: 'https://reqres.in/api',
      },
    },
  ],
});