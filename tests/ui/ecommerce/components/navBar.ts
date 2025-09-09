// page-objects/components/navBar.ts
import { Locator, Page } from '@playwright/test';

export class NavBar {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    get homeLink(): Locator { return this.page.getByRole('link', { name: /^home$/i }); }
    get productsLink(): Locator { return this.page.getByRole('link', { name: /products/i }); }
    get cartLink(): Locator { return this.page.getByRole('link', { name: /cart/i }); }
    get contactUsLink(): Locator { return this.page.getByRole('link', { name: /contact/i }); }
    get signupLoginLink(): Locator { return this.page.getByRole('link', { name: /signup.*login|login.*signup/i }); }

    // Hero / common CTAs (tweak to your app)
    get testCasesLink(): Locator { return this.page.getByRole('link', { name: /test cases/i }); }
    get apiTestingLink(): Locator { return this.page.getByRole('link', { name: /api testing/i }); }

    // Utility
    get userLoggedInBanner(): Locator { return this.page.locator('[data-qa="user-logged-in"]'); } // adjust if needed

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
    async clickLogout() {
        await this.page.getByRole('link', { name: /logout/i }).click();
    }
    async clickDeleteAccount() {
        await this.page.getByRole('link', { name: /delete account/i }).click();
    }   
}