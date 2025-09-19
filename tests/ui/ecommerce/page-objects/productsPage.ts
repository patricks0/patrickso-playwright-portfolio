import { Page, Locator } from '@playwright/test';

import { NavBar } from '../components/navBar';

export class ProductsPage {
    readonly page: Page;
    readonly nav: NavBar;
    constructor(page: Page) {
        this.page = page;
        this.nav = new NavBar(page);
    }

    //LOCATORS
    get allProductsText(): Locator { return this.page.locator('.title.text-center', { hasText: "All Products" }) }
    get productsList(): Locator { return this.page.locator('.features_items .col-sm-4'); }
    get productName(): Locator { return this.page.locator('.productinfo.text-center p'); }
    viewProductButton(productIndex: number): Locator { return this.productsList.nth(productIndex).getByRole('link', { name: /view product/i }); }
    get searchInputField(): Locator { return this.page.locator('#search_product'); }
    get searchButton(): Locator { return this.page.locator('#submit_search'); }
    
    //ACTIONS
    async clickTheProduct(productName: string) {
        // Gather all product name elements
        const names = this.productName; // '.productinfo.text-center p'
        const total = await names.count();

        // Normalise for case-insensitive comparison
        const target = productName.trim().toLowerCase();

        let index = -1;

        // 1) Try exact (case-insensitive) match first
        for (let i = 0; i < total; i++) {
            const text = (await names.nth(i).innerText()).trim().toLowerCase();
            if (text === target) {
                index = i;
                break;
            }
        }

        // 2) Fallback: partial (substring) match if exact not found
        if (index === -1) {
            for (let i = 0; i < total; i++) {
                const text = (await names.nth(i).innerText()).trim().toLowerCase();
                if (text.includes(target)) {
                    index = i;
                    break;
                }
            }
        }

        if (index === -1) {
            // Helpful error with what we actually saw
            const seen = [] as string[];
            for (let i = 0; i < total; i++) {
                seen.push((await names.nth(i).innerText()).trim());
            }
            throw new Error(
                `Product "${productName}" not found. Visible products (in order):\n- ${seen.join("\n- ")}`
            );
        }

        // Click the corresponding View Product link by index
        const link = this.viewProductButton(index); // role('link', name=/view product/i)
        await link.scrollIntoViewIfNeeded();
        await link.click();
    }
    async searchForProduct(productName: string) {
        await this.searchInputField.fill(productName);
        await this.searchButton.click();
    }
}