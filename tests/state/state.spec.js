const { test, expect } = require('@playwright/test');
const path = require('path');
const { pathToFileURL } = require('url');

function fileUrl(p) { return pathToFileURL(path.resolve(p)).toString(); }

test.describe('State manager demo', () => {
  test('counter increments and resets', async ({ page }) => {
    page.on('console', (m) => console.log('PAGE LOG ›', m.text()));
    page.on('pageerror', (err) => console.log('PAGE ERROR ›', err.message));
    const gotoResp = await page.goto('/components/state/demo-state.html');
    console.log('GOTO URL', page.url());
    console.log('GOTO STATUS', gotoResp && gotoResp.status());
    // diagnostic: fetch the demo page to inspect what was returned
    const pageResp = await page.request.get('/components/state/demo-state.html');
    console.log('PAGE FETCH STATUS', pageResp.status());
    const pageHead = await pageResp.text().then(s => s.slice(0, 400));
    console.log('PAGE HEAD:', pageHead.replace(/\n/g, ' '));
    // diagnostic: fetch the module to ensure server returns JS
    const resp = await page.request.get('/js/core/state-manager.js');
    console.log('MODULE FETCH STATUS', resp.status());
    const snippet = await resp.text().then(s => s.slice(0, 120));
    console.log('MODULE HEAD:', snippet.replace(/\n/g, ' '));
    const counter = page.locator('#counter');
    const inc = page.locator('#inc');
    const reset = page.locator('#reset');

    await expect(counter).toHaveText('0');
    await inc.click();
    await expect(counter).toHaveText('1');
    await inc.click();
    await inc.click();
    await expect(counter).toHaveText('3');
    await reset.click();
    await expect(counter).toHaveText('0');
  });
});
