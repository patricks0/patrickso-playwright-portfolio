import { test } from './fixtures/newUser.fixture';

import { PageManager } from './page-objects/pageManager';

import { assertText } from '../../support/assertions';

test('Test Case 7 - Verify that user can access Test Case Page', async ({ page }) => {
    const pm = new PageManager(page);

    await pm.onHome.nav.goToTestCases();
    await assertText(pm.onTestCasePage.testCasesText, 'Test Cases', 'Test Cases is visible');
});