import { Page } from "@playwright/test";

import { AccountCreatedPage } from "./accountCreatedPage";
import { AccountDeletedPage } from "./accountDeletedPage";
import { ContactUsFormPage } from "./contactUsFormPage";
import { HomePage } from "./homePage";
import { LoginSignUpPage } from "./loginSignUpPage";
import { ProductsPage } from "./productsPage";
import { ProductDetailsPage } from "./productDetailsPage";
import { RegisterPage } from "./registerPage";
import { TestCasePage } from "./testCasePage";

export class PageManager {
    private readonly page: Page;
    private readonly loginSignUpPage: LoginSignUpPage;
    private readonly homePage: HomePage;
    private readonly registerPage: RegisterPage;
    private readonly accountCreatedPage: AccountCreatedPage;
    private readonly accountDeletedPage: AccountDeletedPage;
    private readonly contactUsFormPage: ContactUsFormPage;
    private readonly testCasePage: TestCasePage;
    private readonly productsPage: ProductsPage;
    private readonly productDetailsPage: ProductDetailsPage;

    constructor(page: Page) {
        this.page = page;
        this.loginSignUpPage = new LoginSignUpPage(page);
        this.homePage = new HomePage(page);
        this.registerPage = new RegisterPage(page);
        this.accountCreatedPage = new AccountCreatedPage(page);
        this.accountDeletedPage = new AccountDeletedPage(page);
        this.contactUsFormPage = new ContactUsFormPage(page);
        this.testCasePage = new TestCasePage(page);
        this.productsPage = new ProductsPage(page);
        this.productDetailsPage = new ProductDetailsPage(page);
    }

    // Property-style accessors for page objects
    get onLoginSignUpPage() { return this.loginSignUpPage; }
    get onHome() { return this.homePage; }
    get onRegisterPage() { return this.registerPage; }
    get onAccountCreatedPage() { return this.accountCreatedPage; }
    get onAccountDeletedPage() { return this.accountDeletedPage; }
    get onContactUsFormPage() { return this.contactUsFormPage; }
    get onTestCasePage() { return this.testCasePage; }
    get onProductsPage() { return this.productsPage; }
    get onProductDetailsPage() { return this.productDetailsPage; }
}



