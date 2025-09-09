import { Page, Locator} from '@playwright/test';
import { NavBar } from '../components/navBar';

export class AccountDeletedPage {
    readonly page: Page;
    readonly nav: NavBar;
    constructor(page: Page) {
        this.page = page;
        this.nav = new NavBar(page);
    }

    //LOCATORS
    get accountDeletedText(): Locator { return this.page.getByText(/Account Deleted!/i); }
    //get accountDeletedText(): Locator {return this.page.locator('h2[data-qa="account-deleted"] b'); }
    get continueBtn(): Locator { return this.page.locator('[data-qa="continue-button"]'); }

    //ACTIONS
    async clickContinueButton() {
        await this.continueBtn.click();
    }
}