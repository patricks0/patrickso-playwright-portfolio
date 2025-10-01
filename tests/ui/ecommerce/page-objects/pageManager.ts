import { Page } from "@playwright/test";
import { AccountCreatedPage } from "./accountCreatedPage";
import { AccountDeletedPage } from "./accountDeletedPage";
import { ContactUsFormPage } from "./contactUsFormPage";
import { LoginSignUpPage } from "./loginSignUpPage";
import { ProductsPage } from "./productsPage";
import { ProductDetailsPage } from "./productDetailsPage";
import { RegisterPage } from "./registerPage";
import { TestCasePage } from "./testCasePage";
import { ViewCartPage } from "./viewCartPage";
import { CheckOutPage } from "./checkOutPage";
import { PaymentPage } from "./paymentPage";
import { NavBar } from "../components/navBar";
import { Footer } from "../components/footer";

export class PageManager {
    private readonly page: Page;
    private readonly _loginSignUpPage: LoginSignUpPage;
    private readonly _registerPage: RegisterPage;
    private readonly _accountCreatedPage: AccountCreatedPage;
    private readonly _accountDeletedPage: AccountDeletedPage;
    private readonly _contactUsFormPage: ContactUsFormPage;
    private readonly _testCasePage: TestCasePage;
    private readonly _productsPage: ProductsPage;
    private readonly _productDetailsPage: ProductDetailsPage;
    private readonly _viewCartPage: ViewCartPage;
    private readonly _checkOutPage: CheckOutPage;
    private readonly _paymentPage: PaymentPage;
    private readonly _navBar: NavBar;
    private readonly _footer: Footer;

    constructor(page: Page) {
        this.page = page;
        this._loginSignUpPage = new LoginSignUpPage(page);
        this._registerPage = new RegisterPage(page);
        this._accountCreatedPage = new AccountCreatedPage(page);
        this._accountDeletedPage = new AccountDeletedPage(page);
        this._contactUsFormPage = new ContactUsFormPage(page);
        this._testCasePage = new TestCasePage(page);
        this._productsPage = new ProductsPage(page);
        this._productDetailsPage = new ProductDetailsPage(page);
        this._viewCartPage = new ViewCartPage(page);
        this._checkOutPage = new CheckOutPage(page);
        this._paymentPage = new PaymentPage(page);
        this._navBar = new NavBar(page);
        this._footer = new Footer(page);
        
    }

    // Property-style accessors for page objects
    get onLoginSignUpPage() { return this._loginSignUpPage; }
    get onRegisterPage() { return this._registerPage; }
    get onAccountCreatedPage() { return this._accountCreatedPage; }
    get onAccountDeletedPage() { return this._accountDeletedPage; }
    get onContactUsFormPage() { return this._contactUsFormPage; }
    get onTestCasePage() { return this._testCasePage; }
    get onProductsPage() { return this._productsPage; }
    get onProductDetailsPage() { return this._productDetailsPage; }
    get onViewCartPage() { return this._viewCartPage; }
    get onCheckOutPage() { return this._checkOutPage; }
    get onPaymentPage() { return this._paymentPage; }
    get onNavBar() { return this._navBar; }
    get onFooter() { return this._footer; }
}



