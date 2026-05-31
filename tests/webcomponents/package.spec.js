const { test, expect } = require('@playwright/test');

test.describe('Package packaging', () => {
  test('exports a browser-ready component bundle', async ({ page }) => {
    await page.goto('/components/Package/demo-package.html');
    await page.waitForFunction(() => !!window.DesignTokens && !!customElements.get('uv-button'));

    const registry = await page.evaluate(() => ({
      button: !!customElements.get('uv-button'),
      modal: !!customElements.get('uv-modal'),
      tooltip: !!customElements.get('uv-tooltip'),
      languageSwitcher: !!customElements.get('uv-language-switcher'),
      themeSwitcher: !!customElements.get('uv-theme-switcher'),
      packageReady: !!window.UIVerse
    }));

    expect(registry.button).toBeTruthy();
    expect(registry.modal).toBeTruthy();
    expect(registry.tooltip).toBeTruthy();
    expect(registry.languageSwitcher).toBeTruthy();
    expect(registry.themeSwitcher).toBeTruthy();
    expect(registry.packageReady).toBeTruthy();

    const switcher = page.locator('uv-theme-switcher select');
    await expect(switcher).toBeVisible();
    await switcher.selectOption('dark');
    await page.waitForFunction(() => document.documentElement.dataset.theme === 'dark');

    const theme = await page.evaluate(() => document.documentElement.dataset.theme);
    const accent = await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--accent').trim());

    expect(theme).toBe('dark');
    expect(accent).toBe('#ff8a5b');
  });
});
