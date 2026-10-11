import { type Locator, type Page } from '@playwright/test';

/** Page object for an individual product's customer-facing details. */
export class ProductDetailPage {
  readonly productName: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly backToProductsButton: Locator;

  constructor(private readonly page: Page) {
    this.productName = page.locator('.inventory_details_name');
    this.productDescription = page.locator('.inventory_details_desc');
    this.productPrice = page.locator('.inventory_details_price');
    this.backToProductsButton = page.getByRole('button', { name: 'Back to products' });
  }

  async returnToProducts(): Promise<void> {
    await this.backToProductsButton.click();
  }
}
