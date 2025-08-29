import { test, expect } from '@playwright/test';

    test('Progress Bar - wait until 75% then stop', async ({ page }) => {
        await page.goto('/progressbar');
        const startButton = page.getByRole('button', { name: 'Start' });
        const stopButton = page.getByRole('button', { name: 'Stop' });
        const progressBar = page.locator('.progress-bar');

        await startButton.click();
        await expect(progressBar).toBeVisible();

        // Wait until the progress bar reaches at least 75%
        await page.waitForFunction(() => {
            const elem = document.querySelector('.progress-bar');
            if (elem) {
                const valueNow = parseFloat(elem.getAttribute('aria-valuenow') || '0');
                return valueNow === 75;
            }
            return false;
        }, { timeout: 15000 });

        // Once we reach 75%, click the button again to stop
        await stopButton.click();

        // Verify that the progress bar has stopped (value should not change)
        const finalValue = await progressBar.getAttribute('aria-valuenow');
        const finalNumber = parseFloat(finalValue || '0');
        console.log(`Progress bar stopped at: ${finalNumber}%`);

        if (finalNumber === 75) {
            console.log("✅ Assertion passed: Progress bar stopped exactly at 75");
        } else {
            console.error(`❌ Assertion failed: Expected 75 but got ${finalNumber}`);
        }
        expect(finalNumber).toBe(75);
    });