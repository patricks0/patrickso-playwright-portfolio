import { PRODUCTS } from './data/products';
import { test, expect } from './fixtures/newUser.fixture';
import { PageManager } from './page-objects/pageManager';
import { assertEqual, assertText } from '../../support/assertions';
import { parseCurrency } from './helpers/numberParser';
import { setupNewUser } from './setup/newUser.setup';
import { buildVisaCard } from '../../data/factories';

test('Test Case 14 - Verify user can place order then register user before checking out', async ({
  page,
}) => {
  const pm = new PageManager(page);

  const products = [
    { ...PRODUCTS.WHITE_TOP, qty: 2 },
    { ...PRODUCTS.BLUE_TOP, qty: 2 },
  ];

  await pm.onNavBar.goToProducts();
  await assertText(pm.onProductsPage.allProductsText, 'All Products', 'All Products is visible');

  // Add all products to cart
  for (const [index, p] of products.entries()) {
    await pm.onProductsPage.clickAddToCart(p.name, p.qty);
    if (index < products.length - 1) {
      await pm.onProductsPage.clickContinueShopping();
    }
  }

  await pm.onProductsPage.clickViewCart();

  // Verify cart rows
  for (const p of products) {
    const cart = await pm.onViewCartPage.getCartRowValues(p.name);
    const unitPrice = parseCurrency(p.priceText);
    const expectedTotal = unitPrice * p.qty;

    await assertEqual(cart.quantity, p.qty, `Quantity for ${p.name}`);
    await assertEqual(cart.price, unitPrice, `Unit price for ${p.name}`);
    await assertEqual(cart.total, expectedTotal, `Total for ${p.name}`);
  }
  await pm.onViewCartPage.clickProceedToCheckout();
  await pm.onViewCartPage.clickRegisterLoginLinkDialogue();
  // Register a new user
  const user = await setupNewUser(page, { skipNavigateHome: true });
  await assertText(
    pm.onNavBar.actualUserLoggedIn,
    `Logged in as ${user.username}`,
    'Logged in as username is visible',
  );
  await pm.onNavBar.goToCart();
  await pm.onViewCartPage.clickProceedToCheckout();

  //ASSERTIONS for DELIVERY SECTION
  await assertText(
    pm.onCheckOutPage.addressFullName,
    `Mr. ${user.firstName} ${user.lastName}`,
    'Delivery address name is correct',
  );
  await assertText(
    pm.onCheckOutPage.deliveryCompany,
    user.company,
    'Deliver Company name is correct',
  );
  await assertText(
    pm.onCheckOutPage.deliveryStreet,
    user.address.line1,
    'Delivery Street Address is correct',
  );
  await assertText(
    pm.onCheckOutPage.deliveryCityStatePostcode,
    `${user.address.city} ${user.address.state} ${user.address.postcode}`,
    'Delivery City Address is correct',
  );
  await assertText(
    pm.onCheckOutPage.deliveryCountry,
    user.address.country,
    'Delivery Country is correct',
  );
  await assertText(
    pm.onCheckOutPage.deliveryMobile,
    user.mobile,
    'Delivery Mobile number is correct',
  );

  //ASSERTINGS for BILLING ADDRESS
  await assertText(
    pm.onCheckOutPage.billingFullName,
    `Mr. ${user.firstName} ${user.lastName}`,
    'Billing address name is correct',
  );
  await assertText(
    pm.onCheckOutPage.billingCompany,
    user.company,
    'Billing Company name is correct',
  );
  await assertText(
    pm.onCheckOutPage.billingStreet,
    user.address.line1,
    'Billing Street Address is correct',
  );
  await assertText(
    pm.onCheckOutPage.billingCityStatePostcode,
    `${user.address.city} ${user.address.state} ${user.address.postcode}`,
    'Billing City Address is correct',
  );
  await assertText(
    pm.onCheckOutPage.billingCountry,
    user.address.country,
    'Billing Country is correct',
  );
  await assertText(
    pm.onCheckOutPage.billingMobile,
    user.mobile,
    'Billing Mobile number is correct',
  );

  //Assertions for REVIEW YOUR ORDER SECTION
  await assertText(
    pm.onCheckOutPage.reviewYourOrderText,
    'Review Your Order',
    'Review Your Order is visible',
  );

  // Verify Products in review your order
  let expectedTotalAmount = 0;
  for (const p of products) {
    const cart = await pm.onCheckOutPage.getCartRowValues(p.name);
    const unitPrice = parseCurrency(p.priceText);
    const expectedTotalofProduct = unitPrice * p.qty;
    expectedTotalAmount = expectedTotalAmount + expectedTotalofProduct;

    await assertEqual(cart.quantity, p.qty, `Quantity for ${p.name}`);
    await assertEqual(cart.price, unitPrice, `Unit price for ${p.name}`);
    await assertEqual(cart.total, expectedTotalofProduct, `Total for ${p.name}`);
  }
  await assertEqual(
    await pm.onCheckOutPage.getCartTotalAmount(),
    expectedTotalAmount,
    'Total Amount is correct',
  );

  await pm.onCheckOutPage.enterTextonAreaComments('Please deliver between 9 AM and 5 PM');
  await pm.onCheckOutPage.placeOrderButton.click();
  //payment details
  const card = buildVisaCard();
  await pm.onPaymentPage.enterNameOnCard('Mr. ' + user.firstName + ' ' + user.lastName);
  await pm.onPaymentPage.enterCardNumber(card.number);
  await pm.onPaymentPage.enterCVC(card.cvv);
  await pm.onPaymentPage.enterExpiryMonth(card.mm);
  await pm.onPaymentPage.enterExpiryYear(card.yy);

  await pm.onPaymentPage.clickPayAndConfirmOrder();
  const message = await pm.onPaymentPage.successMessage.textContent();
  //await expect(message?.trim()).toBe('Your order has been placed successfully!');
  await assertEqual(
    message?.trim(),
    'Your order has been placed successfully!',
    'Order success message',
  );
  await pm.onNavBar.clickDeleteAccount();
  assertText(
    pm.onAccountDeletedPage.accountDeletedText,
    'Account Deleted!',
    'Account Deleted! text is visible',
  );
});
