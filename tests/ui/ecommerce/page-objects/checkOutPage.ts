import { Page, Locator } from '@playwright/test';

import { NavBar } from '../components/navBar';

import { parseCurrency } from '../helpers/numberParser';

export class CheckOutPage {
  readonly page: Page;
  readonly nav: NavBar;
  constructor(page: Page) {
    this.page = page;
    this.nav = new NavBar(page);
  }

  //LOCATORS for DELIVERY SECTION
  get deliveryAddressText(): Locator {
    return this.page.locator('h2').filter({ hasText: 'Delivery Address' });
  }
  get deliveryAddressDetails(): Locator {
    return this.page.locator('#address_delivery');
  }
  get deliveryCompany(): Locator {
    return this.deliveryAddressDetails.locator('li.address_address1.address_address2').first();
  }
  get deliveryStreet(): Locator {
    return this.deliveryAddressDetails.locator('li.address_address1.address_address2').nth(1);
  }
  get deliveryCityStatePostcode(): Locator {
    return this.deliveryAddressDetails.locator('li.address_city').first();
  }
  get deliveryCountry(): Locator {
    return this.deliveryAddressDetails.locator('li.address_country_name').first();
  }
  get deliveryMobile(): Locator {
    return this.deliveryAddressDetails.locator('li.address_phone').first();
  }
  get addressFullName(): Locator {
    return this.deliveryAddressDetails.locator('.address_firstname').first();
  }
  //LOCATORS for BILLING SECTION
  get billingAddressText(): Locator {
    return this.page.locator('h2').filter({ hasText: 'Billing Address' });
  }
  get billingAddressDetails(): Locator {
    return this.page.locator('#address_invoice');
  }
  get billingCompany(): Locator {
    return this.billingAddressDetails.locator('li.address_address1.address_address2').first();
  }
  get billingStreet(): Locator {
    return this.billingAddressDetails.locator('li.address_address1.address_address2').nth(1);
  }
  get billingCityStatePostcode(): Locator {
    return this.billingAddressDetails.locator('li.address_city').first();
  }
  get billingCountry(): Locator {
    return this.billingAddressDetails.locator('li.address_country_name').first();
  }
  get billingMobile(): Locator {
    return this.billingAddressDetails.locator('li.address_phone').first();
  }
  get billingFullName(): Locator {
    return this.billingAddressDetails.locator('.address_firstname').first();
  }

  get reviewYourOrderText(): Locator {
    return this.page.locator('h2').filter({ hasText: 'Review Your Order' });
  }

  //LOCATORS for REVIEW YOUR ORDER SECTION
  getCartRow(productName: string) {
    return this.page
      .locator('#cart_info tbody tr')
      .filter({ has: this.page.locator('.cart_description', { hasText: productName }) });
  }
  async getCartRowValues(productName: string) {
    const row = this.getCartRow(productName);

    const quantityText = (await row.locator('.cart_quantity').innerText()).trim();
    const priceText = (await row.locator('.cart_price').innerText()).trim();
    const totalText = (await row.locator('.cart_total').innerText()).trim();

    return {
      quantityText,
      priceText,
      totalText,
      quantity: parseInt(quantityText, 10),
      price: parseCurrency(priceText),
      total: parseCurrency(totalText),
    };
  }
  async getCartTotalAmount() {
    const totalText = (await this.page.locator('.cart_total_price').last().innerText()).trim();
    return parseCurrency(totalText);
  }
  get textAreaComments(): Locator {
    return this.page.locator('textarea[name="message"]');
  }
  get placeOrderButton(): Locator {
    return this.page.locator('a').filter({ hasText: 'Place Order' });
  }

  get nameOnCardInput(): Locator {
    return this.page.locator('input[name="name_on_card"]');
  }
  //ACTIONS
  async enterTextonAreaComments(text: string) {
    await this.textAreaComments.fill(text);
  }
}
