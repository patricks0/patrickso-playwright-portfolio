import { test } from './fixtures/newUser.fixture';
import { PageManager } from './page-objects/pageManager';
import { assertText } from '../../support/assertions';

test('Test Case 4 - Verify that user can logout successfully', async ({ page, newUser }) => {
    const pm = new PageManager(page);

    await pm.onNavBar.clickLogout();
    await assertText(pm.onLoginSignUpPage.loginToYourAccountText, `Login to your account`, 'Login Page is visible, successfully logged out');
    await pm.onLoginSignUpPage.login(newUser.email, 'Password123!');
});