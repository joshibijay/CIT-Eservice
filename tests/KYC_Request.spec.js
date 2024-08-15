const{test,expect}=require('@playwright/test');
import { login } from '../pages/login';
import {firstName,middlename,lastName,email,mobileno,address, telno,accountno,panno,identityno} from '../pages/test';


test.beforeEach('Login Credentials',async({page})=>{
    await page.goto('http://172.31.1.13:1902/', { timeout: 100000 });
    const Kyc_login = new login(page);
    await Kyc_login.eservice_login('0011233797', '270ODA5ODQ3NDczMQ==!1xD');
    await page.getByText('KYC Request').click();
   
})


test('KYC REQUEST -Create', async ({ page }) => {

    //english lang
    await page.pause();
    await page.locator('#FirstName').fill(firstName);
    await page.locator('#MiddleName').fill(middlename);
    await page.locator('#LastName').fill(lastName);

    // local lang
    await page.locator('#FirstNameLocLang').fill('पहिलो नाम');
    await page.locator('#MiddleNameLocLang').fill('बीचको नाम');
    await page.locator('#LastNameLocLang').fill('थर');

    //general info
    await page.locator('#GenderId').selectOption('1');
    await page.locator('#ReligionId').selectOption('1');
    await page.locator('#MaritalStatusId').selectOption('1');
    await page.locator('.CasteSearch').click();
    await page.waitForTimeout(1000);
    await page.getByText('Terai Dalit').dblclick();
    await page.locator('#PanNo').fill('128587676');
    await page.locator('#BirthDate').fill('2050/01/01');
    await page.locator('#BirthAddress').fill(address);
    await page.locator('#BirthAddressLocLang').fill('गोकर्ण');
    await page.locator('#BirthWardNo').fill('05');
    await page.locator('#CitizenShipNo').fill(identityno);
    await page.locator('#CitizenShipIssueDate').fill('2070/05/09');
    await page.locator('#CitizenshipIssuingAuthority').fill('DAO');
    await page.getByRole('button', { name: '' }).nth(2).click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'TAPLEJUNG' }).dblclick();
    await page.getByLabel('Mobile No.', { exact: true }).fill(mobileno);
    await page.getByRole('textbox', { name: 'Telephone No' }).fill(telno);
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('button', { name: '' }).nth(3).click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'ENGINEER' }).dblclick();
    await page.getByLabel('Occupation Type *').fill('DOT NET ENginner');
    await page.getByLabel('Employment Status *').selectOption('1');
    await page.getByLabel('Income Source *').selectOption('1');
    await page.locator('#noRadio').click();

    //Indentity Information
    await page.locator('.IdentitySearch').click();
    await page.waitForTimeout(1500);
    await page.getByText('Lal Purja').dblclick();
    await page.locator('#IdentityNo').fill(identityno);
    await page.locator('#IssueAuthority').fill('Malpot');
    await page.locator('#IssueDate').fill('2075/05/05');
    await page.locator('#btnAddData').click();

    //Family Information
    await page.getByText('Family').click();
    //mother
    await page.getByRole('cell', { name: '' }).getByRole('button').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'Mother', exact: true }).dblclick();
    await page.getByPlaceholder('full name').fill(firstName+' '+lastName);
    await page.getByRole('button', { name: '' }).click();

    //father
    await page.getByRole('cell', { name: '' }).getByRole('button').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'Father', exact: true }).dblclick();
    await page.getByPlaceholder('full name').fill(firstName+' '+lastName);
    await page.getByRole('button', { name: '' }).click();

    //grandfather
    await page.getByRole('cell', { name: '' }).getByRole('button').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'Grand Father', exact: true }).dblclick();
    await page.getByPlaceholder('full name').fill(firstName+' '+lastName);
    await page.getByRole('button', { name: '' }).click();

    //grandmother
    await page.getByRole('cell', { name: '' }).getByRole('button').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'Grand Mother', exact: true }).dblclick();
    await page.getByPlaceholder('full name').fill(firstName+' '+lastName);
    await page.getByRole('button', { name: '' }).click();

    // Address Details
    await page.locator('#profile-tab').click();
    await page.locator('#permanentAddress div').filter({ hasText: 'Province *' }).getByRole('button').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'State 1' }).dblclick();
    await page.locator('#permanentAddress div').filter({ hasText: 'District *' }).getByRole('button').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'TAPLEJUNG' }).dblclick();
    await page.locator('#permanentAddress div').filter({ hasText: 'Local Body *' }).getByRole('button').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'Phaktanlung Rural Municipality' }).dblclick();
    await page.getByRole('textbox', { name: 'Tole Name *' }).fill(address);
    await page.locator('#PortalCustomerKYCRequestAddressViewModel_PermToleNameLocLang').fill('गोकर्ण');
    await page.getByRole('textbox', { name: 'Ward No *' }).fill('15');
    await page.getByLabel('House No.', { exact: true }).fill('15113/5444');
    await page.locator('#PortalCustomerKYCRequestAddressViewModel_PermPhoneNo').fill(telno);
    await page.locator('#PortalCustomerKYCRequestAddressViewModel_PermMobileNo').fill(mobileno);
    await page.locator('#PortalCustomerKYCRequestAddressViewModel_PermEmail').fill(email);
    await page.getByText('Same as Permanent').click();

    //Nominee Information
    await page.getByRole('tab', { name: 'Nominee Information' }).click();
    await page.getByText('No Nominee').click();
    await page.getByLabel('Nominee Name *').fill(firstName+' '+lastName);
    await page.getByLabel('Nominee Name (Local Language').fill('गौरव भण्डारी');
    await page.locator('#PortalCustomerKYCRequestNomineesViewModel_GenderId').selectOption('1');
    await page.locator('#nomineeFieldSet div').filter({ hasText: 'Nominee Name * Nominee Name (' }).getByRole('button').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'Father', exact: true }).dblclick();
    await page.locator('#nomineeFieldSet').getByRole('button', { name: '' }).nth(2).click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'Phaktanlung Rural Municipality' }).dblclick();
    await page.getByRole('textbox', { name: 'Ward No *' }).fill('15');
    await page.getByRole('textbox', { name: 'House No. *' }).fill('587/4584496');
    await page.getByRole('textbox', { name: 'Tole Name *' }).fill(address);
    await page.locator('#PortalCustomerKYCRequestNomineesViewModel_CitizenShipNo').fill(identityno);
    await page.locator('#nomineeFieldSet div').filter({ hasText: 'Tole Name * Citizenship No.' }).getByRole('button').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'TAPLEJUNG' }).dblclick();
    await page.locator('#PortalCustomerKYCRequestNomineesViewModel_CitizenShipIssueDate').fill('2080/05/10');
    await page.getByRole('textbox', { name: 'Mobile No. *' }).fill(mobileno);
    await page.locator('#PortalCustomerKYCRequestNomineesViewModel_TelNo').fill(telno);
    await page.locator('#PortalCustomerKYCRequestNomineesViewModel_EmailId').fill(email);
    await page.locator('#NomineeDocFile').getByRole('combobox').selectOption('1');
    await page.getByRole('textbox', { name: 'Doc. Title' }).fill('Citizenship');
    await page.setInputFiles('#NomineeFilesDoc', 'Upload/NEPALI_citizenship_image.jpg');

    //Guardian Information
    await page.getByRole('tab', { name: 'Guardian Information' }).click();
    await page.getByText('No Guardian').click();
    await page.locator('#PortalCustomerKYCRequestGuardiansViewModel_GuardianName').fill(firstName+' '+middlename+' '+lastName);
    await page.locator('#PortalCustomerKYCRequestGuardiansViewModel_GuardianNameLocLang').fill('मुना कुमार कुशुवाह');
    await page.locator('#PortalCustomerKYCRequestGuardiansViewModel_GenderId').selectOption('1');
    await page.locator('#guardianFieldSet div').filter({ hasText: 'Guardian Name * Guardian Name' }).getByRole('button').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'Mother', exact: true }).dblclick();
    await page.locator('#PortalCustomerKYCRequestGuardiansViewModel_EmbassyId').fill('Nepali Embassy');
    await page.locator('#guardianFieldSet').getByRole('button', { name: '' }).nth(2).click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'Phaktanlung Rural Municipality' }).dblclick();
    await page.getByRole('textbox', { name: 'Ward No *' }).fill('15');
    await page.getByRole('textbox', { name: 'House No. *' }).fill('1025/5445');
    await page.getByRole('textbox', { name: 'Tole Name *' }).fill(address);
    await page.locator('#PortalCustomerKYCRequestGuardiansViewModel_CitizenShipNo').fill(identityno);
    await page.locator('#PortalCustomerKYCRequestGuardiansViewModel_CitizenShipIssueDate').fill('2070/05/03');
    await page.locator('#guardianFieldSet div').filter({ hasText: 'Tole Name * Citizenship No.' }).getByRole('button').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'TAPLEJUNG' }).dblclick();
    await page.getByRole('textbox', { name: 'Mobile No. *' }).fill(mobileno);
    await page.locator('#PortalCustomerKYCRequestGuardiansViewModel_TelNo').fill(telno);
    await page.locator('#PortalCustomerKYCRequestGuardiansViewModel_EmailId').fill(email);
    await page.setInputFiles('#GuardianFiles', 'Upload/CIT_recent_image.png');
    await page.locator('#GuardianDocFile').getByRole('combobox').selectOption('1');
    await page.getByRole('textbox', { name: 'Doc. Title' }).fill('Citizenship');
    await page.setInputFiles('#GuardianFilesDoc', 'Upload/NEPALI_citizenship_image.jpg');

    // Document
    //await page.getByText('Document').click();
    await page.getByRole('tab', { name: 'Document' }).click();
    await page.locator('#DocFile').getByRole('combobox').selectOption('1');
    await page.getByRole('textbox', { name: 'Doc. Title' }).fill('Citizenship');
    await page.setInputFiles('#FilesDoc', 'Upload/NEPALI_citizenship_image.jpg');

    //Bank
    await page.getByRole('tab', { name: 'Bank' }).click();
    await page.locator('#bankDetails').getByRole('button', { name: '' }).click();
    await page.waitForTimeout(1000);
    await page.getByText('Jagadamba Credit & Investment Pvt. Ltd.').dblclick();
    await page.locator('#BankBranchName').fill(address);
    await page.locator('#BankAccountNo').fill(accountno);

    //Office
    await page.getByRole('tab', { name: 'Office' }).click();;
    await page.locator('#officeDetails').getByRole('button', { name: '' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'DIGO SOLUTION PVT.LTD,LALITPUR,01' }).dblclick();
    await page.getByLabel('Address *').fill(address);
    await page.getByLabel('Phone No *').fill('01478514');
    await page.getByLabel('Designation *').fill('Engineer');
    await page.getByLabel('Yearly Income *').fill('145000');

    //final save

    await page.getByRole('button', { name: ' Save' }).click();
await page.pause();
    //Confirm save
    await page.getByRole('button', { name: 'Confirm' }).click();
});

// KYC edit form
test('KYC Request-Edit',async({page})=>{
    //english lang
    await page.locator('#FirstName').fill(firstName);
    await page.locator('#MiddleName').fill(middlename);
    await page.locator('#LastName').fill(lastName);

    // local lang
    await page.locator('#FirstNameLocLang').fill('पहिलो नाम');
    await page.locator('#MiddleNameLocLang').fill('बीचको नाम');
    await page.locator('#LastNameLocLang').fill('थर');

    //general info
    await page.locator('#GenderId').selectOption('1');
    await page.locator('#ReligionId').selectOption('1');
    await page.locator('#MaritalStatusId').selectOption('1');
    await page.locator('.CasteSearch').click();
    await page.waitForTimeout(1000);
    await page.getByText('Terai Dalit').dblclick();
    await page.locator('#PanNo').fill(panno);
    await page.locator('#BirthDate').fill('2050/01/01');
    await page.locator('#BirthAddress').fill(address);
    await page.locator('#BirthAddressLocLang').fill('गोकर्ण');
    await page.locator('#BirthWardNo').fill('05');
    await page.locator('#CitizenShipNo').fill(identityno);
    await page.locator('#CitizenShipIssueDate').fill('2070/05/09');
    await page.locator('#CitizenshipIssuingAuthority').fill('DAO');
    await page.getByRole('button', { name: '' }).nth(2).click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'TAPLEJUNG' }).dblclick();
    await page.getByLabel('Mobile No.', { exact: true }).fill(mobileno);
    await page.getByRole('textbox', { name: 'Telephone No' }).fill(telno);
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('button', { name: '' }).nth(3).click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'ENGINEER' }).dblclick();
    await page.getByLabel('Occupation Type *').fill('DOT NET ENginner');
    await page.getByLabel('Employment Status *').selectOption('1');
    await page.getByLabel('Income Source *').selectOption('1');
    await page.locator('#noRadio').click();

    //Indentity Information
    await page.locator('.IdentitySearch').click();
    await page.waitForTimeout(1500);
    await page.getByText('Lal Purja').dblclick();
    await page.locator('#IdentityNo').fill(identityno);
    await page.locator('#IssueAuthority').fill('Malpot');
    await page.locator('#IssueDate').fill('2075/05/05');
    await page.locator('#btnAddData').click();

    //Family Information
    await page.getByText('Family').click();
    //mother
    await page.getByRole('cell', { name: '' }).getByRole('button').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'Mother', exact: true }).dblclick();
    await page.getByPlaceholder('full name').fill(firstName+' '+lastName);
    await page.getByRole('button', { name: '' }).click();

    //father
    await page.getByRole('cell', { name: '' }).getByRole('button').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'Father', exact: true }).dblclick();
    await page.getByPlaceholder('full name').fill(firstName+' '+lastName);
    await page.getByRole('button', { name: '' }).click();

    //grandfather
    await page.getByRole('cell', { name: '' }).getByRole('button').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'Grand Father', exact: true }).dblclick();
    await page.getByPlaceholder('full name').fill(firstName+' '+lastName);
    await page.getByRole('button', { name: '' }).click();

    //grandmother
    await page.getByRole('cell', { name: '' }).getByRole('button').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'Grand Mother', exact: true }).dblclick();
    await page.getByPlaceholder('full name').fill(firstName+' '+lastName);
    await page.getByRole('button', { name: '' }).click();

    // Address Details
    await page.locator('#profile-tab').click();
    await page.locator('#permanentAddress div').filter({ hasText: 'Province *' }).getByRole('button').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'State 1' }).dblclick();
    await page.locator('#permanentAddress div').filter({ hasText: 'District *' }).getByRole('button').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'TAPLEJUNG' }).dblclick();
    await page.locator('#permanentAddress div').filter({ hasText: 'Local Body *' }).getByRole('button').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'Phaktanlung Rural Municipality' }).dblclick();
    await page.getByRole('textbox', { name: 'Tole Name *' }).fill(address);
    await page.locator('#PortalCustomerKYCRequestAddressViewModel_PermToleNameLocLang').fill('गोकर्ण');
    await page.getByRole('textbox', { name: 'Ward No *' }).fill('15');
    await page.getByLabel('House No.', { exact: true }).fill('15113/5444');
    await page.locator('#PortalCustomerKYCRequestAddressViewModel_PermPhoneNo').fill(telno);
    await page.locator('#PortalCustomerKYCRequestAddressViewModel_PermMobileNo').fill(mobileno);
    await page.locator('#PortalCustomerKYCRequestAddressViewModel_PermEmail').fill(email);
    await page.getByText('Same as Permanent').click();

    //Nominee Information
    await page.getByRole('tab', { name: 'Nominee Information' }).click();
    await page.getByText('No Nominee').click();
    await page.getByLabel('Nominee Name *').fill(firstName+' '+lastName);
    await page.getByLabel('Nominee Name (Local Language').fill('गौरव भण्डारी');
    await page.locator('#PortalCustomerKYCRequestNomineesViewModel_GenderId').selectOption('1');
    await page.locator('#nomineeFieldSet div').filter({ hasText: 'Nominee Name * Nominee Name (' }).getByRole('button').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'Father', exact: true }).dblclick();
    await page.locator('#nomineeFieldSet').getByRole('button', { name: '' }).nth(2).click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'Phaktanlung Rural Municipality' }).dblclick();
    await page.getByRole('textbox', { name: 'Ward No *' }).fill('15');
    await page.getByRole('textbox', { name: 'House No. *' }).fill('587/4584496');
    await page.getByRole('textbox', { name: 'Tole Name *' }).fill(address);
    await page.locator('#PortalCustomerKYCRequestNomineesViewModel_CitizenShipNo').fill(identityno);
    await page.locator('#nomineeFieldSet div').filter({ hasText: 'Tole Name * Citizenship No.' }).getByRole('button').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'TAPLEJUNG' }).dblclick();
    await page.locator('#PortalCustomerKYCRequestNomineesViewModel_CitizenShipIssueDate').fill('2080/05/10');
    await page.getByRole('textbox', { name: 'Mobile No. *' }).fill(mobileno);
    await page.locator('#PortalCustomerKYCRequestNomineesViewModel_TelNo').fill(telno);
    await page.locator('#PortalCustomerKYCRequestNomineesViewModel_EmailId').fill(email);
    await page.locator('#NomineeDocFile').getByRole('combobox').selectOption('1');
    await page.getByRole('textbox', { name: 'Doc. Title' }).fill('Citizenship');
    await page.setInputFiles('#NomineeFilesDoc', 'Upload/NEPALI_citizenship_image.jpg');

    //Guardian Information
    await page.getByRole('tab', { name: 'Guardian Information' }).click();
    await page.getByText('No Guardian').click();
    await page.locator('#PortalCustomerKYCRequestGuardiansViewModel_GuardianName').fill(firstName+' '+lastName);
    await page.locator('#PortalCustomerKYCRequestGuardiansViewModel_GuardianNameLocLang').fill('मुना कुमार कुशुवाह');
    await page.locator('#PortalCustomerKYCRequestGuardiansViewModel_GenderId').selectOption('1');
    await page.locator('#guardianFieldSet div').filter({ hasText: 'Guardian Name * Guardian Name' }).getByRole('button').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'Mother', exact: true }).dblclick();
    await page.locator('#PortalCustomerKYCRequestGuardiansViewModel_EmbassyId').fill('Nepali Embassy');
    await page.locator('#guardianFieldSet').getByRole('button', { name: '' }).nth(2).click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'Phaktanlung Rural Municipality' }).dblclick();
    await page.getByRole('textbox', { name: 'Ward No *' }).fill('15');
    await page.getByRole('textbox', { name: 'House No. *' }).fill('1025/5445');
    await page.getByRole('textbox', { name: 'Tole Name *' }).fill(address);
    await page.locator('#PortalCustomerKYCRequestGuardiansViewModel_CitizenShipNo').fill(identityno);
    await page.locator('#PortalCustomerKYCRequestGuardiansViewModel_CitizenShipIssueDate').fill('2070/05/03');
    await page.locator('#guardianFieldSet div').filter({ hasText: 'Tole Name * Citizenship No.' }).getByRole('button').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'TAPLEJUNG' }).dblclick();
    await page.getByRole('textbox', { name: 'Mobile No. *' }).fill(mobileno);
    await page.locator('#PortalCustomerKYCRequestGuardiansViewModel_TelNo').fill(telno);
    await page.locator('#PortalCustomerKYCRequestGuardiansViewModel_EmailId').fill(email);
    await page.setInputFiles('#GuardianFiles', 'Upload/CIT_recent_image.png');
    await page.locator('#GuardianDocFile').getByRole('combobox').selectOption('1');
    await page.getByRole('textbox', { name: 'Doc. Title' }).fill('Citizenship');
    await page.setInputFiles('#GuardianFilesDoc', 'Upload/NEPALI_citizenship_image.jpg');

    // Document
    //await page.getByText('Document').click();
    await page.getByRole('tab', { name: 'Document' }).click();
    await page.locator('#DocFile').getByRole('combobox').selectOption('1');
    await page.getByRole('textbox', { name: 'Doc. Title' }).fill('Citizenship');
    await page.setInputFiles('#FilesDoc', 'Upload/NEPALI_citizenship_image.jpg');

    //Bank
    await page.getByRole('tab', { name: 'Bank' }).click();
    await page.locator('#bankDetails').getByRole('button', { name: '' }).click();
    await page.waitForTimeout(1000);
    await page.getByText('Jagadamba Credit & Investment Pvt. Ltd.').dblclick();
    await page.locator('#BankBranchName').fill(address);
    await page.locator('#BankAccountNo').fill(accountno);

    //Office
    await page.getByRole('tab', { name: 'Office' }).click();;
    await page.locator('#officeDetails').getByRole('button', { name: '' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'DIGO SOLUTION PVT.LTD,LALITPUR,01' }).dblclick();
    await page.getByLabel('Address *').fill(address);
    await page.getByLabel('Phone No *').fill(telno);
    await page.getByLabel('Designation *').fill('Engineer');
    await page.getByLabel('Yearly Income *').fill('145000');

    //final save

    await page.getByRole('button', { name: ' Save' }).click();
await page.pause();
    //Confirm save
    await page.getByRole('button', { name: 'Confirm' }).click();

});


