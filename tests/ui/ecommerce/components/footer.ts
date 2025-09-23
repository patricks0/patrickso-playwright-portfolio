import { Locator, Page } from '@playwright/test';

export class Footer {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    //Locators
    get subscribeText(): Locator { return this.page.locator('h2', { hasText: 'Subscription' }); }
    get subscribeEmailInputField(): Locator { return this.page.locator('#susbscribe_email'); }
    get subscribeButton(): Locator { return this.page.locator('#subscribe'); }
    get successAlert(): Locator { return this.page.locator('.alert-success'); }

    //Actions
    async subscribe(email: string) {
        await this.subscribeEmailInputField.fill(email);
        await this.subscribeButton.click();
    }
}