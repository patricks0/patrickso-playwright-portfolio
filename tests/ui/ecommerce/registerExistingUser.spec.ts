import { test } from './fixtures/newUser.fixture';
import { PageManager } from './page-objects/pageManager';
import { assertText } from '../../support/assertions';

test('Test Case 5 - Verify that a registered user cannot register again', async ({ page, newUser }) => {
  const pm = new PageManager(page);
  await assertText(pm.onHome.actualUserLoggedIn, `Logged in as ${newUser.username}`, 'Logged in as username is visible');
  await pm.onHome.nav.clickLogout();
  await assertText(pm.onLoginSignUpPage.loginToYourAccountText, `Login to your account`, 'Login Page is visible, successfully logged out');
  await pm.onLoginSignUpPage.signUp(newUser.username, newUser.email);
  await assertText(pm.onLoginSignUpPage.emailAlreadyExistText, `Email Address already exist!`, 'Error message visible for existing user');
  await pm.onLoginSignUpPage.login(newUser.email, 'Password123!');
});