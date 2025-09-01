import { Page, Locator, expect } from '@playwright/test';

export class VerifyText {
    constructor(private page: Page) { }

    textToVerify(): Locator {
        return this.page.locator('span.badge-secondary', { hasText: 'Welcome UserName!' })
    }

    async getTextContent(): Promise<string> {
        return (await this.textToVerify().textContent())?.trim() || '';
    }

    async expectTextToBe(expectedText: string): Promise<void> {
        const actualText = await this.getTextContent();
        console.log(`Actual text found is ${actualText}`);
        expect(actualText).toBe(expectedText);
    }
}