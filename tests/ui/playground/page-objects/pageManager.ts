import { Page } from "@playwright/test";
import { AjaxPage } from "./ajaxPage";
import { NavigationPage } from "./navigationPage";
import { DynamicTablePage } from "./dynamicTablePage";
import { ClassAttributePage } from "./classAttributePage";

export class PageManager {
    private readonly page: Page;
    private readonly navigationPage: NavigationPage;
    private readonly ajaxPage: AjaxPage;
    private readonly dynamicTablePage: DynamicTablePage;
    private readonly classAttributePage: ClassAttributePage;

    constructor(page: Page) { 
        this.page = page;
        this.navigationPage = new NavigationPage(page);
        this.ajaxPage = new AjaxPage(page);
        this.dynamicTablePage = new DynamicTablePage(page);
        this.classAttributePage = new ClassAttributePage(page);
    }

    // Keep method for current usage (pm.navigateTo())
    navigateTo(){
        return this.navigationPage;
    }

    // Property-style accessors for page objects
    get onAjax() { return this.ajaxPage; }

    // Expose as a property so tests can do: pm.onDynamicTable.cellText(...)
    get onDynamicTable() {
        return this.dynamicTablePage;
    }

    get onClassAttribute() { 
        return this.classAttributePage; }
}
