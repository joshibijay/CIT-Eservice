const { test, expect } = require('@playwright/test');
const { timeout } = require('../playwright.config');

test('Customer Registration by office', async ({ page }) => {
 await page.goto('http://172.31.1.13:1902/',{timeout:10000});
  // login dashboard
  //import { test, expect } from '@playwright/test';

    await page.locator('#Username').fill('O058555');
    await page.locator('#Password').fill('P@ss123');
    await page.getByRole('button', { name: 'Login' }).click();

    // customer registration 
await page.getByRole('link', { name: 'Customer Registration', },).click();
await page.waitForSelector('#IndexCreate');
   await page.getByRole('link', { name: 'Create' }).click();

    // General details
      await page.getByLabel('First Name *').fill('cit');
      await page.getByLabel('Middle Name', { exact: true }).press('Tab');
      await page.getByLabel('Last Name *').fill('client');
      await page.getByLabel('Occupation Type *').fill('engineer');
      await page.getByLabel('Gender *').selectOption('1');
      await page.getByLabel('Marital Status *').selectOption('1');
      await page.getByLabel('Occupation *').selectOption('1');
      await page.getByLabel('Date Of Birth *').click();
      await page.getByPlaceholder('YYYY/MM/DD').fill('2055/11/11');
      await page.getByLabel('Citizenship No *').fill('123456789');
      await page.getByRole('button', { name: '' }).nth(1).click();
await page.waitForTimeout(1500);
await page.waitForSelector('tr.pq-grid-row:nth-child(2) > td:nth-child(2)');
      await page.getByRole('cell', { name: 'TAPLEJUNG' }).dblclick();
      await page.getByLabel('Citizenship Issued Date *').fill('2075/01/01');
      await page.getByLabel('Citizenship Issued Authority *').fill('DAO');
      await page.getByLabel('Pan No *').fill('123456789');
      await page.getByLabel('Employment Status *').selectOption('1');
      await page.getByLabel('Income Source *').selectOption('1');
      
 // Identity details
await page.getByRole('cell', { name: '' }).getByRole('button').click();
await page.waitForTimeout(1500);
await page.waitForSelector('tr.pq-grid-row:nth-child(3) > td:nth-child(1)');
      await page.getByRole('cell', { name: 'Lal Purja' }).dblclick();
      await page.getByPlaceholder('identity no').fill('1232456');
      await page.getByPlaceholder('issue authority').fill('ward');
      await page.locator('#IssueDate').fill('2080/01/01');
      await page.getByRole('button', { name: '' }).click();

  // Address Details

await page.getByRole('tab', { name: 'Address' }).click();
    // permanent state

await page.locator('#permanentAddress div').filter({ hasText: 'State *' }).getByRole('button').click();
await page.waitForTimeout(1500);
//await page.waitForSelector('tr.pq-grid-row:nth-child(2) > td:nth-child(2)');
      await page.getByRole('cell', { name: 'State 1' }).dblclick();
          //permanent address
await page.locator('#permanentAddress div').filter({ hasText: 'District *' }).getByRole('button').click();
await page.waitForTimeout(1500);
//await page.waitForSelector('tr.pq-grid-row:nth-child(2) > td:nth-child(1)');
      await page.getByRole('cell', { name: 'TAPLEJUNG' }).dblclick();
          // local body
await page.locator('#permanentAddress div').filter({ hasText: 'Local Body *' }).getByRole('button').click();
//await page.waitForSelector('tr.pq-grid-row:nth-child(2) > td:nth-child(1)');
await page.waitForTimeout(1500);
      await page.getByRole('cell', { name: 'Phaktanlung Rural Municipality' }).dblclick();
          // ward no
      await page.locator('#AddressVM_PermWardNo').fill('15');
          // phone no.
      await page.locator('#AddressVM_PermTelNo').fill('0151230');
          // mobile no.
      await page.locator('#AddressVM_PermMobileNo').fill('9840372836');
          // email address
      await page.locator('#AddressVM_PermEmailId').fill('buzzz9397@gmail.com');
          // same as permanent
      await page.getByText('Same as Permanent *').check();


// Family Information

await page.getByRole('tab', { name: 'Family Information' }).click();
await page.locator('#RelationId').click();

    //mother
  await page.getByLabel('Relation *').selectOption('1');
      await page.getByLabel('Name *', { exact: true }).fill('Mothername') ;
      await page.getByRole('button', { name: ' Add Family Detail' }).click();

    //father
  await page.getByLabel('Relation *').selectOption('2');
      await page.getByLabel('Name *', { exact: true }).fill('fathername') ;
      await page.getByRole('button', { name: ' Add Family Detail' }).click();

    //grandfather
  await page.getByLabel('Relation *').selectOption('5');
      await page.getByLabel('Name *', { exact: true }).fill('grandfather') ;
      await page.getByRole('button', { name: ' Add Family Detail' }).click();

    //grandmother
  await page.getByLabel('Relation *').selectOption('6');
      await page.getByLabel('Name *', { exact: true }).fill('grandmother') ;
      await page.getByRole('button', { name: ' Add Family Detail' }).click();

// await page.getByLabel('Relation *').selectOption(1);
// await page.getByLabel('Name *', { exact: true }).fill('Mothername') 
// await page.getByRole('button', { name: ' Add Family Detail' }).click();
// await page.getByLabel('Relation *').selectOption(2);
// await page.getByLabel('Name *', { exact: true }).fill('fathername');
// await page.getByRole('button', { name: ' Add Family Detail' }).click();
// await page.getByLabel('Relation *').selectOption(5);
// await page.getByLabel('Name *', { exact: true }).fill('grandfathername');
// await page.getByRole('button', { name: ' Add Family Detail' }).click();
// await page.getByLabel('Relation *').selectOption(6);
// await page.getByLabel('Name *', { exact: true }).fill('grandmothername');
// await page.getByRole('button', { name: ' Add Family Detail' }).click();

// Bank Information
await page.getByRole('tab', { name: 'Bank Information' }).click();
      await page.locator('#bank').getByRole('button', { name: '' }).click();
      await page.getByPlaceholder('Enter your keyword').fill('Nepal Investment Bank Ltd.');
      await page.press('[placeholder="Enter your keyword"]', 'Enter');
      await page.getByText('Nepal Investment Bank Ltd.').dblclick();
      //await page.locator('#.jconfirm-closeIcon').click();
      await page.getByLabel('AcNo *').fill('015815212541');

// document information
await page.getByRole('tab', { name: 'Document' }).click();
      //Citizenship card
      const Citizenship = '#OtherFileDoc';
      await page.setInputFiles(Citizenship, 'Upload/NEPALI_citizenship_image.jpg');

      // fingerprint
      const customer_fingerprint = '#FingerPrintFileDoc';
      await page.setInputFiles(customer_fingerprint,'Upload/CIT_fingerprint_image.jpg');

      //Digital Signature
      const Signature='#DigitalSignatureFileDoc';
      await page.setInputFiles(Signature,'Upload/CIT_signature_image.png');

      //recent photo
      const photo='#RecentPhotoFileDoc';
      await page.setInputFiles(photo,'Upload/CIT_recent_image.png');

      //location
      await page.setInputFiles('#LocationFileDoc','Upload/CIT_location_image.jpg');

//Scheme Opening
await page.getByText('Scheme Opening').click();
      await page.locator('#btnAcGroupSearch').click();
      await page.getByText('KBB').dblclick();
      await page.getByLabel('Contributory Option *').selectOption('1');
      await page.locator('#btnAddScheme').click();

// Final save
await page.locator('#btnSave').click();

  });
  // Perform actions on the page...

  // No need to close the browser manually, @playwright/test handles it
  //cloned by jasu mulmi