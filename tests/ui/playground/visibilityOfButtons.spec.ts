import { test, expect } from '@playwright/test';

    test('Testing visibility of buttons having different locators', async ({ page }) => {
        await page.goto('/visibility');

        // Click hide button
        await page.getByRole('button', { name: 'Hide' }).click();

        // Removed
        await expect(page.getByRole('button', { name: 'Removed' })).not.toBeVisible();
        console.log("✅ Assertion passed: 'Removed' button is not visible");

        // Zero width
        await expect(page.getByRole('button', { name: 'Zero Width' })).not.toBeVisible();
        console.log("✅ Assertion passed: 'Zero Width' button is not visible");

        // Overlapped
        await expect(page.getByRole('button', { name: 'Overlapped' })).toBeVisible();
        console.log("✅ Assertion passed: 'Overlapped' button is visible");

        // Opacity 0
        await expect(page.getByRole('button', { name: 'Opacity 0' })).toBeVisible();
        console.log("✅ Assertion passed: 'Opacity 0' button is visible");

        // Visibility hidden
        await expect(page.getByRole('button', { name: 'Visibility Hidden' })).not.toBeVisible();
        console.log("✅ Assertion passed: 'Visibility Hidden' button is not visible");

        // Display none
        await expect(page.getByRole('button', { name: 'Display None' })).not.toBeVisible();
        console.log("✅ Assertion passed: 'Display None' button is not visible");

        // Offscreen
        await expect(page.getByRole('button', { name: 'Offscreen' })).toBeVisible();
        console.log("✅ Assertion passed: 'Offscreen' button is visible");
    });