import { Page } from '@playwright/test';

import { NavBar } from '../components/navBar';
import { parseCurrency } from '../helpers/numberParser';

export class ViewCartPage {
    readonly page: Page;
    readonly nav: NavBar;
    constructor(page: Page) {
        this.page = page;
        this.nav = new NavBar(page);
    }

    getCartRow(productName: string) {
        return this.page.locator('#cart_info_table tbody tr')
            .filter({ has: this.page.locator('.cart_description', { hasText: productName }) });
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