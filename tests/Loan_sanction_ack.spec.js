const { test, expect } = require('@playwright/test');
const { timeout } = require('../playwright.config');
import { login } from '../pages/login';
import { acknowledgement } from '../pages/coreacknowledgement';


test('Loan Disbursement acknowledgement', async ({ page }) => {
  const loan_sanction_acknowledgemnet=new acknowledgement(page);
  await loan_sanction_acknowledgemnet.core_acknowledgment('bhupendra','Pass@1234','Loan Account Limit Sanction');
    await page.getByRole('cell', { name: 'RADHA GIRI' }).nth(1).dblclick();
    await page.getByRole('button', { name: ' Approve' }).click();
    await page.waitForTimeout(5000);
    await page.getByRole('button', { name: 'Yes' }).click();
});

