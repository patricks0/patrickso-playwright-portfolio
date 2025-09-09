import { Page } from "@playwright/test";

import { LoginSignUpPage } from "./loginSignUpPage";
import { HomePage } from "./homePage";
import { RegisterPage } from "./registerPage";
import { AccountCreatedPage } from "./accountCreatedPage";
import { AccountDeletedPage } from "./accountDeletedPage";


export class PageManager {
    private readonly page: Page;
    private readonly loginSignUpPage: LoginSignUpPage;
    private readonly homePage: HomePage;
    private readonly registerPage: RegisterPage;
    private readonly accountCreatedPage: AccountCreatedPage;
    private readonly accountDeletedPage: AccountDeletedPage;

    constructor(page: Page) {
        this.page = page;
        this.loginSignUpPage = new LoginSignUpPage(page);
        this.homePage = new HomePage(page);
        this.registerPage = new RegisterPage(page);
        this.accountCreatedPage = new AccountCreatedPage(page);
        this.accountDeletedPage = new AccountDeletedPage(page);
    }

    // Property-style accessors for page objects
    get onLoginSignUpPage() { return this.loginSignUpPage; }
    get onHome() { return this.homePage; }
    get onRegisterPage() { return this.registerPage; }
    get onAccountCreatedPage() { return this.accountCreatedPage; }  
    get onAccountDeletedPage() { return this.accountDeletedPage; }
}



