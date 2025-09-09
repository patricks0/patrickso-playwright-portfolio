import { Page, Locator, expect } from '@playwright/test';
import { NavBar } from '../components/navBar';


export class AccountCreatedPage {
    readonly page: Page;
    readonly nav: NavBar;
    constructor(page: Page) {
        this.page = page;
        this.nav = new NavBar(page);
    }

    //LOCATORS
    get accountCreatedText(): Locator { return this.page.getByText(/Account Created!/i); }
    //get accountCreatedText(): Locator {return this.page.locator('h2[data-qa="account-created"] b'); }
    get continueBtn(): Locator { return this.page.locator('[data-qa="continue-button"]'); }

    //ACTIONS
    async clickContinueButton() {
        await this.continueBtn.click();
    }
}  