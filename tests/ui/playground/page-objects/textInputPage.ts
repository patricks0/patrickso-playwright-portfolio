import { Page, Locator, expect } from '@playwright/test';

export class TextInputPage {
    constructor(private page: Page) { }

    textBox(): Locator {
        return this.page.locator('input').first();
    }
    button(): Locator {
        return this.page.locator('.btn-primary');
    }       
    async fillTextBox(text: string) {
        await this.textBox().fill(text);
    }

    async clickButton() {
        await this.button().click();
    }

    async getButtonText(): Promise<string> {
        return (await this.button().textContent())?.trim() || '';
    }
    async expectedButtonText(expected: string) {
        await expect(this.button()).toHaveText(expected);
    }
}