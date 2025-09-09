import { userBuilder, companyBuilder,addressBuilder,generateRandomDOB, mobileNumberBuilder } from '../../data/factories';
import { test, expect } from '../../fixtures/testData.fixture';
import { PageManager } from '../ecommerce/page-objects/pageManager';
import { assertVisible, assertEqual, assertText, logAssert } from '../../support/assertions';

test('Verify that user can be registered', async ({ page }) => {
    const pm = new PageManager(page);
    const user = userBuilder();
    const company = companyBuilder();
    const { username, email, firstName, lastName } = user;
    const address = addressBuilder('Australia', {state: 'VIC'});
    const mobile = mobileNumberBuilder(address.country);
    
    await page.goto('/'); 
    await pm.onHome.clickSignupLoginLink();
    await assertText(pm.onLoginSignUpPage.newUserSignupText, 'New User Signup!', 'Expected Text displayed')
    // Fill signup form
    //await pm.onLoginSignUpPage.userNameInputField().fill(username);
    await pm.onLoginSignUpPage.enterSignUpUserName(username);

    //await pm.onLoginSignUpPage.emailInputField().fill(email);
    await pm.onLoginSignUpPage.enterEmailAddress(email);

    await pm.onLoginSignUpPage.clickSignupButton();

    await expect(page.getByText(/Enter Account Information/i)).toBeVisible();

    // Fill account details
    await page.locator('.radio#uniform-id_gender2').check();
    await page.getByRole('textbox', { name: 'password' }).fill('Password123!');
    const dob = generateRandomDOB(18);
    await page.locator('select#days').selectOption({ label: dob.day });
    await page.locator('select#months').selectOption({ label: dob.monthName });
    await page.locator('select#years').selectOption({ label: dob.year });
    await page.getByLabel('Sign up for our newsletter!').check();
    await page.getByLabel('Receive special offers from our partners!').check();
    await page.getByRole('textbox', { name: 'First name' }).fill(firstName);
    await page.getByRole('textbox', { name: 'Last name' }).fill(lastName);

    // Address/contact
    await page.locator('#company').fill(company.name);
    await page.locator('#address1').fill(address.line1);
    await page.locator('#city').fill(address.city);
    await page.locator('#zipcode').fill(address.postcode);
    await page.locator('select#country').selectOption({ label: address.country });
    await page.locator('#state').fill(address.state);
    await page.locator('#mobile_number').fill(mobile);
    await page.getByRole('button', { name: /create account/i }).click();

    // Verify account creation
    await expect(page.getByText(/account created!/i)).toBeVisible();
    await page.locator('[data-qa="continue-button"]').click();
    await expect(page.getByText(`Logged in as ${username}`)).toBeVisible();

    // Cleanup: delete the created account
    await page.getByRole('link', { name: /delete account/i }).click();
    await expect(page.getByText(/account deleted!/i)).toBeVisible();
});

