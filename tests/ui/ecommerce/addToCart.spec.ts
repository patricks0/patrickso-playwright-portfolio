import { PRODUCTS } from './data/products';
import { test } from './fixtures/newUser.fixture';
import { PageManager } from './page-objects/pageManager';
import { assertEqual, assertText } from '../../support/assertions';
import { parseCurrency } from './helpers/numberParser';


test('Test Case 12 - Verify user can add products to cart and verify details', async ({ page }) => {
  const pm = new PageManager(page);

  const products = [
    { ...PRODUCTS.WHITE_TOP, qty: 2 },
    { ...PRODUCTS.BLUE_TOP,  qty: 2 }
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
});