import { test } from './fixtures/newUser.fixture';
import { PageManager } from './page-objects/pageManager';
import { assertText } from '../../support/assertions';

test('Test Case 2 - Verify that a registered user can login with valid credentials', async ({ page, newUser }) => {
    const pm = new PageManager(page);

    await pm.onNavBar.clickLogout();
    await assertText(pm.onLoginSignUpPage.loginToYourAccountText, `Login to your account`, 'Login Page is visible, successfully logged out');
    await pm.onLoginSignUpPage.login(newUser.email, 'Password123!');
    await assertText(pm.onNavBar.actualUserLoggedIn, `Logged in as ${newUser.username}`, 'Logged in as username is visible');
});