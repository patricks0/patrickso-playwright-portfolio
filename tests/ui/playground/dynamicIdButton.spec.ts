import { test, expect } from '@playwright/test';

    test('Dynamic ID button is visible and clickable', async ({ page }) => {
        await page.goto('/dynamicid');
        const button = page.getByRole('button', { name: 'Button with Dynamic ID' });
        await expect(button).toBeVisible();
        await expect(button).toBeEnabled();
        await button.click();
    });