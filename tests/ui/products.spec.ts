import { products } from '../../data/test-data';
import { expect, test } from '../../fixtures/test-fixtures';
import { ProductDetailPage } from '../../pages/ProductDetailPage';

test.describe('Product listing', { tag: '@regression' }, () => {
  test('shows the available products', { tag: '@smoke' }, async ({ authenticatedProductsPage }) => {
    const productsPage = authenticatedProductsPage;

    await expect(productsPage.productList).toBeVisible();
    await expect(productsPage.productNames).toHaveCount(6);
    expect(await productsPage.getProductNames()).toContain(products.backpack.name);
  });

  test('sorts products by price from low to high', async ({ authenticatedProductsPage }) => {
    const productsPage = authenticatedProductsPage;

    await productsPage.sortProducts('lohi');

    const prices = await productsPage.getProductPrices();
    expect(prices).toEqual([...prices].sort((first, second) => first - second));
  });

  test('shows the selected product details', async ({ page, authenticatedProductsPage }) => {
    const productsPage = authenticatedProductsPage;
    const productDetailPage = new ProductDetailPage(page);

    await productsPage.openProduct(products.backpack.name);

    await expect(productDetailPage.productName).toHaveText(products.backpack.name);
    await expect(productDetailPage.productDescription).toBeVisible();
    await expect(productDetailPage.productPrice).toHaveText('$29.99');
  });
});
