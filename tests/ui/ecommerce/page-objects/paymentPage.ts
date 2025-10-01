import { Page, Locator } from '@playwright/test';

import { NavBar } from '../components/navBar';

export class PaymentPage {
    readonly page: Page;
    readonly nav: NavBar;
    constructor(page: Page) {
        this.page = page;
        this.nav = new NavBar(page);
    }

    //LOCATORS
    get nameOnCardInput(): Locator {
        return this.page.locator('input[name="name_on_card"]');
    }
    get cardNumberInput(): Locator {
        return this.page.locator('input[name="card_number"]');
    }
    get cvcInput(): Locator {
        return this.page.locator('input[name="cvc"]');
    }
    get expiryMonthInput(): Locator {
        return this.page.locator('input[name="expiry_month"]');
    }
    get expiryYearInput(): Locator {
        return this.page.locator('input[name="expiry_year"]');
    }
    get payAndConfirmOrderButton(): Locator {
        return this.page.locator('#submit');
    }
    get successMessage(): Locator { return this.page.locator('#success_message').first();}
    //ACTIONS
    async enterNameOnCard(name: string) {
        await this.nameOnCardInput.fill(name);
    }
    async enterCardNumber(cardNumber: string) {
        await this.cardNumberInput.fill(cardNumber);
    }
    async enterCVC(cvc: string) {
        await this.cvcInput.fill(cvc);
    }
    async enterExpiryMonth(month: string) {
        await this.expiryMonthInput.fill(month);
    }
    async enterExpiryYear(year: string) {
        await this.expiryYearInput.fill(year);
    }
// paymentPage.ts
async waitForSuccessMessage(timeout = 2000) {
  await this.successMessage.waitFor({ state: 'visible', timeout });
}

async clickPayAndConfirmOrder() {
  await this.payAndConfirmOrderButton.click({ noWaitAfter: true });
}
}