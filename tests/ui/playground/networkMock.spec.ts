import { test, expect } from '@playwright/test';

test('Network mocking: stub ajaxdata to simulate failure', async ({ page }) => {
  await page.route('**/ajaxdata', (route) => route.fulfill({ status: 500, body: 'stubbed failure' }));
  await page.goto('/ajax');
  await page.getByRole('button', { name: 'Button Triggering AJAX Request' }).click();
  // With a 500 response, "Data loaded" should not appear
  await expect(page.getByText('Data loaded')).toBeHidden();
});

