import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.describe('UITestingPlayground - Test Exercises', () => {
    test('Dynamic ID button is visible and clickable', async ({ page }) => {
        await page.goto('/dynamicid');
        const button = page.getByRole('button', { name: 'Button with Dynamic ID' });
        await expect(button).toBeVisible();
        await expect(button).toBeEnabled();
        await button.click();
    });

    test('Class Attribute button is visible and clickable', async ({ page }) => {
        await page.goto('/classattr');
        const button = page.locator('.btn-primary');
        await expect(button).toBeVisible();
        await expect(button).toBeEnabled();
        await button.click();
    });

    test('AJAX button triggers content (UITestingPlayground)', async ({ page }) => {
        await page.goto('/ajax'); // baseURL from config
        await page.getByRole('button', { name: 'Button Triggering AJAX Request' }).click();
        await page.waitForResponse(resp => resp.url().includes('/ajaxdata') && resp.status() === 200);

        // Wait for the element containing 'Data loaded' to appear
        const dataLoadedLocator = page.locator('text=Data loaded');
        await expect(dataLoadedLocator).toBeVisible({ timeout: 15000 });
    });

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
    test('Name of Button Changes', async ({ page }) => {
        await page.goto('/textinput');
        const textBox = page.locator('input').first();
        const buttonName = faker.word.words(2); // Generate a random button name
        const button = page.getByRole('button').first()
        await expect(textBox).toBeVisible();
        await textBox.fill(buttonName);
        await button.click();
        //await page.waitForTimeout(1000); // Wait for the button text to update
        await expect(button).toHaveText(buttonName);
    });

    test('Dynamic Table Test. that Chrome CPU is equal to value at bottom', async ({ page }) => {
        await page.goto('/dynamictable'); // replace with your URL

        const rowName = "Chrome";
        const columnHeader = "CPU";

        // Step 1: Collect all column headers into an array
        const headers = page.getByRole('columnheader');

        // Step 2: Find the index of the desired header
        const colIndex = await headers.evaluateAll((elements, headerText) => {
            return elements.findIndex(el => el.textContent?.trim() === headerText);
        }, columnHeader);

        console.log(`Column "${columnHeader}" is at index: ${colIndex}`);

        // Step 3: Use that index to get the correct cell from the row
        const targetRow = page.getByRole('row', { name: rowName });
        const cell = targetRow.locator('span').nth(colIndex);

        const cellValue = await cell.textContent();
        console.log(`Value at row "${rowName}", column "${columnHeader}" is: ${cellValue}`);

        const yellowCPUvalue = (await page.locator('.bg-warning').first().textContent())?.trim();
        const cpuOnly = yellowCPUvalue?.replace(/.*CPU:\s*/, "");
        console.log("Trimmed CPU value: " + cpuOnly);
        expect(cellValue?.trim(), `Expected table value '${cellValue}' to match yellow CPU '${cpuOnly}'`).toBe(cpuOnly);
        console.log(`✅ Assertion passed: ${cellValue?.trim()} equals ${cpuOnly}`);
    });
});