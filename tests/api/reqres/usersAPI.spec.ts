import { expect } from '@playwright/test';

import { test, url } from '../fixtures';

test('GET list of users (page 1, per_page=2)', async ({ api }) => {
  const res = await api.get(url('/users?page=1&per_page=2'));
  expect(res.status()).toBe(200);

  const body = await res.json();
  expect(Array.isArray(body.data)).toBe(true);
  expect(body.data.length).toBeGreaterThan(0);
});

test('GET single user by id', async ({ api }) => {
  const res = await api.get(url('/users/2'));
  expect(res.status()).toBe(200);

  const body = await res.json();
  console.log(body);
  expect(body.data.id).toBe(2);
  expect(body.data.email).toBeTruthy();
});

test('POST create user (demo)', async ({ api }) => {
  const res = await api.post(url('/users'), {
    data: { name: 'patrick', job: 'tester' },
  });
  expect(res.status()).toBe(201);

  const body = await res.json();
  console.log(body);
  expect(body.name).toBe('patrick');
  expect(body.job).toBe('tester');
});
