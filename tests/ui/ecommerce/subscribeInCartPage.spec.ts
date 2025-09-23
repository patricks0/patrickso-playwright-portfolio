import { test } from './fixtures/newUser.fixture';
import { PageManager } from './page-objects/pageManager';
import { userBuilder } from '../../data/factories';
import { assertText } from '../../support/assertions';


test('Test Case 11 - Verify user can successfully subcribe in Cart page', async ({ page }) => {
    const pm = new PageManager(page);
    const user = userBuilder();
    const { email } = user;

    await pm.onNavBar.goToCart();
    await assertText(pm.onFooter.subscribeText, `Subscription`, 'Subscription text is visible');
    await pm.onFooter.subscribe( email );
    await assertText(pm.onFooter.successAlert, 'You have been successfully subscribed!', 'Success message is visible after subscribing');
})