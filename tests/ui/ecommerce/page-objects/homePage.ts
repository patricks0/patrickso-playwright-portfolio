import { Page , Locator } from '@playwright/test';

import { NavBar } from '../components/navBar';

export class HomePage {
    readonly page: Page;
    readonly nav: NavBar;
    constructor(page: Page) {
        this.page = page;
        this.nav = new NavBar(page);
    }

    // LOCATORS - Header / nav
//    get homeLink(): Locator { return this.page.getByRole('link', { name: /^home$/i }); }
//    get productsLink(): Locator { return this.page.getByRole('link', { name: /products/i }); }
//    get cartLink(): Locator { return this.page.getByRole('link', { name: /cart/i }); }
//    get contactUsLink(): Locator { return this.page.getByRole('link', { name: /contact/i }); }
//    get signupLoginLink(): Locator { return this.page.getByRole('link', { name: /signup.*login|login.*signup/i }); }
//    get testCasesLink(): Locator { return this.page.getByRole('link', { name: /test cases/i }); }
//    get apiTestingLink(): Locator { return this.page.getByRole('link', { name: /api testing/i }); }

    // Locators - Home page
 //   get subscribeText(): Locator { return this.page.locator('h2', { hasText: 'Subscription' }); }
 //   get subscribeEmailInputField(): Locator { return this.page.locator('#susbscribe_email'); }
 //   get subscribeButton(): Locator { return this.page.locator('#subscribe'); }
 //   get successAlert(): Locator { return this.page.locator('.alert-success'); }
 //   get userLoggedInBanner(): Locator { return this.page.locator('[data-qa="user-logged-in"]'); }
//    get actualUserLoggedIn(): Locator { return this.page.locator('li a', { hasText: 'Logged in as' }) }// adjust if needed
    //Actions
 //   async clickSignupLoginLink() {
  //      await this.signupLoginLink.click();
   // }
  //  async subscribe(email: string) {
  //      await this.subscribeEmailInputField.fill(email);
  //      await this.subscribeButton.click();
  //  }
}


