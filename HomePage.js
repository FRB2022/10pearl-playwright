export class HomePage {
  constructor(page) {
    this.page = page;
    this.searchBox = 'input[placeholder="Search in Daraz"]';
    this.searchButton = '.search-box__button--1oH7'; // stable class for search button
  }

  async goto() {
    await this.page.goto('https://www.daraz.pk/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await this.page.waitForSelector(this.searchBox, { timeout: 20000 });
  }

  async searchItem(itemName) {
    await this.page.fill(this.searchBox, itemName);
    
    // Wait for search button or just press Enter
    if (await this.page.$(this.searchButton)) {
      await this.page.click(this.searchButton);
    } else {
      await this.page.press(this.searchBox, 'Enter');
    }
    
    await this.page.waitForLoadState('domcontentloaded');
  }
}
