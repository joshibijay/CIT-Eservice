const { test, expect } = require('@playwright/test');
const { timeout } = require('../playwright.config');

test('KYC REQUEST', async ({ page }) => {
 await page.goto('http://172.31.1.13:1902/',{timeout:10000});
 await expect(page).toHaveTitle('Login - NLK-WBS Auth');

 await page.locator('#Username').fill('0011233797');
 await page.locator('#Password').fill('270ODA5ODQ3NDczMQ==!1xD');
 await page.getByRole('button', { name: 'Login' }).click();
//KYC Request

 await page.getByText('KYC Request').click();
 
//english lang
 await page.locator('#FirstName').fill('KYCfirstname');
 await page.locator('#MiddleName').fill('KYCmiddlename');
 await page.locator('#LastName').fill('KYClastname');

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
 await page.locator('#BirthAddress').fill('Gokarna');
 await page.locator('#BirthAddressLocLang').fill('गोकर्ण');
 await page.locator('#BirthWardNo').fill('05');
 await page.locator('#CitizenShipNo').fill('15875/454556');
 await page.locator('#CitizenShipIssueDate').fill('2070/05/09');
 await page.locator('#CitizenshipIssuingAuthority').fill('DAO');
 await page.getByRole('button', { name: '' }).nth(2).click();
 await page.waitForTimeout(1000);
 await page.getByRole('cell', { name: 'TAPLEJUNG' }).dblclick();
 await page.getByLabel('Mobile No.', { exact: true }).fill('9812345678');
 await page.getByRole('textbox', { name: 'Telephone No' }).fill('01412345');
 await page.getByRole('textbox', { name: 'Email' }).fill('bijaybikramjoshi@gmail.com');
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
 await page.locator('#IdentityNo').fill('545845');
 await page.locator('#IssueAuthority').fill('Malpot');
 await page.locator('#IssueDate').fill('2075/05/05');
 await page.locator('#btnAddData').click();

 //Family Information
 await page.getByText('Family').click();
 //mother
 await page.getByRole('cell', { name: '' }).getByRole('button').click();
 await page.waitForTimeout(1000);
 await page.getByRole('cell', { name: 'Mother', exact: true }).dblclick();
 await page.getByPlaceholder('full name').fill('mother name');
 await page.getByRole('button', { name: '' }).click();

 //father
 await page.getByRole('cell', { name: '' }).getByRole('button').click();
 await page.waitForTimeout(1000);
 await page.getByRole('cell', { name: 'Father', exact: true }).dblclick();
 await page.getByPlaceholder('full name').fill('father name');
 await page.getByRole('button', { name: '' }).click();
 
 //grandfather
 await page.getByRole('cell', { name: '' }).getByRole('button').click();
 await page.waitForTimeout(1000);
 await page.getByRole('cell', { name: 'Grand Father', exact: true }).dblclick();
 await page.getByPlaceholder('full name').fill('grandfather name');
 await page.getByRole('button', { name: '' }).click();
 
 //grandmother
 await page.getByRole('cell', { name: '' }).getByRole('button').click();
 await page.waitForTimeout(1000);
 await page.getByRole('cell', { name: 'Grand Mother', exact: true }).dblclick();
 await page.getByPlaceholder('full name').fill('grandmother name');
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
await page.getByRole('textbox', { name: 'Tole Name *' }).fill('Gokarna');
await page.locator('#PortalCustomerKYCRequestAddressViewModel_PermToleNameLocLang').fill('गोकर्ण');
await page.getByRole('textbox', { name: 'Ward No *' }).fill('15');
await page.getByLabel('House No.', { exact: true }).fill('15113/5444');
await page.locator('#PortalCustomerKYCRequestAddressViewModel_PermPhoneNo').fill('646944995464556');
await page.locator('#PortalCustomerKYCRequestAddressViewModel_PermMobileNo').fill('9812345678');
await page.locator('#PortalCustomerKYCRequestAddressViewModel_PermEmail').fill('Bijaybikramjoshi@gmail.com');
await page.getByText('Same as Permanent').click();

//Nominee Information
await page.getByRole('tab', { name: 'Nominee Information' }).click();
await page.getByText('No Nominee').click();
await page.getByLabel('Nominee Name *').fill('Guarav Bhandari');
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
await page.getByRole('textbox', { name: 'Tole Name *' }).fill('Gokarna, Kathmandu');
await page.locator('#PortalCustomerKYCRequestNomineesViewModel_CitizenShipNo').fill('695/96/454');
await page.locator('#nomineeFieldSet div').filter({ hasText: 'Tole Name * Citizenship No.' }).getByRole('button').click();
await page.waitForTimeout(1000);
await page.getByRole('cell', { name: 'TAPLEJUNG' }).dblclick();
await page.locator('#PortalCustomerKYCRequestNomineesViewModel_CitizenShipIssueDate').fill('2080/05/10');
await page.getByRole('textbox', { name: 'Mobile No. *' }).fill('9812345678');
await page.locator('#PortalCustomerKYCRequestNomineesViewModel_TelNo').fill('014123456');
await page.locator('#PortalCustomerKYCRequestNomineesViewModel_EmailId').fill('munna2334@gmail.com');
await page.locator('#NomineeDocFile').getByRole('combobox').selectOption('1');
await page.getByRole('textbox', { name: 'Doc. Title' }).fill('Citizenship');
await page.setInputFiles('#NomineeFilesDoc','Upload/NEPALI_citizenship_image.jpg');

//Guardian Information
await page.getByRole('tab', { name: 'Guardian Information' }).click();
await page.getByText('No Guardian').click();
await page.locator('#PortalCustomerKYCRequestGuardiansViewModel_GuardianName').fill('Muna Kumar Kushwaha');
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
await page.getByRole('textbox', { name: 'Tole Name *' }).fill('Gorkarna');
await page.locator('#PortalCustomerKYCRequestGuardiansViewModel_CitizenShipNo').fill('15/48545/9');
await page.locator('#PortalCustomerKYCRequestGuardiansViewModel_CitizenShipIssueDate').fill('2070/05/03');
await page.locator('#guardianFieldSet div').filter({ hasText: 'Tole Name * Citizenship No.' }).getByRole('button').click();
await page.waitForTimeout(1000);
await page.getByRole('cell', { name: 'TAPLEJUNG' }).dblclick();
await page.getByRole('textbox', { name: 'Mobile No. *' }).fill('9812345689');
await page.locator('#PortalCustomerKYCRequestGuardiansViewModel_TelNo').fill('014113456');
await page.locator('#PortalCustomerKYCRequestGuardiansViewModel_EmailId').fill('munna2334@gmail.com');
await page.setInputFiles('#GuardianFiles','Upload/CIT_recent_image.png');
await page.locator('#GuardianDocFile').getByRole('combobox').selectOption('1');
await page.getByRole('textbox', { name: 'Doc. Title' }).fill('Citizenship');
await page.setInputFiles('#GuardianFilesDoc','Upload/NEPALI_citizenship_image.jpg');

// Document
//await page.getByText('Document').click();
await page.getByRole('tab', { name: 'Document' }).click();
await page.locator('#DocFile').getByRole('combobox').selectOption('1');
await page.getByRole('textbox', { name: 'Doc. Title' }).fill('Citizenship');
await page.setInputFiles('#FilesDoc','Upload/NEPALI_citizenship_image.jpg');

//Bank
await page.getByRole('tab', { name: 'Bank' }).click();
await page.locator('#bankDetails').getByRole('button', { name: '' }).click();
await page.waitForTimeout(1000);
await page.getByText('Jagadamba Credit & Investment Pvt. Ltd.').dblclick();
await page.locator('#BankBranchName').fill('Kalanki');
await page.locator('#BankAccountNo').fill('5645485500220');

//Office
await page.getByRole('tab', { name: 'Office' }).click();;
await page.locator('#officeDetails').getByRole('button', { name: '' }).click();
await page.waitForTimeout(1000);
await page.getByRole('cell', { name: 'DIGO SOLUTION PVT.LTD,LALITPUR,01' }).dblclick();
await page.getByLabel('Address *').fill('Kathmandu');
await page.getByLabel('Phone No *').fill('01478514');
await page.getByLabel('Designation *').fill('Engineer');
await page.getByLabel('Yearly Income *').fill('145000');

//final save

await page.getByRole('button', { name: ' Save' }).click();

//Confirm save
await page.getByRole('button', { name: 'Confirm' }).click();
});