import { test, expect } from '@playwright/test';


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