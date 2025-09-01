import { Page } from '@playwright/test';

export class NavigationPage {
    constructor(private page: Page) { }

    // Single source of truth for routes (baseURL comes from config)
    private urls = {
        ajax: '/ajax',
        hiddenLayers: '/hiddenlayers',
        dynamicTable: '/dynamictable',
        classAttribute: '/classattr',
        // add more playground pages here…
    };

    async ajaxPage() { await this.page.goto(this.urls.ajax); }
    async hiddenLayersPage() { await this.page.goto(this.urls.hiddenLayers); }
    async dynamicTablePage() { await this.page.goto(this.urls.dynamicTable); }
    async classAttributePage() { await this.page.goto(this.urls.classAttribute); }
}
