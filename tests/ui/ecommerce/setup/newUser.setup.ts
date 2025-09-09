import { Page} from '@playwright/test';
import {
  userBuilder,
  companyBuilder,
  addressBuilder,
  generateRandomDOB,
  mobileNumberBuilder,
} from '../../../data/factories';
import { assertText } from '../../../support/assertions';
import { PageManager } from '../page-objects/pageManager';

export type NewUserResult = {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  address: ReturnType<typeof addressBuilder>;
  storageStatePath?: string;
};

type SetupOptions = {
  country?: string;
  state?: string;
  /** If provided, the session will be saved here via storageState */
  saveStateTo?: string;
};

export async function setupNewUser(page: Page, opts: SetupOptions = {}): Promise<NewUserResult> {
  const pm = new PageManager(page);

  const user = userBuilder();
  const company = companyBuilder();
  const { username, email, firstName, lastName } = user;
  const address = addressBuilder(opts.country ?? 'Australia', { state: opts.state ?? 'VIC' });
  const mobile = mobileNumberBuilder(address.country);
  const dob = generateRandomDOB(18);

  await page.goto('/');
  await pm.onHome.clickSignupLoginLink();
  await assertText(pm.onLoginSignUpPage.newUserSignupText, 'New User Signup!', 'Expected Text displayed');

  // Signup form
  await pm.onLoginSignUpPage.enterSignUpUserName(username);
  await pm.onLoginSignUpPage.enterEmailAddress(email);
  await pm.onLoginSignUpPage.clickSignupButton();

  await assertText(pm.onRegisterPage.enterAccountInfoText, 'Enter Account Information', 'Expected Text displayed');

  // Account details
  await pm.onRegisterPage.clickGenderRadio('Mr');
  await pm.onRegisterPage.enterPassword('Password123!');
  await pm.onRegisterPage.pickDateOfBirth(dob.day, dob.monthName, dob.year);
  await pm.onRegisterPage.checkNewsLetterCheckbox();
  await pm.onRegisterPage.checkOffersCheckbox();
  await pm.onRegisterPage.enterFirstName(firstName);
  await pm.onRegisterPage.enterLastName(lastName);

  // Address/contact
  await pm.onRegisterPage.enterCompany(company.name);
  await pm.onRegisterPage.selectCountry(address.country);
  await pm.onRegisterPage.enterState(address.state);
  await pm.onRegisterPage.enterCity(address.city);
  await pm.onRegisterPage.enterAddress1(address.line1);
  await pm.onRegisterPage.enterZipcode(address.postcode);
  await pm.onRegisterPage.enterMobile(mobile);
  //await pm.onRegisterPage.createAccountBtn.click();
  await pm.onRegisterPage.clickCreateAccountButton();

  // Verify and continue
  //await assertText(pm.onRegisterPage.accountCreatedText, 'Account Created!', 'Expected Text displayed');
  await assertText(pm.onAccountCreatedPage.accountCreatedText, 'Account Created!', 'Expected Text displayed');

  await pm.onAccountCreatedPage.clickContinueButton();

  // Optional: persist session state
  if (opts.saveStateTo) {
    await page.context().storageState({ path: opts.saveStateTo });
  }

  return { username, email, firstName, lastName, address, storageStatePath: opts.saveStateTo };
}