import { test } from './fixtures/newUser.fixture';
import { PageManager } from './page-objects/pageManager';
import { userBuilder } from '../../data/factories';
import { assertText } from '../../support/assertions';


test('Test Case 6 - Verify that user is able to send form using Contact Us', async ({ page }) => {
    const pm = new PageManager(page);
    const user = userBuilder();
    const { email, name } = user;

    await pm.onHome.nav.goToContactUs();
    await assertText(pm.onContactUsFormPage.getInTouchText, `Get In Touch`, 'Get In Touch is visible');
    await pm.onContactUsFormPage.fillContactForm(name, email, 'Test Subject', 'This is a test message.', 'tests/ui/ecommerce/fixtures/testFile.txt');
    await pm.onContactUsFormPage.clickSubmitAndAcceptAlert('Press OK to proceed!');
    await assertText(pm.onContactUsFormPage.successAlert, 'Success! Your details have been submitted successfully.', 'Success message is visible after submitting the form');
    await pm.onContactUsFormPage.clickHomeButton();
})