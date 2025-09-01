import { test, expect } from '@playwright/test';
import { PageManager } from './page-objects/pageManager';

test('AJAX button triggers content (UITestingPlayground)', async ({ page }) => {
    const pm = new PageManager(page);

    await pm.navigateTo().ajaxPage();
    await pm.onAjax.triggerAjaxRequest();    // centralized navigation
    await pm.onAjax.waitForAjaxResponseOk();
    await pm.onAjax.expectDataLoadedVisible();    // page-specific action
});

test('Dynamic Table: Chrome CPU equals bottom label value', async ({ page }) => {
    const pm = new PageManager(page);

    await pm.navigateTo().dynamicTablePage(); // using PageManager for navigation

    const tableValue = await pm.onDynamicTable.captureValueofCpu('Chrome');
    const summaryValue = await pm.onDynamicTable.chromeCpuSummaryValue();

    console.log(`Asserting: TableValue='${tableValue}' vs SummaryValue='${summaryValue}'`);
    expect(tableValue).toBe(summaryValue);
});

test('Class Attribute button is visible and clickable', async ({ page }) => {
    const pm = new PageManager(page);

    await pm.navigateTo().classAttributePage();
    const message = await pm.onClassAttribute.clickButtonAndAcceptAlert();
    // Assert the alert text is correct
    expect(message).toContain('Primary button pressed');
    await pm.onClassAttribute.expectNoDialogWithin(500);
    
});
