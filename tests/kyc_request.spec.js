const { test, expect } = require('@playwright/test');
const { timeout } = require('../playwright.config');

test('KYC REQUEST', async ({ page }) => {
 await page.goto('http://172.31.1.13:1902/',{timeout:10000});
  
 await page.locator('#Username').fill('O058555');
 await page.locator('#Password').fill('P@ss123');
 await page.getByRole('button', { name: 'Login' }).click();

});