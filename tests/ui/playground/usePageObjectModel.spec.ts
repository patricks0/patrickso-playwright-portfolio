//import { test, expect } from '@playwright/test';
import { PageManager } from './page-objects/pageManager';
import { test, expect } from '../../fixtures/testData.fixture';


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

test('text input tests verify button name changed based on text input', async ({ page, randomButtonLabel }) => {
        const pm = new PageManager(page);

        await pm.navigateTo().textInputPage();
        const buttonName = randomButtonLabel(); // Deterministic via seeded faker
        await pm.onTextInput.textBox().fill(buttonName);
        await pm.onTextInput.clickButton();
        await pm.onTextInput.expectedButtonText(buttonName);
    });