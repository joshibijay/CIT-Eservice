const{test,expect}=require('@playwright/test');
import { login } from '../pages/login';
import {firstName,middlename,lastName,email,mobileno,address, telno,accountno,panno,identityno} from '../pages/test';

test.beforeEach('Login credentials',async({page})=>{
  test.setTimeout(12000000);
  await page.goto('http://172.31.1.13:1902/', { timeout: 100000 });
  const eservice_login = new login(page);
  await eservice_login.eservice_login('O058555', 'P@ss123');
});

test.only('Customer Registration by office-Create', async ({ page }) => {
  test.setTimeout(12000000);
  await page.goto('http://172.31.1.13:1902/', { timeout: 100000 });
  const eservice_login = new login(page);
  await eservice_login.eservice_login('O058555', 'P@ss123')
  // customer registration 
  await page.getByRole('link', { name: 'Customer Registration', },).click();
  await page.waitForSelector('#IndexCreate');
  await page.getByRole('link', { name: 'Create' }).click();

  // General details
  await page.getByLabel('First Name *').fill(firstName);
  await page.getByLabel('Middle Name', { exact: true }).fill(middlename);
  await page.getByLabel('Last Name *').fill(lastName);

  // local lang
  await page.locator('#FirstNameLocLang').fill('पहिलो नाम');
  await page.locator('#MiddleNameLocLang').fill('बीचको नाम');
  await page.locator('#LastNameLocLang').fill('थर');

  await page.locator('#OccupationType').fill('engineer');
  await page.getByLabel('Gender *').selectOption('1');
  await page.getByLabel('Marital Status *').selectOption('2');
  await page.getByLabel('Occupation *').selectOption('1');
  await page.getByLabel('Date Of Birth *').click();
  await page.getByPlaceholder('YYYY/MM/DD').fill('2055/11/11');
  await page.getByLabel('Citizenship No *').fill(identityno);
  await page.getByRole('button', { name: '' }).nth(1).click();
  await page.waitForTimeout(1500);
  await page.getByRole('cell', { name: 'TAPLEJUNG' }).dblclick();
  await page.getByLabel('Citizenship Issued Date *').fill('2075/01/01');
  await page.getByLabel('Citizenship Issued Authority *').fill('DAO');
  await page.getByLabel('Pan No *').fill(panno);
  await page.getByLabel('Employment Status *').selectOption('1');
  await page.locator('#SpouseOccupationId').selectOption('1');
  await page.getByLabel('Income Source *').selectOption('1');
  await page.locator('#ReligionId').selectOption('1');
  await page.locator('.CasteSearch').click();
  await page.waitForTimeout(1000);
  await page.getByText('Terai Dalit').dblclick();
  await page.locator('#BirthAddress').fill('KAthmandu');
  await page.locator('#noRadio').click();

  // Identity details
  await page.getByRole('cell', { name: '' }).getByRole('button').click();
  await page.waitForTimeout(2000);
  await page.waitForSelector('tr.pq-grid-row:nth-child(3) > td:nth-child(1)');
  await page.getByRole('cell', { name: 'Lal Purja' }).dblclick();
  await page.getByPlaceholder('identity no').fill(identityno);
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
  //tole name
  await page.locator('#AddressVM_PermToleName').fill(address);
  //tole name local lang
  await page.locator('#AddressVM_PermToleNameLocLang').fill('गोकर्ण');
  // ward no
  await page.locator('#AddressVM_PermWardNo').fill('15');
  //houe no.
  await page.locator('#AddressVM_PermHouseNo').fill('415/558/11')
  // phone no.
  await page.pause();
  await page.locator('#AddressVM_PermTelNo').fill(mobileno);
  // mobile no.
  await page.locator('#AddressVM_PermMobileNo').fill(mobileno)
  // email address
  await page.locator('#AddressVM_PermEmailId').fill('bijaybikramjoshi@gmail.com');
  // same as permanent
  await page.getByText('Same as Permanent *').check();

  //Nominee Information
  await page.getByRole('tab', { name: 'Nominee Information' }).click();
  // nominee exists
  await page.getByText('NomineeExists *').click();
  await page.getByLabel('Nominee Name', { exact: true }).fill(firstName+' '+lastName);
  await page.getByLabel('Nominee Name (Local Language)').fill('गौरव भण्डारी');
  // gender select
  await page.locator('#NomineeVM_GenderId').selectOption('1');
  // relation
  await page.locator('#nomineeFieldSet div').filter({ hasText: 'Nominee Name * Nominee Name (' }).getByRole('button').click();
  await page.waitForTimeout(1500);
  await page.getByRole('cell', { name: 'Father', exact: true }).dblclick();
  //country
  await page.locator('#nomineeFieldSet').getByRole('button', { name: '' }).nth(1).click();
  await page.waitForTimeout(1500);
  await page.getByRole('cell', { name: 'NEPAL' }).dblclick();
  //embassy
  await page.getByRole('textbox', { name: 'Embassy' }).fill('Nepal');
  //local Body
  await page.locator('#nomineeFieldSet').getByRole('button', { name: '' }).nth(2).click();
  await page.waitForTimeout(1500);
  await page.getByRole('cell', { name: 'Phaktanlung Rural Municipality' }).dblclick();
  //ward no
  await page.getByRole('textbox', { name: 'Ward No' }).fill('123');
  //house no
  await page.getByRole('textbox', { name: 'House No' }).fill('6545/fgj');
  // tole name
  await page.getByRole('textbox', { name: 'Tole Name' }).fill(address);
  // citizenship no
  await page.getByRole('textbox', { name: 'Citizenship No', exact: true }).fill('45/45894/qq55');
  // citizenship issued district
  await page.locator('#nomineeFieldSet div').filter({ hasText: 'House No Tole Name *' }).getByRole('button').click();
  await page.waitForTimeout(1500);
  await page.getByRole('cell', { name: 'TAPLEJUNG' }).dblclick();
  // citizenship issued date
  await page.getByLabel('CitizenshipIssuedDate').fill('2024/05/04');
  // mobile no.
  await page.locator('#NomineeVM_MobileNo').fill(mobileno);
  // tel no
  await page.getByRole('textbox', { name: 'Telephone No' }).fill(telno);
  // email
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  // nominee document upload
  await page.setInputFiles('#NomineeFiles', 'Upload/CIT_recent_image.png');
  //attach documents
  await page.locator('#NomineeDocFile').getByRole('combobox').selectOption('1');
  await page.getByRole('textbox', { name: 'Doc. Title' }).fill('Citizenship docs');
  await page.setInputFiles('#NomineeFilesDoc', 'Upload/NEPALI_citizenship_image.jpg');

  //Guardian Information
  await page.getByRole('tab', { name: 'Guardian Information' }).click();
  await page.getByText('GuardianExists *').click();
  await page.getByLabel('Guardian Name', { exact: true }).fill(firstName+' ' +lastName);
  await page.getByLabel('Guardian Name (Local Language)').fill('गौरव भण्डारी')
  await page.locator('#GuardianVM_GenderId').selectOption('1');
  await page.locator('#guardianFieldSet div').filter({ hasText: 'Guardian Name * Guardian Name' }).getByRole('button').click();
  await page.waitForTimeout(1500);
  await page.getByRole('cell', { name: 'Father', exact: true }).dblclick();
  await page.locator('#guardianFieldSet').getByRole('button', { name: '' }).nth(1).click();
  await page.waitForTimeout(1500);
  await page.getByRole('cell', { name: 'NEPAL' }).dblclick();
  await page.locator('#guardianFieldSet').getByRole('button', { name: '' }).nth(2).click();
  await page.waitForTimeout(1500);
  await page.getByRole('cell', { name: 'Phaktanlung Rural Municipality' }).dblclick();
  await page.getByRole('textbox', { name: 'Ward No' }).fill('15');
  await page.getByRole('textbox', { name: 'House No' }).fill('1528/454');
  await page.getByRole('textbox', { name: 'Tole Name' }).fill(address);
  await page.getByRole('textbox', { name: 'Citizenship No', exact: true }).fill('485444/4454/');
  await page.locator('#guardianFieldSet div').filter({ hasText: 'House No Tole Name *' }).getByRole('button').click();
  await page.waitForTimeout(1500);
  await page.getByRole('cell', { name: 'TAPLEJUNG' }).dblclick();
  await page.getByLabel('Citizenship Issued Date', { exact: true }).fill('2075/05/06');
  await page.getByRole('textbox', { name: 'Mobile No' }).fill(mobileno);
  await page.getByRole('textbox', { name: 'Telephone No' }).fill(telno);
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.setInputFiles('#GuardianFiles','Upload/CIT_recent_image.png');
  await page.locator('#GuardianDocFile').getByRole('combobox').selectOption('1');
  await page.getByRole('textbox', { name: 'Doc. Title' }).fill('Citizenship docs');
  await page.setInputFiles('#GuardianFilesDoc', 'Upload/NEPALI_citizenship_image.jpg');


  // Family Information

  await page.getByRole('tab', { name: 'Family Information' }).click();
  await page.locator('#RelationId').click();

  //mother
  await page.getByLabel('Relation *').selectOption('1');
  await page.getByLabel('Name *', { exact: true }).fill(firstName+' ' +lastName);
  await page.getByRole('button', { name: ' Add Family Detail' }).click();

  //father
  await page.getByLabel('Relation *').selectOption('2');
  await page.getByLabel('Name *', { exact: true }).fill(firstName+' ' +lastName);
  await page.getByRole('button', { name: ' Add Family Detail' }).click();

  //grandfather
  await page.getByLabel('Relation *').selectOption('5');
  await page.getByLabel('Name *', { exact: true }).fill(firstName+' ' +lastName);
  await page.getByRole('button', { name: ' Add Family Detail' }).click();

  //grandmother
  await page.getByLabel('Relation *').selectOption('6');
  await page.getByLabel('Name *', { exact: true }).fill(firstName+' ' +lastName);
  await page.getByRole('button', { name: ' Add Family Detail' }).click();

  //Wife
  await page.getByLabel('Relation *').selectOption('8');
  await page.getByLabel('Name *', { exact: true }).fill(firstName+' ' +lastName);
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
  await page.getByPlaceholder('Enter your keyword').pressSequentially('nepal bank limited');
  await page.press('[placeholder="Enter your keyword"]', 'Enter');
  await page.waitForTimeout(1500);
  await page.getByText('Nepal Bank Limited').dblclick();
  //await page.locator('#.jconfirm-closeIcon').click();
  await page.locator('#BankVM_Branch').fill(address);
  await page.getByLabel('AcNo *').fill(accountno);

  // document information
  await page.getByRole('tab', { name: 'Document' }).click();
  //Citizenship card
  const Citizenship = '#OtherFileDoc';
  await page.setInputFiles(Citizenship, 'Upload/NEPALI_citizenship_image.jpg');

  // fingerprint
  const customer_fingerprint = '#FingerPrintFileDoc';
  await page.setInputFiles(customer_fingerprint, 'Upload/CIT_fingerprint_image.jpg');

  //Digital Signature
  const Signature = '#DigitalSignatureFileDoc';
  await page.setInputFiles(Signature, 'Upload/CIT_signature_image.png');

  //recent photo
  const photo = '#RecentPhotoFileDoc';
  await page.setInputFiles(photo, 'Upload/CIT_recent_image.png');

  //location
  await page.setInputFiles('#LocationFileDoc', 'Upload/CIT_location_image.jpg');

  //Scheme Opening
  await page.pause();
  await page.getByText('Scheme Opening').click();// click scheme opening
  await page.locator('#btnAcGroupSearch').click();
  await page.getByText('KBB').dblclick();
  await page.getByLabel('Contributory Option *').selectOption('1');

  await page.locator('#btnAddScheme').click();

  // Final save

  await page.locator('#btnSave').click();
  await page.pause();
  await page.getByText('Confirm').click();
  await page.pause();
});
// Perform actions on the page...

// No need to close the browser manually, @playwright/test handles it
//cloned by jasu mulmi

/// EDIT module
test('Customer registration by office-EDIT',async({page})=>{
    test.setTimeout(12000000);
    await page.goto('http://172.31.1.13:1902/', { timeout: 100000 });
    const eservice_login = new login(page);
    await eservice_login.eservice_login('O058555', 'P@ss123')
    // customer registration 
    await page.getByRole('link', { name: 'Customer Registration', },).click();
    await page.waitForSelector('#IndexCreate');
    await page.locator('.right-btn').click();
    await page.locator('.right-btn').click();
    await page.locator('.right-btn').click();
    await page.getByRole('link', { name: 'Edit' }).nth(1).click();
    await page.waitForTimeout(2000);
    //await page.getByRole('link', { name: 'Create' }).click();
  
    // General details
    await page.getByLabel('First Name *').fill(firstName);
    await page.getByLabel('Middle Name', { exact: true }).fill(middlename);
    await page.getByLabel('Last Name *').fill(lastName);
  
    // local lang
    await page.locator('#FirstNameLocLang',{exact:true}).fill('पहिलो न');
    await page.locator('#MiddleNameLocLang',{exact:true}).fill('बीचको न');
    await page.locator('#LastNameLocLang',{exact:true}).fill('थ');
  
    await page.locator('#OccupationType').fill('kaji');
    await page.getByLabel('Gender *').selectOption('2');
    await page.getByLabel('Marital Status *').selectOption('2');
    await page.getByLabel('Occupation *').selectOption('2');
    await page.getByLabel('Date Of Birth *').click();
    await page.getByPlaceholder('YYYY/MM/DD').fill('2050/11/11');
    await page.getByLabel('Citizenship No *').fill('12345/89');
    await page.getByRole('button', { name: '' }).nth(1).click();
    await page.waitForTimeout(1500);
    await page.getByRole('cell', { name: 'TAPLEJUNG' }).dblclick();
    await page.getByLabel('Citizenship Issued Date *').fill('2075/01/01');
    await page.locator('#CitizenshipIssuedAuthority').fill('award');
    await page.getByLabel('Pan No *').fill(panno);
    await page.getByLabel('Employment Status *').selectOption('2');
    await page.locator('#SpouseOccupationId').selectOption('2');
    await page.getByLabel('Income Source *').selectOption('2');
    await page.locator('#ReligionId').selectOption('2');
    await page.locator('.CasteSearch').click();
    await page.waitForTimeout(1000);
    await page.getByText('Kori').dblclick();
    await page.locator('#BirthAddress').fill(address);
    await page.locator('#noRadio').click();
  
    // Identity details
    await page.getByRole('cell', { name: '' }).getByRole('button').click();
    await page.waitForTimeout(2000);
    await page.waitForSelector('tr.pq-grid-row:nth-child(3) > td:nth-child(1)');
    await page.getByRole('cell', { name: 'PAN' }).dblclick();
    await page.getByPlaceholder('identity no').fill(identityno);
    await page.getByPlaceholder('issue authority').fill('ward');
    await page.locator('#IssueDate').fill('2080/01/01');
    await page.getByRole('button', { name: '' }).click();
  
    // Address Details
  
    await page.getByRole('tab', { name: 'Address' }).click();
    // permanent state
  
    await page.locator('#permanentAddress div').filter({ hasText: 'State *' }).getByRole('button').click();
    await page.waitForTimeout(1500);
    //await page.waitForSelector('tr.pq-grid-row:nth-child(2) > td:nth-child(2)');
    await page.getByRole('cell', { name: 'Bagmati' }).dblclick();
    //permanent address
    await page.locator('#permanentAddress div').filter({ hasText: 'District *' }).getByRole('button').click();
    await page.waitForTimeout(1500);
    //await page.waitForSelector('tr.pq-grid-row:nth-child(2) > td:nth-child(1)');
    await page.getByRole('cell', { name: 'KATHMANDU' }).dblclick();
    // local body
    await page.locator('#permanentAddress div').filter({ hasText: 'Local Body *' }).getByRole('button').click();
    //await page.waitForSelector('tr.pq-grid-row:nth-child(2) > td:nth-child(1)');
    await page.waitForTimeout(1500);
    await page.getByRole('cell', { name: 'Gokarneshwor Municipality' }).dblclick();
    //tole name
    await page.locator('#AddressVM_PermToleName').fill(address);
    //tole name local lang
    await page.locator('#AddressVM_PermToleNameLocLang').fill('गोकर्ण');
    // ward no
    await page.locator('#AddressVM_PermWardNo').fill('15');
    //houe no.
    await page.locator('#AddressVM_PermHouseNo').fill('415/558/11')
    // phone no.
    await page.locator('#AddressVM_PermTelNo').fill(telno);
    // mobile no.
    await page.locator('#AddressVM_PermMobileNo').fill('9840372836')
    // email address
    await page.locator('#AddressVM_PermEmailId').fill('bijaybikramjoshi@gmail.com');
    // same as permanent
    await page.getByText('Same as Permanent *').check();
  
    //Nominee Information
    await page.getByRole('tab', { name: 'Nominee Information' }).click();
  // nominee exists
  await page.getByText('NomineeExists *').click();
  await page.getByLabel('Nominee Name', { exact: true }).fill(firstName+' ' +lastName);
  await page.getByLabel('Nominee Name (Local Language)').fill('गौरव भण्डारी');
  // gender select
  await page.locator('#NomineeVM_GenderId').selectOption('1');
  // relation
  await page.locator('#nomineeFieldSet div').filter({ hasText: 'Nominee Name * Nominee Name (' }).getByRole('button').click();
  await page.waitForTimeout(1000);
  await page.getByRole('cell', { name: 'Father', exact: true }).dblclick();
  //country
  await page.locator('#nomineeFieldSet').getByRole('button', { name: '' }).nth(1).click();
  await page.waitForTimeout(1000);
  await page.getByRole('cell', { name: 'NEPAL' }).dblclick();
  //embassy
  await page.getByRole('textbox', { name: 'Embassy' }).fill('Nepal');
  //local Body
  await page.locator('#nomineeFieldSet').getByRole('button', { name: '' }).nth(2).click();
  await page.waitForTimeout(1000);
  await page.getByRole('cell', { name: 'Phaktanlung Rural Municipality' }).dblclick();
  //ward no
  await page.getByRole('textbox', { name: 'Ward No' }).fill('123');
  //house no
  await page.getByRole('textbox', { name: 'House No' }).fill('6545/fgj');
  // tole name
  await page.getByRole('textbox', { name: 'Tole Name' }).fill(address);
  // citizenship no
  await page.getByRole('textbox', { name: 'Citizenship No', exact: true }).fill(identityno);
  // citizenship issued district
  await page.locator('#nomineeFieldSet div').filter({ hasText: 'House No Tole Name *' }).getByRole('button').click();
  await page.waitForTimeout(1000);
  await page.getByRole('cell', { name: 'TAPLEJUNG' }).dblclick();
  // citizenship issued date
  await page.getByLabel('CitizenshipIssuedDate').fill('2024/05/04');
  // mobile no.
  await page.locator('#NomineeVM_MobileNo').fill(mobileno);
  // tel no
  await page.getByRole('textbox', { name: 'Telephone No' }).fill(telno);
  // email
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  // nominee document upload
  await page.setInputFiles('#NomineeFiles', 'Upload/CIT_recent_image.png');
  //attach documents
  await page.locator('#NomineeDocFile').getByRole('combobox').selectOption('1');
  await page.getByRole('textbox', { name: 'Doc. Title' }).fill('Citizenship docs');
  await page.setInputFiles('#NomineeFilesDoc', 'Upload/NEPALI_citizenship_image.jpg');
  
    //Guardian Information
    await page.getByRole('tab', { name: 'Guardian Information' }).click();
  await page.getByText('GuardianExists *').click();
  await page.getByLabel('Guardian Name', { exact: true }).fill(firstName+' ' +lastName);
  await page.getByLabel('Guardian Name (Local Language)').fill('गौरव भण्डारी')
  await page.locator('#GuardianVM_GenderId').selectOption('2');
  await page.locator('#guardianFieldSet div').filter({ hasText: 'Guardian Name * Guardian Name' }).getByRole('button').click();
  await page.waitForTimeout(2000);
  await page.getByRole('cell', { name: 'Father', exact: true }).dblclick();
  await page.getByRole('textbox', { name: 'Embassy' }).fill('nepal');
  await page.locator('#guardianFieldSet').getByRole('button', { name: '' }).nth(2).click();
  await page.waitForTimeout(2000);
  await page.getByRole('cell', { name: 'Phaktanlung Rural Municipality' }).dblclick();
  await page.getByRole('textbox', { name: 'Ward No' }).fill('15');
  await page.getByRole('textbox', { name: 'House No' }).fill('1528/454');
  await page.getByRole('textbox', { name: 'Tole Name' }).fill(address);
  await page.getByRole('textbox', { name: 'Citizenship No', exact: true }).fill(identityno);
  await page.locator('#guardianFieldSet div').filter({ hasText: 'House No Tole Name *' }).getByRole('button').click();
  await page.waitForTimeout(2000);
  await page.getByRole('cell', { name: 'TAPLEJUNG' }).dblclick();
  await page.getByLabel('Citizenship Issued Date', { exact: true }).fill('2075/05/06');
  await page.getByRole('textbox', { name: 'Mobile No' }).fill(mobileno);
  await page.getByRole('textbox', { name: 'Telephone No' }).fill(telno);
  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.setInputFiles('#GuardianFiles','Upload/CIT_recent_image.png');
  await page.locator('#GuardianDocFile').getByRole('combobox').selectOption('1');
  await page.getByRole('textbox', { name: 'Doc. Title' }).fill('Citizenship docs');
  await page.setInputFiles('#GuardianFilesDoc', 'Upload/NEPALI_citizenship_image.jpg');
  
    // Family Information
  
    await page.getByRole('tab', { name: 'Family Information' }).click();
    await page.locator('#RelationId').click();
  
    //mother
    await page.getByLabel('Relation *').selectOption('1');
    await page.getByLabel('Name *', { exact: true }).fill(firstName+' ' +lastName);
    await page.getByRole('button', { name: ' Add Family Detail' }).click();
  
    //father
    await page.getByLabel('Relation *').selectOption('2');
    await page.getByLabel('Name *', { exact: true }).fill(firstName+' ' +lastName);
    await page.getByRole('button', { name: ' Add Family Detail' }).click();
  
    //grandfather
    await page.getByLabel('Relation *').selectOption('5');
    await page.getByLabel('Name *', { exact: true }).fill(firstName+' ' +lastName);
    await page.getByRole('button', { name: ' Add Family Detail' }).click();
  
    //grandmother
    await page.getByLabel('Relation *').selectOption('6');
    await page.getByLabel('Name *', { exact: true }).fill(firstName+' ' +lastName);
    await page.getByRole('button', { name: ' Add Family Detail' }).click();
  
    //Wife
    await page.getByLabel('Relation *').selectOption('8');
    await page.getByLabel('Name *', { exact: true }).fill(firstName+' ' +lastName);
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
    await page.getByPlaceholder('Enter your keyword').pressSequentially('nepal bank limited');
    await page.press('[placeholder="Enter your keyword"]', 'Enter');
    await page.waitForTimeout(1000);
    await page.getByText('Nepal Bank Limited').dblclick();
    //await page.locator('#.jconfirm-closeIcon').click();
    await page.locator('#BankVM_Branch').fill(address);
    await page.getByLabel('AcNo *').fill(accountno);
  
    // document information
    await page.getByRole('tab', { name: 'Document' }).click();
    //Citizenship card
    const Citizenship = '#OtherFileDoc';
    await page.setInputFiles(Citizenship, 'Upload/NEPALI_citizenship_image.jpg');
  
    // fingerprint
    const customer_fingerprint = '#FingerPrintFileDoc';
    await page.setInputFiles(customer_fingerprint, 'Upload/CIT_fingerprint_image.jpg');
  
    //Digital Signature
    const Signature = '#DigitalSignatureFileDoc';
    await page.setInputFiles(Signature, 'Upload/CIT_signature_image.png');
  
    //recent photo
    const photo = '#RecentPhotoFileDoc';
    await page.setInputFiles(photo, 'Upload/CIT_recent_image.png');
  
    //location
    await page.setInputFiles('#LocationFileDoc', 'Upload/CIT_location_image.jpg');
  
    //Scheme Opening
    await page.pause();
    await page.getByText('Scheme Opening').click();// click scheme opening
    await page.locator('#btnAcGroupSearch').click();
    await page.getByText('KBB').dblclick();
    await page.getByLabel('Contributory Option *').selectOption('1');
  
    await page.locator('#btnAddScheme').click();
  
    // Final save
  
    await page.locator('#btnSave').click();
    await page.pause();
    await page.getByText('Confirm').click();
    await page.pause();
  });

 // Rejected
  test('Customer Registration by office-Reject',async({page})=>{
    await page.getByText('Approval Dashboard').click();
    await page.waitForTimeout(1500);
    await page.getByRole('link', { name: '' }).nth(3).click();
    await page.locator('.right-btn').click();
    await page.locator('.right-btn').click();
    await page.locator('.right-btn').click();
    await page.getByRole('cell', { name: 'Newly Created' }).nth(1).dblclick();
    await page.pause();
    await page.waitForTimeout(2000);
    await page.getByText('Reject').click();
    await page.locator('#rejectCause').fill('Rejected test data');
    await page.getByText('Confirm',{exact:true}).click();
    await page.waitForTimeout(2000);
  });
// Approval 
  test('Customer Registration by office-approve',async({page})=>{
    await page.getByText('Approval Dashboard').click();
    await page.waitForTimeout(1500);
    await page.getByRole('link', { name: '' }).nth(3).click();
    await page.locator('.right-btn').click();
    await page.locator('.right-btn').click();
    await page.locator('.right-btn').click();
    await page.getByRole('cell', { name: 'Newly Created' }).nth(1).dblclick();
    await page.getByRole('button',{name:'Approve'}).click();
  });