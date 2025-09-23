// page-objects/components/navBar.ts
import { Locator , Page } from '@playwright/test';

export class NavBar {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }
    get navBar(): Locator { return this.page.locator('.navbar-nav'); }
    get homeLink(): Locator { return this.navBar.getByRole('link', { name: /^home$/i }); }
    get productsLink(): Locator { return this.navBar.getByRole('link', { name: /products/i }); }
    get cartLink(): Locator { return this.navBar.getByRole('link', { name: /cart/i }); }
    get contactUsLink(): Locator { return this.navBar.getByRole('link', { name: /contact/i }); }
    get signupLoginLink(): Locator { return this.navBar.getByRole('link', { name: /signup.*login|login.*signup/i }); }

    // Hero / common CTAs (tweak to your app)
    get testCasesLink(): Locator { return this.navBar.getByRole('link', { name: /test cases/i }); }
    get apiTestingLink(): Locator { return this.navBar.getByRole('link', { name: /api testing/i }); }

    // Utility
    get userLoggedInBanner(): Locator { return this.page.locator('[data-qa="user-logged-in"]'); } // adjust if needed
    get actualUserLoggedIn(): Locator { return this.page.locator('li a', { hasText: 'Logged in as' }) }// adjust if needed

    //Actions
    async clickSignupLoginLink() {
        await this.signupLoginLink.click();
    }

    async goToLogin() {
        await this.signupLoginLink.click();
    }
    async goToHome() {
        await this.homeLink.click();
    }
    async goToProducts() {
        await this.productsLink.click();
    }
    async goToCart() {
        await this.cartLink.click();
    }
    async goToContactUs() {
        await this.contactUsLink.click();

    }
    async goToTestCases() {
        await this.testCasesLink.click();
    }
    async goToApiTesting() {
        await this.apiTestingLink.click();
    }
    async clickLogout() {
        await this.page.getByRole('link', { name: /logout/i }).click();
    }
    async clickDeleteAccount() {
        await this.page.getByRole('link', { name: /delete account/i }).click();
    }

}