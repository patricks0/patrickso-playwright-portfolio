import { Page , Locator } from '@playwright/test';
import { NavBar } from '../components/navBar';

export class LoginSignUpPage {
    readonly page: Page;
    readonly nav: NavBar;
    constructor(page: Page) {
        this.page = page;
        this.nav = new NavBar(page);
    }

    //NEW USER SIGNUP -----------------------------
    // Locators - New User Signup
    get newUserSignupText(): Locator {
        return this.page.getByText(/New User Signup!/i);
    }
    get userNameInputField(): Locator {
        return this.page.locator('input[data-qa="signup-name"]');
    }
    get emailInputField(): Locator {
        return this.page.locator('input[data-qa="signup-email"]');
    }
    get signupButton(): Locator {
        return this.page.locator('button[data-qa="signup-button"]');
    }
    // Actions - New User Signup
    async clickSignupButton() {
        await this.signupButton.click();
    }
    async enterSignUpUserName(name: string) {
        await this.userNameInputField.fill(name);
    }
    async enterEmailAddress(email: string) {
        await this.emailInputField.fill(email);
    }
    async signUp(name: string, email: string) {
        await this.enterSignUpUserName(name);
        await this.enterEmailAddress(email);
        await this.clickSignupButton();
    }

    //Login to your account -----------------------------
    // Locators - Login to your account
    get loginToYourAccountText(): Locator {
        return this.page.getByText(/Login to your account/i);
    }
    get loginEmailInputField(): Locator {
        return this.page.locator('input[data-qa="login-email"]');
    }
    get loginPasswordInputField(): Locator {
        return this.page.locator('input[data-qa="login-password"]');
    }
    get loginButton(): Locator {
        return this.page.locator('button[data-qa="login-button"]');
    }
    // Actions - Login to your account
    async clickLoginButton() {
        await this.loginButton.click();
    }
    async login(email: string, password: string) {
        await this.loginEmailInputField.fill(email);
        await this.loginPasswordInputField.fill(password);
        await this.clickLoginButton();
    }

    // --- Post-login ---
    get logoutLink(): Locator { return this.page.getByRole('link', { name: /logout/i }); }
    get deleteAccountLink(): Locator { return this.page.getByRole('link', { name: /delete account/i }); }
    get loggedInAsLabel(): Locator { return this.page.locator('[data-qa="logged-in-as"]'); } // adjust if needed

    //error messages Locators
    get incorrectEmailPasswordText(): Locator {
        return this.page.getByText(/Your email or password is incorrect!/i);
    }
    get emailAlreadyExistText(): Locator {
        return this.page.getByText(/Email Address already exist!/i);
    }
}