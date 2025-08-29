import { Page, Locator, expect } from '@playwright/test';

export class AjaxPage {
  constructor(private page: Page) {}

  // Locators
  triggerButton(): Locator {
    return this.page.getByRole('button', { name: 'Button Triggering AJAX Request' });
  }
  dataLoadedText(): Locator {
    return this.page.getByText('Data loaded');
  }

  // Actions
  async triggerAjaxRequest() {
    await this.triggerButton().click();
  }

  // Waits / Assertions
  async waitForAjaxResponseOk() {
    await this.page.waitForResponse(
      (resp) => resp.url().includes('/ajaxdata') && resp.status() === 200
    );
  }

  async expectDataLoadedVisible(timeoutMs = 15000) {
    await expect(this.dataLoadedText()).toBeVisible({ timeout: timeoutMs });
  }
}