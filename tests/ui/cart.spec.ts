import { applicationPaths, products } from '../../data/test-data';
import { expect, test } from '../../fixtures/test-fixtures';
import { CartPage } from '../../pages/CartPage';

test.describe('Shopping cart', { tag: '@regression' }, () => {
  test('adds one product to the cart', { tag: '@smoke' }, async ({ page, authenticatedProductsPage }) => {
    await authenticatedProductsPage.addProductToCart(products.backpack.name);
    await expect(authenticatedProductsPage.cartBadge).toHaveText('1');

    await authenticatedProductsPage.goToCart();
    const cartPage = new CartPage(page);

    await expect(page).toHaveURL(applicationPaths.cart);
    await expect(cartPage.cartItems).toHaveCount(1);
    expect(await cartPage.getCartItemNames()).toContain(products.backpack.name);
  });

  test('adds multiple products to the cart', async ({ page, authenticatedProductsPage }) => {
    await authenticatedProductsPage.addProductToCart(products.backpack.name);
    await authenticatedProductsPage.addProductToCart(products.bikeLight.name);
    await expect(authenticatedProductsPage.cartBadge).toHaveText('2');

    await authenticatedProductsPage.goToCart();
    const cartPage = new CartPage(page);

    await expect(page).toHaveURL(applicationPaths.cart);
    await expect(cartPage.cartItems).toHaveCount(2);
    expect(await cartPage.getCartItemNames()).toEqual(
      expect.arrayContaining([products.backpack.name, products.bikeLight.name]),
    );
  });

  test('removes a product from the cart', async ({ page, authenticatedProductsPage }) => {
    await authenticatedProductsPage.addProductToCart(products.backpack.name);
    await authenticatedProductsPage.goToCart();
    const cartPage = new CartPage(page);

    await cartPage.removeProduct(products.backpack.name);

    await expect(cartPage.cartItems).toHaveCount(0);
    await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
  });
});
