import { test, expect } from '@playwright/test';

    test('Text with spaces', async ({ page }) => {
        await page.goto('/verifytext');

        await expect(page.locator('span.badge-secondary', { hasText: 'Welcome UserName!' }))
            .toHaveText(/^\s*Welcome\s+UserName!\s*$/);
        const actualText = await page.locator('span.badge-secondary', { hasText: 'Welcome UserName!' }).textContent();
        console.log("✅ Assertion passed: Text matches 'Welcome UserName!'. Actual text:", actualText);
    });