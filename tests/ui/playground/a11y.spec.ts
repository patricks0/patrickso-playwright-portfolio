import { test, expect } from '@playwright/test';

test('Home page basic accessibility (axe-core)', async ({ page }) => {
  await page.goto('/');
  // Lazy-load axe so this test can be committed before the package is installed
  let AxeBuilder: any;
  try {
    ({ AxeBuilder } = await import('@axe-core/playwright'));
  } catch {
    test.skip(true, 'Install @axe-core/playwright to enable a11y scan');
    return;
  }
  const results = await new AxeBuilder({ page }).analyze();
  // Keep this strict for demo purposes; adjust if you expect minor issues
  expect(results.violations).toEqual([]);
});

