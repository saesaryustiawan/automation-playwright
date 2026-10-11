import { expect, test as base } from '@playwright/test';
import { applicationPaths } from '../data/test-data';
import { users } from '../data/users';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

type ApplicationFixtures = {
  authenticatedProductsPage: ProductsPage;
};

/**
 * Provides a new, authenticated inventory page for every test that needs one.
 * The fixture keeps setup consistent without sharing browser state between tests.
 */
export const test = base.extend<ApplicationFixtures>({
  authenticatedProductsPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);

    await loginPage.navigate();
    await loginPage.login(users.standard.username, users.standard.password);
    await expect(page).toHaveURL(applicationPaths.products);
    await expect(productsPage.sortDropdown).toBeVisible();

    await use(productsPage);
  },
});

export { expect };
