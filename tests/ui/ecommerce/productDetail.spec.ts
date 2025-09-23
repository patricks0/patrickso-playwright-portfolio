import { PRODUCTS } from './data/products';
import { test } from './fixtures/newUser.fixture';
import { PageManager } from './page-objects/pageManager';
import { assertText } from '../../support/assertions';




test('Test Case 8 - Verify All Products Page is Displayed and Product Detail Page after clicking', async ({ page }) => {
    const pm = new PageManager(page);
    const product = PRODUCTS.WHITE_TOP;

    await pm.onNavBar.goToProducts();
    await assertText(pm.onProductsPage.allProductsText, 'All Products', 'All Products is visible');
    await pm.onProductsPage.clickTheProduct(product.name);
    await assertText(pm.onProductDetailsPage.productName, product.name, `Product name "${product.name}" is visible`);
    await assertText(pm.onProductDetailsPage.productCategory, `Category: ${product.category}`, `Category "${product.category}" is visible`);
    await assertText(pm.onProductDetailsPage.productPrice, product.priceText, `Price "${product.priceText}" is visible`);
    await assertText(pm.onProductDetailsPage.productAvailability, `Availability: ${product.availability}`, `Availability "${product.availability}" is visible`);
    await assertText(pm.onProductDetailsPage.productCondition, `Condition: ${product.condition}`, `Condition "${product.condition}" is visible`);
    await assertText(pm.onProductDetailsPage.productBrand, `Brand: ${product.brand}`, `Brand "${product.brand}" is visible`);
});