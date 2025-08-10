export class SearchResultsPage {
  constructor(page) {
    this.page = page;
    this.brandCheckbox = 'input[type="checkbox"]';
    this.minPrice = 'input[placeholder="Min"]';
    this.maxPrice = 'input[placeholder="Max"]';
    // More robust selector for the Apply button
    this.applyPriceBtn = 'button.ant-btn-primary.ant-btn-icon-only';
    this.productCards = '[data-qa-locator="product-item"]';
  }

  async filterByBrand() {
    await this.page.waitForSelector(this.brandCheckbox, { timeout: 20000 });
    await this.page.check(this.brandCheckbox);
    await this.page.waitForTimeout(2000);
  }

async filterByPrice(min, max) {
  await this.page.waitForSelector(this.minPrice, { timeout: 20000 });

  await this.page.locator(this.minPrice).scrollIntoViewIfNeeded();

  await this.page.fill(this.minPrice, min.toString());
  await this.page.fill(this.maxPrice, max.toString());

  await this.page.waitForTimeout(1000);

  const applyButtonLocator = this.page.locator(this.applyPriceBtn).first();
  await applyButtonLocator.scrollIntoViewIfNeeded();
  await applyButtonLocator.waitFor({ state: 'visible', timeout: 20000 });

  const initialCount = await this.page.locator(this.productCards).count();

  await applyButtonLocator.click({ force: true });

  // Wait until the product count changes
  await this.page.waitForFunction(
    (selector, count) => document.querySelectorAll(selector).length !== count,
    this.productCards,
    initialCount
  );
}


  async getProductCount() {
    await this.page.waitForSelector(this.productCards, { timeout: 20000 });
    const products = await this.page.$$(this.productCards);
    return products.length;
  }

  async clickFirstProduct() {
    await this.page.waitForSelector(this.productCards, { timeout: 20000 });
    await this.page.click(`${this.productCards} >> nth=0`);
  }
}
