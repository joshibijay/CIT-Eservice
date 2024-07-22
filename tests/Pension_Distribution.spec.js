const { test, expect } = require('@playwright/test');

test('Pension Distribution', async ({ page }) => { 
await page.goto('http://192.168.40.9:1801/');
//login
await page.locator('#Username').fill('bhupendra');
await page.locator('#Password').fill('Pass@1234');
await page.getByRole('button', { name: 'Login' }).click();
// module

await page.getByRole('link', { name: 'Core  ' }).click();
await page.getByRole('link', { name: '  PENSION' }).click();
await page.getByRole('link', { name: '  Transactions' }).click();
await page.getByText('Pension Distribution').click();
await page.waitForTimeout(1000);

//Transaction
await page.locator('#IndexCreate').click();
await page.locator('#CustomerNameSearch').click();
await page.waitForTimeout(1000);
await page.getByRole('cell', { name: 'USHA BASTOLA' }).dblclick();
await page.waitForTimeout(1000);
await page.locator('#YearSearch').click();
await page.waitForTimeout(500);
await page.getByRole('cell', { name: '2080' }).dblclick();
await page.locator('#MonthId').selectOption('1');

//payment
await page.locator('#PaymentMode').selectOption('2');
await page.locator('#PayerBankAcAliasSearch').click();
await page.waitForTimeout(1000);
await page.getByText('NIC ASIA BANK LIMITED').dblclick();

//save

await page.locator('#SaveForm').click();


});