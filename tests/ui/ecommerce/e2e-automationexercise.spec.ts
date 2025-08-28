import { test, expect } from '@playwright/test';

test('search and add to cart', async ({ page }) => {
  await page.goto('/');                         // baseURL set in project=staging
  await page.getByRole('link', { name: /products/i }).click();
  await page.getByPlaceholder(/search product/i).fill('shirt');
  await page.getByRole('button', { name: /search/i }).click();
  await expect(page.getByText(/searched products/i)).toBeVisible();
  const first = page.locator('.features_items .product-image-wrapper').first();
  await first.hover();
  await first.getByRole('link', { name: /add to cart/i }).click();
  await page.getByRole('link', { name: /cart/i }).click();
  await expect(page.getByText(/shopping cart/i)).toBeVisible();
});