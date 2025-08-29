import { Page } from "@playwright/test";
import { AjaxPage } from "./ajaxPage";
import { NavigationPage } from "./navigationPage";
import { DynamicTablePage } from "./dynamicTablePage";

export class PageManager {
    private readonly page: Page;
    private readonly navigationPage: NavigationPage;
    private readonly ajaxPage: AjaxPage;
    private readonly dynamicTablePage: DynamicTablePage;

    constructor(page: Page) { 
        this.page = page;
        this.navigationPage = new NavigationPage(page);
        this.ajaxPage = new AjaxPage(page);
        this.dynamicTablePage = new DynamicTablePage(page);
    }

    // Keep method for current usage (pm.navigateTo())
    navigateTo(){
        return this.navigationPage;
    }

    // Return the cached instance for consistency
    ajax(): AjaxPage {
        return this.ajaxPage;
    }

    // Expose as a property so tests can do: pm.onDynamicTable.cellText(...)
    get onDynamicTable() {
        return this.dynamicTablePage;
    }
}

//export const pageManager = (page: Page) => new PageManager(page);   
