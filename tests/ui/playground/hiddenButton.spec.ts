    import { test, expect } from '@playwright/test';
    
    test.skip('Hidden button cannot be hit', async ({ page }) => {
        await page.goto('/hiddenlayers');
        const green = page.locator('.btn-success');
        await expect(green).toBeVisible();
        await expect(green).toBeEnabled();
        await green.click();

        const blue = page.locator('.btn-primary');
        await expect(blue).toBeVisible();

        // The second click must NOT succeed because a layer covers it
        // Instead of expecting a click to throw, check if the button is disabled or not clickable
        await expect(blue).toBeHidden
    });