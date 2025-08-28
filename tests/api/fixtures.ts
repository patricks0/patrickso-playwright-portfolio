import { test as base } from '@playwright/test';
import dotenv from 'dotenv';

// Load .env.dev locally if present, but don't fail CI if it's missing
dotenv.config({ path: '.env.dev' });

export const REQRES_BASE = process.env.API_BASE;
export const REQRES_API_KEY = process.env.API_KEY;

// Don't log secrets; if you must log, mask
console.log('Using REQRES_BASE:', REQRES_BASE ?? '(undefined)');

if (!REQRES_BASE) {
  throw new Error('Missing API_BASE. Set it in GitHub Actions env or provide .env.dev locally.');
}

export const reqresHeaders = () => {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (REQRES_API_KEY) headers['x-api-key'] = REQRES_API_KEY;
  return headers;
};

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