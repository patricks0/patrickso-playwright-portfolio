
import { Page, Locator, expect } from '@playwright/test';

export class ClassAttributePage {
    constructor(private page: Page) { }

    blueButton(): Locator {
        return this.page.locator('.btn-primary');
    }

    async clickBlueButton(): Promise<void> {
        await this.blueButton().click();
    }

    resultText(): Locator {
        return this.page.locator('#result');
    }

    async getResultText(): Promise<string> {
        return (await this.resultText().textContent())?.trim() || '';
    }

    async clickButtonAndAcceptAlert(): Promise<string> {

        let dialogMessage = '';
        this.page.once('dialog', (d) => {
            dialogMessage = d.message();
            d.accept();
        });
        await this.clickBlueButton();
        // Wait a tick to ensure dialog event is handled
        await this.page.waitForTimeout(100);
        console.log(`Dialog message was: "${dialogMessage}"`);
        return dialogMessage;
    }

    async expectNoDialogWithin(timeoutMs = 500): Promise<void> {
        let extra = false;
        try {
            await this.page.waitForEvent('dialog', { timeout: timeoutMs });
            extra = true;
        } catch { /* timeout = no dialog, as expected */ }
        expect(extra, 'Unexpected extra dialog appeared').toBe(false);
    }
}