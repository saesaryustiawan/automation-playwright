import { type Locator, type Page } from '@playwright/test';

export type ProductSort = 'az' | 'za' | 'lohi' | 'hilo';

/** Page object for the inventory catalogue. */
export class ProductsPage {
  readonly productList: Locator;
  readonly productNames: Locator;
  readonly productPrices: Locator;
  readonly sortDropdown: Locator;
  readonly cartButton: Locator;
  readonly cartBadge: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(private readonly page: Page) {
    this.productList = page.locator('.inventory_list');
    this.productNames = page.locator('[id$="_title_link"]');
    this.productPrices = page.locator('.inventory_item_price');
    this.sortDropdown = page.getByRole('combobox');
    this.cartButton = page.locator('.shopping_cart_link');
    this.cartBadge = page.getByTestId('shopping-cart-badge');
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
  }

  async getProductNames(): Promise<string[]> {
    return this.productNames.allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const prices = await this.productPrices.allTextContents();
    return prices.map((price) => Number(price.replace('$', '')));
  }

  async sortProducts(sort: ProductSort): Promise<void> {
    await this.sortDropdown.selectOption(sort);
  }

  async addProductToCart(productName: string): Promise<void> {
    await this.page
      .locator('.inventory_item')
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Add to cart' })
      .click();
  }

  async openProduct(productName: string): Promise<void> {
    await this.page.locator('[id$="_title_link"]', { hasText: productName }).click();
  }

  async goToCart(): Promise<void> {
    await this.cartButton.click();
  }

  async logout(): Promise<void> {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}
