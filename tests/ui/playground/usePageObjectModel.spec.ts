import { test, expect } from '@playwright/test';
import { NavigationPage } from './page-objects/navigationPage';
import { AjaxPage } from './page-objects/ajaxPage';
import { PageManager } from './page-objects/pageManager';

test('AJAX button triggers content (UITestingPlayground)', async ({ page }) => {
    const nav = new NavigationPage(page);
    const ajax = new AjaxPage(page);

    await nav.gotoAjax();                 // centralized navigation
    await ajax.triggerAjaxRequest();      // page-specific action
    await ajax.waitForAjaxResponseOk();   // network-level confirmation
    await ajax.expectDataLoadedVisible(); // UI confirmation
});

test('Dynamic Table: Chrome CPU equals bottom label value', async ({ page }) => {
    const pm = new PageManager(page);

    await pm.navigateTo().dynamicTable(); // using PageManager for navigation

    const tableValue = await pm.onDynamicTable.cellText('Chrome', 'CPU');
    const summaryValue = await pm.onDynamicTable.chromeCpuSummaryValue();

    console.log(`Asserting: TableValue='${tableValue}' vs SummaryValue='${summaryValue}'`);
    expect(tableValue).toBe(summaryValue);
});