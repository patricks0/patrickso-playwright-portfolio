import { Page } from '@playwright/test';

export class NavigationPage {
  constructor(private page: Page) {}

  // Single source of truth for routes (baseURL comes from config)
  private urls = {
    ajax: '/ajax',
    hiddenLayers: '/hiddenlayers',
    dynamicTable: '/dynamictable',
    // add more playground pages here…
  };

  async gotoAjax() {
    await this.page.goto(this.urls.ajax);
  }
  async gotoHiddenLayers() {
    await this.page.goto(this.urls.hiddenLayers);
  }
  async dynamicTable() {
    await this.page.goto(this.urls.dynamicTable);
  }

  // Consistent naming alias with other goto* methods
  async gotoDynamicTable() {
    await this.dynamicTable();
  }
}
