import { Page, Locator } from '@playwright/test';
import { NavBar } from '../components/navBar';

export class RegisterPage {
  readonly page: Page;
  readonly nav: NavBar;
  constructor(page: Page) {
    this.page = page;
    this.nav = new NavBar(page);
  }

  //Page Elements for Assertions
  get enterAccountInfoText(): Locator { return this.page.getByText(/Enter Account Information/i); }
  get accountCreatedText(): Locator { return this.page.getByText(/Account Created!/i); }

  // Account info
  get genderRadioFemale(): Locator { return this.page.locator('.radio#uniform-id_gender2'); }
  get genderRadioMale(): Locator { return this.page.locator('.radio#uniform-id_gender1'); }
  get passwordInput(): Locator { return this.page.getByRole('textbox', { name: 'password' }); }
  get daySelect(): Locator { return this.page.locator('select#days'); }
  get monthSelect(): Locator { return this.page.locator('select#months'); }
  get yearSelect(): Locator { return this.page.locator('select#years'); }
  get newsletterCheckbox(): Locator { return this.page.getByLabel('Sign up for our newsletter!'); }
  get offersCheckbox(): Locator { return this.page.getByLabel('Receive special offers from our partners!'); }
  get firstNameInput(): Locator { return this.page.getByRole('textbox', { name: 'First name' }); }
  get lastNameInput(): Locator { return this.page.getByRole('textbox', { name: 'Last name' }); }

  // Address/contact
  get companyInput(): Locator { return this.page.locator('#company'); }
  get address1Input(): Locator { return this.page.locator('#address1'); }
  get cityInput(): Locator { return this.page.locator('#city'); }
  get zipcodeInput(): Locator { return this.page.locator('#zipcode'); }
  get countrySelect(): Locator { return this.page.locator('select#country'); }
  get stateInput(): Locator { return this.page.locator('#state'); }
  get mobileInput(): Locator { return this.page.locator('#mobile_number'); }

  // Button Locators
  get createAccountBtn(): Locator { return this.page.getByRole('button', { name: /create account/i }); }
  get continueBtn(): Locator { return this.page.locator('[data-qa="continue-button"]'); }

  //Actions 
  async clickGenderRadio(gender: string) {
    if (gender === 'Mr') {
      await this.genderRadioMale.check();
    } else {
      await this.genderRadioFemale.check();
    }
  }
  async enterPassword(password: string) {
    await this.passwordInput.fill(password);
  }
  async pickDateOfBirth(day: string, month: string, year: string) {
    await this.daySelect.selectOption({ label: day });
    await this.monthSelect.selectOption({ label: month });
    await this.yearSelect.selectOption({ label: year });
  }
  async checkNewsLetterCheckbox() {
    await this.newsletterCheckbox.check();
  }
  async checkOffersCheckbox() {
    await this.offersCheckbox.check();
  }
  async enterFirstName(firstName: string) {
    await this.firstNameInput.fill(firstName);
  }
  async enterLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
  }
  async enterCompany(company: string) {
    await this.companyInput.fill(company);
  }
  async enterAddress1(address1: string) {
    await this.address1Input.fill(address1);
  }
  async enterCity(city: string) {
    await this.cityInput.fill(city);
  }
  async enterZipcode(zipcode: string) {
    await this.zipcodeInput.fill(zipcode);
  }
  async selectCountry(country: string) {
    await this.countrySelect.selectOption({ label: country });
  }
  async enterState(state: string) {
    await this.stateInput.fill(state);
  }
  async enterMobile(mobile: string) {
    await this.mobileInput.fill(mobile);
  }
  async clickCreateAccountButton() {
    await this.createAccountBtn.click();
  }
  async clickContinueButton() {
    await this.continueBtn.click();
  }
}