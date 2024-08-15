const { test, expect } = require('@playwright/test');
const { timeout } = require('../playwright.config');
import { login } from '../pages/login';
import { firstName,middlename,lastName,mobileno } from '../pages/test';

test('Online Loan Request-Create', async ({ page }) => { 

    await page.goto('http://172.31.1.13:1902/',{timeout:600000});
    const Kyc_login = new login(page);
    await Kyc_login.eservice_login('0011233763', 'Pass@123');
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
    await page.getByLabel('Authorized person\'s name').fill(firstName+middlename+lastName);
    await page.getByLabel('Authorized person\'s number').fill(mobileno);
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

test('Online Loan Request-Portal Office approval',async({page})=>{

    await page.goto('http://172.31.1.13:1902/',{timeout:600000});
    const Kyc_login = new login(page);
    await Kyc_login.eservice_login('O058555', 'P@ss123');
    //online loan request
    await page.getByText('Approval Dashboard').click();
    await page.waitForTimeout(1000);
    await page.locator('div:nth-child(2) > .pq-grid-table > tbody > tr:nth-child(2) > td:nth-child(3) > .table-action-nav-btn').click();
    await page.getByRole('cell', { name: 'RFL' }).nth(1).dblclick();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: ' Approve' }).click();
});

test('Online Loan Request-Portal Office rejected',async({page})=>{

    await page.goto('http://172.31.1.13:1902/',{timeout:600000});
    const Kyc_login = new login(page);
    await Kyc_login.eservice_login('O058555', 'P@ss123');
    //online loan request
    await page.getByText('Approval Dashboard').click();
    await page.waitForTimeout(1000);
    await page.locator('div:nth-child(2) > .pq-grid-table > tbody > tr:nth-child(2) > td:nth-child(3) > .table-action-nav-btn').click();
    await page.getByRole('cell', { name: 'RFL' }).nth(1).dblclick();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: ' Reject' }).click();
});

test('Online Loan Request- Core approval',async({page})=>{

    await page.goto('http://172.31.1.13:1901/',{timeout:600000});
    const Kyc_login = new login(page);
    await Kyc_login.eservice_login('bhupendra', 'Pass@1234');
    //online loan request
    await page.getByText('Portal').click();
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('Search Input').pressSequentially('Online Loan Request');
    await page.getByRole('link', { name: 'Online loan Acknowledgement' }).click();
    await page.getByRole('cell', { name: 'RFL' }).nth(1).dblclick();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: ' Acknowledge' }).click();
});


test('Online Loan Request- Core reject',async({page})=>{

    await page.goto('http://172.31.1.13:1901/',{timeout:600000});
    const Kyc_login = new login(page);
    await Kyc_login.eservice_login('bhupendra', 'Pass@1234');
    //online loan request
    await page.getByText('Portal').click();
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('Search Input').pressSequentially('Online Loan Request');
    await page.getByRole('link', { name: 'Online loan Acknowledgement' }).click();
    await page.getByRole('cell', { name: 'RFL' }).nth(1).dblclick();
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: ' Reject' }).click();
});

