import { Page , Locator } from '@playwright/test';

import { NavBar } from '../components/navBar';

export class TestCasePage {
    readonly page: Page;
    readonly nav: NavBar;
    constructor(page: Page) {
        this.page = page;
        this.nav = new NavBar(page);
    }

    //LOCATORS
    get testCasesText(): Locator { return this.page.locator('.title.text-center', {hasText: "Test Cases"}) }
}