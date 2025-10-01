import { Page, Locator } from '@playwright/test';

import { NavBar } from '../components/navBar';
import { parseCurrency } from '../helpers/numberParser';

export class ViewCartPage {
    readonly page: Page;
    readonly nav: NavBar;
    constructor(page: Page) {
        this.page = page;
        this.nav = new NavBar(page);
    }

    // Locators
    get proceedToCheckoutButton(): Locator { return this.page.locator('text=Proceed To Checkout'); }
    //await page.locator('text=All Products');
    get registerLoginLinkDialogue(): Locator { return this.page.locator('.modal-content').getByRole('link', { name: 'Register / Login' }); }

    getCartRow(productName: string) {
        return this.page.locator('#cart_info_table tbody tr')
            .filter({ has: this.page.locator('.cart_description', { hasText: productName }) });
    }

    //actions
    async clickRegisterLoginLinkDialogue() {
        await this.registerLoginLinkDialogue.click();
    }
    async clickProceedToCheckout() {
        await this.proceedToCheckoutButton.click();
    }

    async getCartRowValues(productName: string) {
        const row = this.getCartRow(productName);

        const quantityText = (await row.locator('.cart_quantity').innerText()).trim();
        const priceText = (await row.locator('.cart_price').innerText()).trim();
        const totalText = (await row.locator('.cart_total').innerText()).trim();

        return {
            quantityText,
            priceText,
            totalText,
            quantity: parseInt(quantityText, 10),
            price: parseCurrency(priceText),
            total: parseCurrency(totalText),
        };
    }
}