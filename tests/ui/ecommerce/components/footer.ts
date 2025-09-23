import { Locator , Page } from '@playwright/test';

export class Footer {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    get footer(): Locator { return this.page.locator('footer'); }
    get footerText(): Locator { return this.footer.locator('p'); }
}