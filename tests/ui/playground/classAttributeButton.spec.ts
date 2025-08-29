import { test, expect } from '@playwright/test';

    test('Class Attribute button is visible and clickable', async ({ page }) => {
        await page.goto('/classattr');
        const button = page.locator('.btn-primary');
        await expect(button).toBeVisible();
        await expect(button).toBeEnabled();
        await button.click();
    });