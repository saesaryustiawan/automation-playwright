import { applicationPaths, checkoutCustomer, products } from '../../data/test-data';
import { expect, test } from '../../fixtures/test-fixtures';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';

test.describe('Checkout', { tag: '@regression' }, () => {
  test('completes an order for a product in the cart', { tag: '@smoke' }, async ({ page, authenticatedProductsPage }) => {
    await authenticatedProductsPage.addProductToCart(products.backpack.name);
    await authenticatedProductsPage.goToCart();

    const cartPage = new CartPage(page);
    await cartPage.checkout();
    await expect(page).toHaveURL(applicationPaths.checkoutInformation);

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillCustomerInformation(checkoutCustomer);
    await checkoutPage.continueCheckout();
    await expect(page).toHaveURL(applicationPaths.checkoutOverview);

    await checkoutPage.finishOrder();
    await expect(page).toHaveURL(applicationPaths.checkoutComplete);
    await expect(checkoutPage.successMessage).toBeVisible();
  });
});
