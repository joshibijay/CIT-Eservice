const { test, expect } = require('@playwright/test');

test('selector and locator', async ({ page }) => {

await page.goto('https://www.saucedemo.com/v1/');

});