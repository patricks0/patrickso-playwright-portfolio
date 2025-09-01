import { Page, Locator, expect } from '@playwright/test';

export class DynamicButtonIdPage  {
    constructor(private page: Page) { }

    dynamicButton(): Locator {
        return this.page.getByRole('button', { name: 'Button with Dynamic ID' });
    }

    async clickDynamicButton(): Promise<void> {
        await this.dynamicButton().click();
    }
}
