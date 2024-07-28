const { test, expect } = require('@playwright/test');

test.only('Pension Distribution', async ({ page }) => {
    await page.goto('http://172.31.1.13:1901/');
    //login
    await page.locator('#Username').fill('bhupendra');
    await page.locator('#Password').fill('Pass@1234');
    await page.getByRole('button', { name: 'Login' }).click();
    // module

    await page.getByRole('link', { name: 'Core  ' }).click();
    await page.getByRole('link', { name: '  PENSION' }).click();
    await page.getByRole('link', { name: '  Transactions' }).click();
    await page.getByText('Pension Distribution').click();
    await page.waitForTimeout(1500);

    //Transaction
    await page.locator('#IndexCreate').click();
    await page.locator('#CustomerNameSearch').click();
    await page.waitForTimeout(500);
    await page.getByRole('cell', { name: 'Ratna Sagar Kansakar' }).dblclick();
    await page.waitForTimeout(1000);
    await page.locator('#YearSearch').click();
    await page.waitForTimeout(500);
    await page.getByRole('cell', { name: '2081' }).dblclick();
    await page.locator('#MonthId').selectOption('3');

    //payment

    await page.locator('#PaymentMode').selectOption('2');
    await page.locator('#PayerBankAcAliasSearch').click();
    await page.waitForTimeout(500);
    await page.getByText('NIC ASIA BANK LIMITED').dblclick();

    //save

    await page.locator('#SaveForm').click();

});

test('Pension Distribution Acknowledgement', async ({ page }) => {
    //login    
    await page.goto('http://172.31.1.13:1901/');
    await page.locator('#Username').fill('support');
    await page.locator('#Password').fill('Pass@1234');
    await page.getByRole('button', { name: 'Login' }).click();

    //core module
    await page.getByRole('link', { name: 'Core  ' }).click();
    await page.getByText('Approval Dashboard').click();
    // await page.locator('#IndexCommon > div.pq-grid-bottom.ui-widget-header.ui-corner-bottom > div > button:nth-child(6)').click();
    // await page.mouse.down();
    // const elements = await page.$x(`//*[contains(text(), 'pension distribution')]`);
    // await page.elements.click();
    // await page.pause();
    // await page.getByRole('combobox').isVisible.selectOption('3');
    // const elements1 = await page.$x(`//*[contains(text(), 'pension distribution')]`);
    // await page.elements1.click();
    // const scroll= await page.locator('span:nth-child(4)').first();
    // await mouse.move(50, 100, scroll);
    await page.locator('#IndexCommon div').filter({ hasText: 'Description Action Description Action 1Collection Head Setup (1) 2Customer' }).getByRole('textbox').pressSequentially('Pension');
    const element = await page.locator('button')
    await element.click();


});