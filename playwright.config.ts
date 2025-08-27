import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: process.env.CI ? 2 : 0,
  timeout: 45_000,
  use: {
    baseURL: process.env.BASE_URL || 'http://www.uitestingplayground.com',
    headless: process.env.CI ? true : false,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  reporter: [['html', { open: 'never' }], ['list']],
  projects: [
    { name: 'dev' },
    { name: 'staging' }
  ]
});
