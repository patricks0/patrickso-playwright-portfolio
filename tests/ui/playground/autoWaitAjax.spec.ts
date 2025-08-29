import { test, expect } from '@playwright/test';

    test('AJAX button triggers content (UITestingPlayground)', async ({ page }) => {
        await page.goto('/ajax'); // baseURL from config
        await page.getByRole('button', { name: 'Button Triggering AJAX Request' }).click();
        await page.waitForResponse(resp => resp.url().includes('/ajaxdata') && resp.status() === 200);

        // Wait for the element containing 'Data loaded' to appear
        const dataLoadedLocator = page.locator('text=Data loaded');
        await expect(dataLoadedLocator).toBeVisible({ timeout: 15000 });
    });