import { Page, Locator, expect } from '@playwright/test';

import { NavBar } from '../components/navBar';

export class ProductDetailsPage {
    readonly page: Page;
    readonly nav: NavBar;
    constructor(page: Page) {
        this.page = page;
        this.nav = new NavBar(page);
    }

    //LOCATORS
    get productDetailsText(): Locator { return this.page.locator('.product-information').first(); }
    get productName(): Locator { return this.productDetailsText.locator('h2'); }
    get productCategory() { return this.productDetailsText.getByText(/^Category:/); }
    get productPrice() { return this.productDetailsText.getByText(/^Rs./); }
    get productAvailability() { return this.productDetailsText.locator('p').filter({ hasText: 'Availability:' }).first(); }
    get productCondition() { return this.productDetailsText.locator('p').filter({ hasText: 'Condition:' }).first(); }
    get productBrand() { return this.productDetailsText.locator('p').filter({ hasText: 'Brand:' }).first(); }
    get quantityInputField(): Locator { return this.page.locator('#quantity'); }
    get addToCartButton(): Locator { return this.page.locator('button:has-text("Add to cart")'); }
    get viewCartLink(): Locator { return this.page.locator('a:has-text("View Cart")'); }

    //ACTIONS
    async verifyProductBrand(expectedBrand: string) {
        await expect(this.productBrand).toHaveText(new RegExp(`Brand: ${expectedBrand}`, 'i'));
    }

    async setQuantity(quantity: number) {
        await this.quantityInputField.fill(quantity.toString());
    }

    async clickAddToCart() {
        await this.addToCartButton.click();
    }

    async clickViewCart() {
        await this.viewCartLink.click();
    }
}