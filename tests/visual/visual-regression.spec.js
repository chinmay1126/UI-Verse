const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

function fileUrl(p) {
  return pathToFileURL(path.resolve(p)).toString();
}

test.describe('Visual regression: core pages', () => {
  test('index page screenshot matches baseline', async ({ page }) => {
    await page.goto(fileUrl('index.html'));
    await expect(page).toHaveScreenshot('index.png', { fullPage: true });
  });

  test('button page screenshot matches baseline', async ({ page }) => {
    await page.goto(fileUrl('button.html'));
    await expect(page).toHaveScreenshot('button-button.png', { fullPage: true });
  });

  test('navbar page screenshot matches baseline', async ({ page }) => {
    await page.goto(fileUrl('navbar.html'));
    await expect(page).toHaveScreenshot('navbar.png', { fullPage: true });
  });
});
