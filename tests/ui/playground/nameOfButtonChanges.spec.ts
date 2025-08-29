import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

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