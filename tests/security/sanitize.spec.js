const { test, expect } = require('@playwright/test');

test.describe('Sanitizer', () => {
  test('removes dangerous attributes', async ({ page }) => {
    page.on('console', (m) => console.log('PAGE LOG ›', m.text()));
    await page.goto('/components/security/sanitize-demo.html');
    const out = page.locator('#output');
    const payload = page.locator('#payload');
    await payload.fill('<img src=x onerror=alert(1)><strong>hello</strong>');
    await page.locator('#render').click();
    // output should contain <strong>hello</strong> but not onerror
    const html = await out.innerHTML();
    expect(html).toContain('<strong>hello</strong>');
    expect(html).not.toContain('onerror');
  });
});
