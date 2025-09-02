import { test, expect } from '@playwright/test';

test('Home page basic accessibility (axe-core)', async ({ page }) => {
  await page.goto('/');
  // Lazy-load axe so this test can be committed before the package is installed
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let AxeBuilder: any;
  try {
    // eslint-disable-next-line import/no-unresolved
    ({ AxeBuilder } = await import('@axe-core/playwright'));
  } catch {
    test.skip(true, 'Install @axe-core/playwright to enable a11y scan');
    return;
  }
  const results = await new AxeBuilder({ page }).analyze();
  // Keep this strict for demo purposes; adjust if you expect minor issues
  expect(results.violations).toEqual([]);
});
