import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage.js';
import { SearchResultsPage } from '../pages/SearchResultsPage.js';
import { ProductPage } from '../pages/ProductPage.js';

test.describe('Daraz Search and Filter Tests', () => {
  test('Verify product count after applying filters', async ({ page }) => {
    const homePage = new HomePage(page);
    const resultsPage = new SearchResultsPage(page);

    await homePage.goto();
    await homePage.searchItem('electronics');
    await resultsPage.filterByBrand();
    await resultsPage.filterByPrice(500, 5000);

    const count = await resultsPage.getProductCount();
    console.log(`Number of products found: ${count}`);

    expect(count).toBeGreaterThan(0);
  });

  test('Verify free shipping availability for a product', async ({ page }) => {
    const homePage = new HomePage(page);
    const resultsPage = new SearchResultsPage(page);
    const productPage = new ProductPage(page);

    await homePage.goto();
    await homePage.searchItem('electronics');
    await resultsPage.filterByBrand();
    await resultsPage.filterByPrice(500, 5000);
    await resultsPage.clickFirstProduct();

    const freeShipping = await productPage.isFreeShippingAvailable();
    expect(freeShipping).toBeTruthy();
  });
});
