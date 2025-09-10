import { test } from './fixtures/newUser.fixture';
import { PageManager } from './page-objects/pageManager';
import { assertText } from '../../support/assertions';

test('Test Case 3 - Verify that user receives an error when logging in with invalid user', async ({ page }) => {
    const pm = new PageManager(page);
    await page.goto('/');
    await pm.onHome.nav.clickSignupLoginLink();
    await assertText(pm.onLoginSignUpPage.loginToYourAccountText, `Login to your account`, 'Login Page is visible');
    // Attempt to login with invalid credentials
    await pm.onLoginSignUpPage.login('invalidUser@wrongemail.com', 'PasswordPassword!');
    await assertText(pm.onLoginSignUpPage.incorrectEmailPasswordText, `Your email or password is incorrect!`, 'Error message visible for incorrect login');
});