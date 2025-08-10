export class ProductPage {
  constructor(page) {
    this.page = page;
    // Regex locator matches "Free Shipping" or "Free Delivery" (case-insensitive)
    this.freeShippingLabel = 'text=/free (shipping|delivery)/i';
  }

  async isFreeShippingAvailable() {
    try {
      await this.page.waitForSelector(this.freeShippingLabel, { timeout: 5000 });
      return true; // Found free shipping/delivery
    } catch {
      console.error('❌ This product has no free shipping — failing the test');
      return false; // Not found
    }
  }
}
