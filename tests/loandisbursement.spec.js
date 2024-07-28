const { test, expect } = require('@playwright/test');
const { timeout } = require('../playwright.config');
import { login } from '../pages/login';


test('Loan Disbursement Create', async ({ page }) => {
    await page.goto('http://172.31.1.13:1901/', { timeout: 10000 });
    
    const core_login = new login(page);
    await core_login.eservicelogin('support', 'Pass@1234');

    await page.getByRole('link', { name: 'Core  ' }).click();
    await page.locator('#wrapper > div > form > div > div > input').pressSequentially('Loan Disbursement');
    await page.getByRole('link', { name: 'Loan Disbursement', exact: true }).click();
    await page.waitForTimeout(1000);
    await page.locator('#IndexCreate').click();
    await page.getByPlaceholder('Code', { exact: true }).fill('RFL');
    await page.getByPlaceholder('Code', { exact: true }).press('Enter');
    await page.getByLabel('Account Number').fill('001RFL0156089');
    await page.getByLabel('Account Number').press('Enter');
    await page.getByLabel('New Disburse Amount *').fill('1000');
    await page.getByLabel('Payment Mode *').selectOption('2');
    await page.locator('#BankAcNoSearch').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: '02700048830012' }).dblclick();
    await page.getByRole('tab', { name: 'Schedule' }).click();
    await page.getByRole('button', { name: 'Generate Loan Schedule' }).click();
    await page.waitForTimeout(1500);
    await page.getByRole('button', { name: ' Save' }).click();
});

