import { Page } from "@playwright/test";
import { AjaxPage } from "./ajaxPage";
import { NavigationPage } from "./navigationPage";
import { DynamicTablePage } from "./dynamicTablePage";
import { ClassAttributePage } from "./classAttributePage";
import { TextInputPage } from "./textInputPage";
import { DynamicButtonIdPage } from "./dynamicButtonIdPage";
import { ProgressBarWaitPage } from "./progressBarWaitPage";
import { VerifyText } from "./verifyTextpage";

export class PageManager {
    private readonly page: Page;
    private readonly navigationPage: NavigationPage;
    private readonly ajaxPage: AjaxPage;
    private readonly dynamicTablePage: DynamicTablePage;
    private readonly classAttributePage: ClassAttributePage;
    private readonly textInputPage: TextInputPage;
    private readonly dynamicButtonIdPage: DynamicButtonIdPage;
    private readonly progressBarWaitPage: ProgressBarWaitPage;
    private readonly verifyTextPage: VerifyText;

    constructor(page: Page) {
        this.page = page;
        this.navigationPage = new NavigationPage(page);
        this.ajaxPage = new AjaxPage(page);
        this.dynamicTablePage = new DynamicTablePage(page);
        this.classAttributePage = new ClassAttributePage(page);
        this.textInputPage = new TextInputPage(page);
        this.dynamicButtonIdPage = new DynamicButtonIdPage(page);
        this.progressBarWaitPage = new ProgressBarWaitPage(page);
        this.verifyTextPage = new VerifyText(page);
    }

    // Keep method for current usage (pm.navigateTo())
    navigateTo() { return this.navigationPage; }

    // Property-style accessors for page objects
    get onAjax() { return this.ajaxPage; }
    get onDynamicTable() { return this.dynamicTablePage; }
    get onClassAttribute() { return this.classAttributePage; }
    get onTextInput() { return this.textInputPage; }
    get onDynamicButtonId() { return this.dynamicButtonIdPage; }
    get onProgressBarWait() { return this.progressBarWaitPage; }
    get onVerifyText() { return this.verifyTextPage; }
}
