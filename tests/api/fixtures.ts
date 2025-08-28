import { test as base } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.dev' });

export const REQRES_BASE = process.env.API_BASE;
export const REQRES_API_KEY = process.env.API_KEY;
console.log('Using REQRES_BASE:', REQRES_BASE);
console.log('Using REQRES_API_KEY:', REQRES_API_KEY);

export const reqresHeaders = () => ({
  'Content-Type': 'application/json',
  'x-api-key': REQRES_API_KEY ?? '',
});

// Convenience to build full URLs safely
export const url = (path: string) =>
  path.startsWith('http') ? path : `${REQRES_BASE}${path.startsWith('/') ? '' : '/'}${path}`;

export const test = base.extend<{ api: import('@playwright/test').APIRequestContext }>({
  api: async ({ playwright }, use) => {
    const api = await playwright.request.newContext({
      baseURL: REQRES_BASE,
      extraHTTPHeaders: reqresHeaders(),
    });
    await use(api);
    await api.dispose();
  },
});