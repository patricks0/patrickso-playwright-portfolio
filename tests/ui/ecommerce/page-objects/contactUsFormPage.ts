import { Page , Locator, expect } from '@playwright/test';
import { NavBar } from '../components/navBar';

export class ContactUsFormPage {
    readonly page: Page;
    readonly nav: NavBar;
    constructor(page: Page) {
        this.page = page;
        this.nav = new NavBar(page);
    }

    //LOCATORS
    get contactUsText(): Locator { return this.page.getByText(/Contact Us/i); }
    get getInTouchText(): Locator { return this.page.getByText(/Get In Touch/i); }
    get nameInputField(): Locator { return this.page.locator('input[data-qa="name"]'); }
    get emailInputField(): Locator { return this.page.locator('input[data-qa="email"]'); }
    get subjectInputField(): Locator { return this.page.locator('input[data-qa="subject"]'); }
    get messageTextArea(): Locator { return this.page.locator('textarea[data-qa="message"]'); }
    get uploadFileInputField(): Locator { return this.page.locator('input[name="upload_file"]'); }
    get submitButton(): Locator { return this.page.locator('input[data-qa="submit-button"]'); }
    get successAlert(): Locator { return this.page.locator('.status.alert.alert-success'); }
    get homeButton(): Locator { return this.page.locator('.btn.btn-success'); }

    //ACTIONS
    async enterName(name: string) {
        await this.nameInputField.fill(name);
    }
    async enterEmail(email: string) {
        await this.emailInputField.fill(email);
    }
    async enterSubject(subject: string) {
        await this.subjectInputField.fill(subject);
    }
    async enterMessage(message: string) {
        await this.messageTextArea.fill(message);
    }
    async uploadFile(filePath: string) {
        await this.uploadFileInputField.setInputFiles(filePath);
    }
    async clickSubmitButton() {
        await this.submitButton.click();
    }
    async fillContactForm(name: string, email: string, subject: string, message: string, filePath?: string) {
        await this.page.waitForLoadState('load');
        await this.enterName(name);
        await this.enterEmail(email);
        await this.enterSubject(subject);
        await this.enterMessage(message);
        if (filePath) {
            await this.uploadFile(filePath);
        }
    }
    async clickSubmitAndAcceptAlert(expectedAlertText: string){
        this.page.on('dialog', async (dialog) => {
            expect(dialog.message()).toContain(expectedAlertText);
            await dialog.accept();
            console.log(`Dialog message was: "${dialog.message()}"`);
            return dialog.message();
        })
        await this.clickSubmitButton();
    }
    async clickHomeButton() {
        await this.homeButton.click();
    }
}
