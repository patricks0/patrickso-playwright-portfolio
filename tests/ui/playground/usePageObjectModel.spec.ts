import { PageManager } from './page-objects/pageManager';
import { test, expect } from '../../fixtures/testData.fixture';
import { assertVisible, assertEqual, assertText, logAssert } from '../../support/assertions';


test('AJAX button triggers content (UITestingPlayground)', async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().ajaxPage();
    await pm.onAjax.triggerAjaxRequest();
    await logAssert("Received Response Ok on Ajax wait", async () => { await pm.onAjax.waitForAjaxResponseOk() });
    await assertText(pm.onAjax.dataLoadedText(), 'Data loaded with AJAX get request.', 'Expected Text displayed')
});

test('Dynamic Table: Chrome CPU equals bottom label value', async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().dynamicTablePage(); // using PageManager for navigation
    const tableValue = await pm.onDynamicTable.captureValueofCpu('Chrome');
    const summaryValue = await pm.onDynamicTable.chromeCpuSummaryValue();
    await assertEqual(tableValue, summaryValue, "Dynamic Table 'Chrome CPU' equals yellow summary");
});

test('Class Attribute button is visible and clickable', async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().classAttributePage();
    const message = await pm.onClassAttribute.clickButtonAndAcceptAlert();
    await logAssert("Dialogue was visible with text 'Primary button pressed'", async () => { expect(message).toBe('Primary button pressed') });
    await logAssert("Dialogue box is not visible", async () => { await pm.onClassAttribute.expectNoDialogWithin(500) });

});

test('text input tests verify button name changed based on text input', async ({ page, randomButtonLabel }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().textInputPage();
    const buttonName = randomButtonLabel(); // Deterministic via seeded faker
    await pm.onTextInput.textBox().fill(buttonName);
    await pm.onTextInput.clickButton();
    await assertText(pm.onTextInput.button(), buttonName, `Text button label found ${buttonName}`);
});


test('Dynamic ID button is visible and clickable', async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().dynamicButtonIdPage();
    await pm.onDynamicButtonId.clickDynamicButton();
    await assertVisible(pm.onDynamicButtonId.dynamicButton(), 'Button with Dynamic ID');
});

test('Progress Bar - wait until 75% then stop', async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().progressBarWaitPage();
    await pm.onProgressBarWait.startButton().click();
    await pm.onProgressBarWait.waitForProgressBarToReach75Percent();
    await pm.onProgressBarWait.clickStopButton();
    const finalValueOfProgressBar = await pm.onProgressBarWait.progressBarValue();
    await assertEqual(finalValueOfProgressBar, '75', `Progress Bar value is equal ${finalValueOfProgressBar}`)
});

test('Text with spaces', async ({ page }) => {
    const pm = new PageManager(page);
    await pm.navigateTo().verifyTextPage();
    await assertText(pm.onVerifyText.textToVerify(), 'Welcome UserName!', "Expected Text Message visible");
});
