const { test, expect } = require('@playwright/test');
const { timeout } = require('../playwright.config');
const { login } = require('../pages/login');

test('LOAN SANCTION', async ({ page }) => {
  await page.goto('http://172.31.1.13:1901/', { timeout: 10000 });

  const core_login = new login(page);
  await core_login.eservicelogin('bhupendra', 'Pass@1234');

  await page.getByRole('link', { name: 'Core  ' }).click();
  await page.locator('#wrapper > div > form > div > div > input').pressSequentially('Loan Account Limit Sanction');
  await page.getByRole('link', { name: 'Loan Account Limit Sanction', exact: true }).click();

  // Wait for the 'IndexCreate' button to be visible and then click
  await page.waitForTimeout(2000);
  await page.locator('#IndexCreate').click();

  await page.getByPlaceholder('Code', { exact: true }).fill('RFL');
  await page.getByPlaceholder('Code', { exact: true }).press('Enter');

  await page.locator('#AcNo').fill('001RFL0156086');
  await page.locator('#AcNo').press('Enter');

  const eligibleLoanLimitLocator = await page.locator('#EligibleLoanLimit');
  const eligibleLoanLimitValue = await eligibleLoanLimitLocator.inputValue();

  const isEligibleAmountValid = /\b(1[0-9][0-9]|[2-9][0-9]{2,})\b/.test(eligibleLoanLimitValue);

  if (isEligibleAmountValid>100) {
    await page.locator('#NewLimit').fill('100');
  }
  else{
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: 'Ok' }).click();
    
  }
  // Ensure 'SaveForm' button is visible and click
  await page.locator('#SaveForm').click();
//getByRole('link', { name: 'CIT' })
});
