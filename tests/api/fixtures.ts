import { test as base } from '@playwright/test';
import * as dotenv from 'dotenv';

// Load .env.dev locally if present, but don't fail CI if it's missing
dotenv.config({ path: '.env.dev' });

/**
 * Environment variables:
 * - API_BASE: Base URL for the API, e.g. https://reqres.in/api
 * - API_KEY:  Optional API key (added as x-api-key header)
 */
export const API_BASE = process.env.API_BASE;
export const API_KEY = process.env.API_KEY;

// Backwards-compat alias (prefer API_BASE/API_KEY going forward)
export const REQRES_BASE = API_BASE;
export const REQRES_API_KEY = API_KEY;

// Don't log secrets; if you must log, mask
console.log('Using API_BASE:', API_BASE ?? '(undefined)');

if (!API_BASE) {
  throw new Error('Missing API_BASE. Set it in GitHub Actions env or provide .env.dev locally.');
}

export const apiHeaders = () => {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (API_KEY) headers['x-api-key'] = API_KEY;
  return headers;
};

// Backwards-compat alias
export const reqresHeaders = apiHeaders;

export const url = (path: string) =>
  path.startsWith('http') ? path : `${API_BASE}${path.startsWith('/') ? '' : '/'}${path}`;

export const test = base.extend<{ api: import('@playwright/test').APIRequestContext }>({
  api: async ({ playwright }, use) => {
    const api = await playwright.request.newContext({
      baseURL: API_BASE,
      extraHTTPHeaders: apiHeaders(),
    });
    await use(api);
    await api.dispose();
  },
});