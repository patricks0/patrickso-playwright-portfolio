import { test, expect } from '@playwright/test';

test.skip('Visual snapshot: header renders correctly (enable locally)', async ({ page }) => {
  await page.goto('/');
  // Mask dynamic images to reduce flakiness
  const img = page.locator('img');
  await expect(page.locator('header')).toHaveScreenshot({ mask: [img] });
});

