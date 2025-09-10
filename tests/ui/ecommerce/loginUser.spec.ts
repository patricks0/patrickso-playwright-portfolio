import { test} from './fixtures/newUser.fixture';
import { PageManager } from './page-objects/pageManager';
import { assertText} from '../../support/assertions';

test('Test Case 2 - Verify that a registered user can login with valid credentials', async ({ page, newUser }) => {
  const pm = new PageManager(page);

  await pm.onHome.nav.clickLogout();
  await assertText(pm.onLoginSignUpPage.loginToYourAccountText, `Login to your account`, 'Login Page is visible');
});