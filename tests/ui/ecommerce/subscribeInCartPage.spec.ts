import { test } from './fixtures/newUser.fixture';
import { PageManager } from './page-objects/pageManager';
import { userBuilder } from '../../data/factories';
import { assertText } from '../../support/assertions';


test('Test Case 10 - Verify user can successfully subcribe using email', async ({ page }) => {
    const pm = new PageManager(page);
    const user = userBuilder();
    const { email } = user;

    await assertText(pm.onHome.subscribeText, `Subscription`, 'Subscription text is visible');
    await pm.onHome.subscribe( email );
    await assertText(pm.onHome.successAlert, 'You have been successfully subscribed!', 'Success message is visible after subscribing');
})