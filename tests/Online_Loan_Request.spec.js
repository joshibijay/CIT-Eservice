const { test, expect } = require('@playwright/test');
const { timeout } = require('../playwright.config');

test('Online Loan Request', async ({ page }) => { 

await page.goto('http://172.31.1.13:1902/',{timeout:600000});
    // login
    await page.locator('#Username').fill('0011233763');
    await page.locator('#Password').fill('Pass@123');
    await page.getByRole('button', { name: 'Login' }).click();

    //online loan request
    await page.waitForTimeout(1000);
    await page.getByText('Online Loan Request').click();
    await page.locator('#IndexCreate').click();
    //await page.getByRole('button',{name:'AcGroupSearch'}).click();
    //Loan Eligibility
    await page.getByRole('button', { name: '' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'RFL' }).dblclick();
    await page.locator('#NewLoanLimit').fill('2000');
    await page.locator('#LoanPurpose').fill('Loan Purpose testing');
    await page.locator('button.nextBtn:nth-child(1)').click();
    //Personal Details
    await page.getByLabel('Authorized person\'s name').fill('juice123');
    await page.getByLabel('Authorized person\'s number').fill('9812345678');
    await page.locator('button.btn:nth-child(6)').click();
    //Document Upload
    await page.pause();
    await page.waitForTimeout(1500);
    await page.setInputFiles('#LoanFormFilesDoc','Upload/KBB 80 percent (1).pdf');
    await page.setInputFiles('#CitCardFilesDoc','Upload/cit_card_kbb.png');
    await page.setInputFiles('#EmpRecLettFilesDoc','Upload/cit_employee_letter.png');
    await page.setInputFiles('#CitCardFilesDocBack','Upload/cit_card_back.png');
    await page.getByRole('combobox').selectOption('1');
    await page.getByPlaceholder('Doc. Title').fill('citizenship data');
    await page.setInputFiles('#DocTypeFilesDoc','Upload/NEPALI_citizenship_image.jpg');
    await page.locator('button.btn:nth-child(4)').click();
    //Terms and Condition
    await page.locator('#termsCheck').click();
    //Final Save
    await page.locator('#btn-submit').click();
    
    page.close();

});