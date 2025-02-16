import { test, expect } from '@playwright/test'
import { login } from '../pages/login';
import { firstName, middlename, lastName, email, mobileno, address, telno, accountno, panno, identityno, formatted_Date } from '../pages/test';


test.describe('Kyc request', () => {
    test.setTimeout(600000); // Set timeout for the entire suite

test.beforeEach('Login Credentials', async ({ page }) => {
    await page.goto('http://10.10.11.14:1902/', { timeout: 100000 });
    const Kyc_login = new login(page);
    await Kyc_login.eservice_login('0010222899','Pass@1234');
    await page.getByText('KYC Request').click();

})

test('KYC REQUEST -Create', async ({ page }) => {

    //english lang
    await page.pause();
    //first name *
    if (await page.locator('#FirstName').allTextContents()) {
        console.log('first name is present');
    }
    else {
        //await page.locator('#FirstName').clear();
        await page.locator('#FirstName').fill(firstName);
    }
    //middle name 
    if (await page.locator('#MiddleName').allTextContents()) {
        console.log('middle name is present');
    }
    else {
        //await page.locator('#MiddleName').clear();
        await page.locator('#MiddleName').pressSequentially(middlename);
    }

    //last name *
    if (await page.locator('#LastName').allTextContents()) {
        console.log('last name is present');
    }
    else {
        //await page.locator('#LastName').clear();
        await page.locator('#LastName').pressSequentially(lastName);
    }

    // local lang
    // first loc lang
    // await page.locator('#FirstNameLocLang').fill('पहिलो नाम');
    // //middle loc lang
    // await page.locator('#MiddleNameLocLang').fill('बीचको नाम');
    // //last loc lang
    // await page.locator('#LastNameLocLang').fill('थर');

    //general info
    //gender *
    await page.locator('#GenderId').selectOption('1');
    //religion
    await page.locator('#ReligionId').selectOption('1');

    //martial status * 
    if (expect(await page.locator('#MaritalStatusId').first()).toHaveValue('Married')) {
        // Spouse Information
        //Spouse name*
        await page.getByLabel('Spouse Name', { exact: true }).fill(firstName + ' ' + lastName);
        await page.locator('#SpouseNameLocLang').fill('नाम');
        //Spouse Birth Date*
        await page.getByLabel('Spouse BirthDate', { exact: true }).fill('2060/05/09');
        await page.locator('#SpouseCitizenShipNo').fill(identityno);
        await page.locator('#SpouseCitizenShipIssueDate').fill('2070/01/01');
        //spouse occupation *
        await page.locator('#SpouseInformation').getByRole('button', { name: '' }).nth(1).click();
        await page.waitForTimeout(1000);
        await page.getByRole('cell', { name: 'HOUSE WIFE' }).dblclick();

    }
    else {
        await page.locator('#MaritalStatusId').selectOption('1');
    }

    //caste *
    await page.locator('.CasteSearch').click();
    await page.waitForTimeout(1000);
    await page.getByText('Terai Dalit').dblclick();
    // //pan no *
    // if (await page.locator('#PanNo').isVisible()) {
    //     console.log('continue to the next test line');

    // }
    // else {
    //     await page.locator('#PanNo').fill(panno);
    // }

    //birthdate *
    await page.locator('#BirthDate').fill('2050/01/01');
    //birth address 
    await page.locator('#BirthAddress').fill(address);
    //birth address loc lang
    await page.locator('#BirthAddressLocLang').fill('गोकर्ण');
    //birth ward no
    await page.locator('#BirthWardNo').fill('05');
    //citizenship no *
    if (await page.locator('#CitizenShipNo').isVisible()) {
        console.log('identity no exists');
    }
    else {
        await page.locator('#CitizenShipNo').fill(identityno);
    }

    //citizenship issue date *
    await page.locator('#CitizenShipIssueDate').fill('2070/05/09');
    //CitizenshipIssuingAuthority *
    await page.locator('#CitizenshipIssuingAuthority').fill('DAO');

    //Citizenship Issue District *
    await page.locator('button.CitizenShipIssueDistrictSearch').click();
await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'TAPLEJUNG' }).dblclick();

    if (await page.locator('#MobileNo').isVisible()) {
        console.log('number already exist');
    }
    else {
        await page.locator('MobileNo').fill(mobileno);
    }

    await page.getByRole('textbox', { name: 'Telephone No' }).fill(telno);
    await page.getByRole('textbox', { name: 'Email' }).fill(email);

    //Occupation *
    await page.locator('div:nth-child(9) > div > .form-group > .input-group > .input-group-append > .btn').nth(1).click();
    await page.waitForTimeout(500);
    await page.getByRole('cell', { name: 'SERVICE' }).dblclick();
    //Designation *
    await page.getByText('Designation').fill('IT engineer');
    //employment status *
    await page.locator('#EmploymentStatusId').selectOption('4');
    //#IncomeSource *
    await page.locator('#IncomeSourceId').selectOption('1');
    await page.getByLabel('NID Number').fill(panno);
    await page.getByLabel('NID Number').fill('2070/01/01');
    await page.getByLabel('NID Issue Authority').fill('IRD');
    const highprofile = await page.locator('#noRadio');
    await expect.soft(highprofile).toBeChecked('No');
    await page.getByLabel('Annual Income *').fill(panno);



    //Indentity Information
    //await page.getByRole('link', { name: 'Delete' }).click();
    await page.getByRole('tab', { name: 'Identity Information' }).click();
    if(await page.locator('td.pq-grid-cell[pq-col-indx="1"]').isVisible)
        {
            await page.getByText('Family').click();
    }
    else{
        await page.locator('.IdentitySearch').click();
        await page.waitForTimeout(1500);
        await page.locator('//*[@id="search-grid"]/div[2]/div[2]/div/div/table/tbody/tr[3]/td').dblclick();
        await page.locator('#IdentityNo').fill(identityno);
        await page.locator('#IssueAuthority').fill('NID');
        await page.locator('#IssueDate').fill('2050/05/05');
        await page.locator('#ExpiryDate').fill('2090/01/01');
        await page.locator('#OtherIdentity').fill('card');
        await page.locator('#btnAddData').click();
    }


    //Family Information
    await page.getByText('Family').click();

    if (await page.getByRole('cell', { name: 'Father', exact: true }).isVisible()) {
        console.log('Father name already exists');
    } else {
        await page.getByRole('cell', { name: '' }).getByRole('button').click();
        await page.waitForTimeout(1000);
        await page.getByRole('cell', { name: 'Father', exact: true }).dblclick();
        await page.getByPlaceholder('full name').fill(firstName + ' ' + lastName);
        await page.getByRole('button', { name: '' }).click();
    }

    if (await page.getByRole('cell', { name: 'Mother', exact: true }).isVisible()) {
        console.log('Mother name already exists');
    } else {
        await page.getByRole('cell', { name: '' }).getByRole('button').click();
        await page.waitForTimeout(1000);
        await page.getByRole('cell', { name: 'Mother', exact: true }).dblclick();
        await page.getByPlaceholder('full name').fill(firstName + ' ' + lastName);
        await page.getByRole('button', { name: '' }).click();
    }

    if (await page.getByRole('cell', { name: 'Grand Mother', exact: true }).isVisible()) {
        console.log('Grand Mother name already exists');
    } else {
        await page.getByRole('cell', { name: '' }).getByRole('button').click();
        await page.waitForTimeout(1000);
        await page.getByRole('cell', { name: 'Grand Mother', exact: true }).dblclick();
        await page.getByPlaceholder('full name').fill(firstName + ' ' + lastName);
        await page.getByRole('button', { name: '' }).click();
    }

    if (await page.getByRole('cell', { name: 'Grand Father', exact: true }).isVisible()) {
        console.log('Grand Father name already exists');
    } else {
        await page.getByRole('cell', { name: '' }).getByRole('button').click();
        await page.waitForTimeout(1000);
        await page.getByRole('cell', { name: 'Grand Father', exact: true }).dblclick();
        await page.getByPlaceholder('full name').fill(firstName + ' ' + lastName);
        await page.locator('#IsAlive').uncheck();
        await page.getByRole('button', { name: '' }).click();
    }

    // Address Details
    await page.locator('#profile-tab').click();
    //province*
    await page.locator('#permanentAddress div').filter({ hasText: 'Province *' }).getByRole('button').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'Bagmati' }).dblclick();
    //District*
    await page.locator('#permanentAddress div').filter({ hasText: 'District *' }).getByRole('button').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'KATHMANDU' }).dblclick();
    //Local body*
    await page.locator('#permanentAddress div').filter({ hasText: 'Local Body *' }).getByRole('button').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'Kathmandu Metropolitian City' }).dblclick();
    //tole name*
    await page.getByRole('textbox', { name: 'Tole Name *' }).fill(address);
    //tole name loc 
    await page.locator('#PortalCustomerKYCRequestAddressViewModel_PermToleNameLocLang').fill('गोकर्ण');
    //ward no *
    await page.getByRole('textbox', { name: 'Ward No *' }).fill('15');
    //house no
    await page.locator('#PortalCustomerKYCRequestAddressViewModel_PermHouseNo').fill('113/544');
    await page.waitForTimeout(500);
    await page.getByText('Same as Permanent').click();

    //Nominee Information
    await page.getByRole('tab', { name: 'Nominee Information' }).click();
    await page.getByText('No Nominee').click();
    await page.getByLabel('Nominee Name *').fill(firstName + ' ' + lastName);
    await page.getByLabel('Nominee Name (Local Language').fill('गौरव भण्डारी');
    await page.locator('#PortalCustomerKYCRequestNomineesViewModel_GenderId').selectOption('1');
    await page.locator('#nomineeFieldSet div').filter({ hasText: 'Nominee Name * Nominee Name (' }).getByRole('button').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'Father', exact: true }).dblclick();
    await page.locator('#nomineeFieldSet').getByRole('button', { name: '' }).nth(2).click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'Phaktanlung Rural Municipality' }).dblclick();
    await page.getByRole('textbox', { name: 'Ward No *' }).fill('15');
    await page.locator('#PortalCustomerKYCRequestNomineesViewModel_HouseNo').fill('587/496');
    await page.getByRole('textbox', { name: 'Tole Name *' }).fill(address);
    await page.locator('#PortalCustomerKYCRequestNomineesViewModel_CitizenShipNo').fill(identityno);
    await page.locator('#nomineeFieldSet div').filter({ hasText: 'Tole Name * Citizenship No.' }).getByRole('button').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'TAPLEJUNG' }).dblclick();
    await page.locator('#PortalCustomerKYCRequestNomineesViewModel_CitizenShipIssueDate').fill('2080/05/10');
    await page.locator('##PortalCustomerKYCRequestNomineesViewModel_MobileNo').fill(mobileno);
    await page.locator('#PortalCustomerKYCRequestNomineesViewModel_TelNo').fill(telno);
    await page.locator('#PortalCustomerKYCRequestNomineesViewModel_EmailId').fill(email);
    // await page.setInputFiles('#NomineeFiles', 'Upload/CIT_recent_image.png');
    await page.locator('#NomineeDocFile').getByRole('combobox').selectOption('24');
    await page.getByRole('textbox', { name: 'Doc. Title' }).fill('Citizenship');
    await page.setInputFiles('#NomineeFilesDoc', 'Upload/NEPALI_citizenship_image.jpg');

    //Guardian Information
    await page.getByRole('tab', { name: 'Guardian Information' }).click();
    await page.getByText('No Guardian').click();
    await page.locator('#PortalCustomerKYCRequestGuardiansViewModel_GuardianName').fill(firstName + ' ' + middlename + ' ' + lastName);
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
    await page.locator('#PortalCustomerKYCRequestGuardiansViewModel_HouseNo').fill('125/784');
    await page.getByRole('textbox', { name: 'Tole Name *' }).fill(address);
    await page.locator('#PortalCustomerKYCRequestGuardiansViewModel_CitizenShipNo').fill(identityno);
    await page.locator('#PortalCustomerKYCRequestGuardiansViewModel_CitizenShipIssueDate').fill('2070/05/03');
    await page.locator('#guardianFieldSet div').filter({ hasText: 'Tole Name * Citizenship No.' }).getByRole('button').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'TAPLEJUNG' }).dblclick();
    await page.locator('#PortalCustomerKYCRequestGuardiansViewModel_MobileNo').fill(mobileno);
    await page.locator('#PortalCustomerKYCRequestGuardiansViewModel_TelNo').fill(telno);
    await page.locator('#PortalCustomerKYCRequestGuardiansViewModel_EmailId').fill(email);
    // await page.setInputFiles('#GuardianFiles', 'Upload/CIT_recent_image.png');
    await page.locator('#GuardianDocFile').getByRole('combobox').selectOption('24');
    await page.getByRole('textbox', { name: 'Doc. Title' }).fill('Citizenship');
    await page.setInputFiles('#GuardianFilesDoc', 'Upload/NEPALI_citizenship_image.jpg');

    // Document
    // await page.getByText('Document').click();
    await page.getByRole('tab', { name: 'Document' }).click();
    await page.locator('#DocFile').getByRole('combobox').selectOption('24');
    await page.getByRole('textbox', { name: 'Doc. Title' }).fill('nid cit');
    await page.setInputFiles('#FilesDoc', 'Upload/cit_passport_image.jpg');

    //Bank
    await page.getByRole('tab', { name: 'Bank' }).click();
    await page.locator('#bankDetails').getByRole('button', { name: '' }).click();
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('Enter your keyword').fill('PRABHU BANK LIMITED');
    await page.getByPlaceholder('Enter your keyword').press('Enter');
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'PRABHU BANK LIMITED' }).dblclick();
    await page.locator('#BankBranchName').fill(address);
    await page.locator('#BankAccountNo').fill(accountno);

    //final save

    await page.getByRole('button', { name: ' Save' }).click();
    await page.pause();
    //Confirm save
    await page.getByRole('button', { name: 'Confirm' }).click();
});


test('KYC REQUEST -Create Mandatory field', async ({ page }) => {

    //english lang
    await page.pause();
    //first name *
    if (await page.locator('#FirstName').isVisible()) {
        console.log('first name is present');
    }
    else {
        //await page.locator('#FirstName').clear();
        await page.locator('#FirstName').fill(firstName);
    }


    //last name *
    if (await page.locator('#LastName').isVisible()) {
        console.log('last name is present');
    }
    else {
        await page.locator('#LastName').clear();
        await page.locator('#LastName').pressSequentially(lastName);
    }

    //general info
    //gender *
    await page.locator('#GenderId').selectOption('1');

    //martial status * 
    await page.locator('#MaritalStatusId').selectOption('2');

    //caste *
    await page.locator('.CasteSearch').click();
    await page.waitForTimeout(1000);
    await page.getByText('Terai Dalit').dblclick();
    await page.waitForTimeout(1500);
    //pan no *
    if (await page.locator('#PanNo').textContent()) {
        console.log('continue to the next test line');

    }
    else {
        await page.locator('#PanNo').fill(panno);
    }

    //birthdate *
    await page.locator('#BirthDate').fill('2050/01/01');
await page.waitForTimeout(1500);
    //citizenship no *
    if (await page.getByLabel('Citizenship No. *').textContent()) {
        console.log(' citizenship identity no exists');
    }
    else {
        await page.getByLabel('Citizenship No. *').fill(identityno);
    }

    //citizenship issue date *
    await page.locator('#CitizenShipIssueDate').fill('2070/05/09');

    //CitizenshipIssuingAuthority *
    await page.locator('#CitizenshipIssuingAuthority').fill('DAO');

    //Citizenship Issue District *
    await page.locator('div:nth-child(9) > div > .form-group > .input-group > .input-group-append > .btn').first().click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'TAPLEJUNG' }).dblclick()
await page.waitForTimeout(1500);
    if (await page.getByRole('textbox', { name: 'Mobile No. *' }).isVisible()) {
        console.log('number already exist');
    }
    else {
        await page.locator('MobileNo').fill(mobileno);
    }


    await page.getByRole('textbox', { name: 'Email' }).fill(email);

    //Occupation *
    await page.locator('div:nth-child(10) > div > .form-group > .input-group > .input-group-append > .btn').click();
    await page.waitForTimeout(500);
    await page.getByRole('cell', { name: 'SERVICE' }).dblclick();
    //Designation *
    await page.getByText('Designation').fill('IT engineer');
    //employment status *
    await page.locator('#EmploymentStatusId').selectOption('4');
    //#IncomeSource *
    await page.locator('#IncomeSourceId').selectOption('1');

    const highprofile = await page.locator('#noRadio');
    await expect(highprofile).toBeChecked('No');

    await page.getByLabel('Annual Income *').fill(panno);

    // Spouse Information
    //Spouse name*
    await page.getByLabel('Spouse Name', { exact: true }).fill(firstName + ' ' + lastName);
    //Spouse Birth Date*
    await page.getByLabel('Spouse BirthDate', { exact: true }).fill('2060/05/09');
    //spouse occupation *
    await page.locator('#SpouseInformation').getByRole('button', { name: '' }).nth(1).click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'HOUSE WIFE' }).dblclick();

    //Indentity Information
    //await page.getByRole('link', { name: 'Delete' }).click();
    await page.locator('.IdentitySearch').click();
    await page.waitForTimeout(1500);
    await page.locator('//*[@id="search-grid"]/div[2]/div[2]/div/div/table/tbody/tr[2]/td').dblclick();
    await page.locator('#IdentityNo').fill(identityno);
    await page.locator('#IssueAuthority').fill('NID');
    await page.locator('#IssueDate').fill('2050/05/05');
    await page.locator('#ExpiryDate').fill('2090/01/01');
    await page.locator('#btnAddData').click();

    //Family Information
    await page.pause();
    await page.getByText('Family').click();

    if (await page.getByRole('cell', { name: 'Father', exact: true }).nth(1).isVisible()) {
        console.log('Father name already exists');
    } else {
        await page.getByRole('cell', { name: '' }).getByRole('button').click();
        await page.waitForTimeout(1000);
        await page.getByRole('cell', { name: 'Father', exact: true }).dblclick();
        await page.getByPlaceholder('full name').fill(firstName + ' ' + lastName);
        await page.getByRole('button', { name: '' }).click();
    }

    if (await page.getByRole('cell', { name: 'Mother', exact: true }).isVisible()) {
        console.log('Mother name already exists');
    } else {
        await page.getByRole('cell', { name: '' }).getByRole('button').click();
        await page.waitForTimeout(1000);
        await page.getByRole('cell', { name: 'Mother', exact: true }).dblclick();
        await page.getByPlaceholder('full name').fill(firstName + ' ' + lastName);
        await page.getByRole('button', { name: '' }).click();
    }

    if (await page.getByRole('cell', { name: 'Grand Mother', exact: true }).first().isVisible()) {
        console.log('Grand Mother name already exists');
    } else {
        await page.getByRole('cell', { name: '' }).getByRole('button').click();
        await page.waitForTimeout(1000);
        await page.getByRole('cell', { name: 'Grand Mother', exact: true }).dblclick();
        await page.getByPlaceholder('full name').fill(firstName + ' ' + lastName);
        await page.getByRole('button', { name: '' }).click();
    }

    if (await page.getByRole('cell', { name: 'Grand Father', exact: true }).isVisible()) {
        console.log('Grand Father name already exists');
    } else {
        await page.getByRole('cell', { name: '' }).getByRole('button').click();
        await page.waitForTimeout(1000);
        await page.getByRole('cell', { name: 'Grand Father', exact: true }).dblclick();
        await page.getByPlaceholder('full name').fill(firstName + ' ' + lastName);
        await page.getByRole('button', { name: '' }).click();
    }

    if (await page.getByRole('cell', { name: 'Son', exact: true }).isVisible()) {
        console.log('Son name already exists');
    } else {
        await page.getByRole('cell', { name: '' }).getByRole('button').click();
        await page.waitForTimeout(1000);
        await page.getByRole('cell', { name: 'Son', exact: true }).dblclick();
        await page.getByPlaceholder('full name').fill(firstName + ' ' + lastName);
        await page.getByRole('button', { name: '' }).click();
    }
    if (await page.getByRole('cell', { name: 'Son', exact: true }).isVisible()) {
        console.log('Mother name already exists');
    } else {
        await page.getByRole('cell', { name: '' }).getByRole('button').click();
        await page.waitForTimeout(1000);
        await page.getByRole('cell', { name: 'Son', exact: true }).dblclick();
        await page.getByPlaceholder('full name').fill(firstName + ' ' + lastName);
        await page.getByRole('button', { name: '' }).click();
    }
    if (await page.getByRole('cell', { name: 'Daughter', exact: true }).isVisible()) {
        console.log('Mother name already exists');
    } else {
        await page.getByRole('cell', { name: '' }).getByRole('button').click();
        await page.waitForTimeout(1000);
        await page.getByRole('cell', { name: 'Daughter', exact: true }).dblclick();
        await page.getByPlaceholder('full name').fill(firstName + ' ' + lastName);
        await page.getByRole('button', { name: '' }).click();
    }
    if (await page.getByRole('cell', { name: 'Daughter', exact: true }).isVisible()) {
        console.log('Mother name already exists');
    } else {
        await page.getByRole('cell', { name: '' }).getByRole('button').click();
        await page.waitForTimeout(1000);
        await page.getByRole('cell', { name: 'Daughter', exact: true }).dblclick();
        await page.getByPlaceholder('full name').fill(firstName + ' ' + lastName);
        await page.getByRole('button', { name: '' }).click();
    }
    // Address Details
    await page.locator('#profile-tab').click();
    //province*
    await page.locator('#permanentAddress div').filter({ hasText: 'Province *' }).getByRole('button').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'Bagmati' }).dblclick();
    //District*
    await page.locator('#permanentAddress div').filter({ hasText: 'District *' }).getByRole('button').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'KATHMANDU' }).dblclick();
    //Local body*
    await page.locator('#permanentAddress div').filter({ hasText: 'Local Body *' }).getByRole('button').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'Kathmandu Metropolitian City' }).dblclick();
    //tole name*
    await page.getByRole('textbox', { name: 'Tole Name *' }).fill(address);

    //ward no *
    await page.getByRole('textbox', { name: 'Ward No *' }).fill('15');
    await page.waitForTimeout(500);
    await page.getByText('Same as Permanent').click();

    //Nominee Information

    await page.getByRole('tab', { name: 'Nominee Information' }).click();
    // await page.getByText('No Nominee').click();
    // //nominee name
    // await page.getByLabel('Nominee Name *').fill(firstName + ' ' + lastName);
    // await page.locator('#nomineeFieldSet div').filter({ hasText: 'Nominee Name * Nominee Name (' }).getByRole('button').click();
    // await page.waitForTimeout(1000);
    // //relation
    // await page.getByRole('cell', { name: 'Father', exact: true }).dblclick();
    // await page.locator('#nomineeFieldSet').getByRole('button', { name: '' }).nth(2).click();
    // await page.waitForTimeout(1000);
    // //ward no
    // await page.getByRole('textbox', { name: 'Ward No *' }).fill('15');

    // await page.getByRole('textbox', { name: 'Tole Name *' }).fill(address);

    // await page.locator('#PortalCustomerKYCRequestNomineesViewModel_MobileNo').fill(mobileno);

    // await page.setInputFiles('#NomineeFiles', 'Upload/CIT_recent_image.png');
    // await page.locator('#NomineeDocFile').getByRole('combobox').selectOption('24');
    // await page.getByRole('textbox', { name: 'Doc. Title' }).fill('Citizenship');
    // await page.setInputFiles('#NomineeFilesDoc', 'Upload/NEPALI_citizenship_image.jpg');

    //Guardian Information
    await page.getByRole('tab', { name: 'Guardian Information' }).click();
    // await page.getByText('No Guardian').click();
    // //guardian name
    // await page.locator('#PortalCustomerKYCRequestGuardiansViewModel_GuardianName').fill(firstName + ' ' + middlename + ' ' + lastName);


    // await page.locator('#guardianFieldSet div').filter({ hasText: 'Guardian Name * Guardian Name' }).getByRole('button').click();
    // await page.waitForTimeout(1000);
    // await page.getByRole('cell', { name: 'Mother', exact: true }).dblclick();

    // await page.getByRole('textbox', { name: 'Ward No *' }).fill('15');


    // await page.locator('#PortalCustomerKYCRequestGuardiansViewModel_MobileNo').fill(mobileno);


    // await page.setInputFiles('#GuardianFiles', 'Upload/CIT_recent_image.png');
    // await page.locator('#GuardianDocFile').getByRole('combobox').selectOption('24');
    // await page.getByRole('textbox', { name: 'Doc. Title' }).fill('Citizenship');
    // await page.setInputFiles('#GuardianFilesDoc', 'Upload/NEPALI_citizenship_image.jpg');

    // Document
    // await page.getByText('Document').click();
    await page.pause();
    await page.getByRole('tab', { name: 'Document' }).click();
    await page.locator('#DocFile').getByRole('combobox').selectOption('1');
    await page.getByRole('textbox', { name: 'Doc. Title' }).fill('nid cit');
    await page.setInputFiles('#FilesDoc', 'Upload/cit_passport_image.jpg');

    //Bank
    await page.getByRole('tab', { name: 'Bank' }).click();
    await page.locator('#bankDetails').getByRole('button', { name: '' }).click();
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('Enter your keyword').fill('NMB Bank LTD');
    await page.getByPlaceholder('Enter your keyword').press('Enter');
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'NMB Bank LTD' }).dblclick();
    await page.locator('#BankBranchName').fill('kalanki');
    await page.locator('#BankAccountNo').fill('0270150133500010');

    //final save

    await page.getByRole('button', { name: ' Save' }).click();
    await page.pause();
    //Confirm save
    await page.getByRole('button', { name: 'Confirm' }).click();
});


test('KYC REQUEST -Create Mandatory field with no nominee and gaurdian details', async ({ page }) => {

    //english lang
    await page.pause();
    //first name *
    if (await page.locator('#FirstName').isVisible()) {
        console.log('first name is present');
    }
    else {
        //await page.locator('#FirstName').clear();
        await page.locator('#FirstName').fill(firstName);
    }


    //last name *
    if (await page.locator('#LastName').isVisible()) {
        console.log('last name is present');
    }
    else {
        await page.locator('#LastName').clear();
        await page.locator('#LastName').pressSequentially(lastName);
    }

    //general info
    //gender *
    await page.locator('#GenderId').selectOption('1');

    //martial status * 
    await page.locator('#MaritalStatusId').selectOption('2');

    //caste *
    await page.locator('.CasteSearch').click();
    await page.waitForTimeout(1000);
    await page.getByText('Terai Dalit').dblclick();

    //pan no *
    if (await page.locator('#PanNo').isVisible()) {
        console.log('continue to the next test line');

    }
    else {
        await page.locator('#PanNo').fill(panno);
    }

    //birthdate *
    await page.locator('#BirthDate').fill('2050/01/01');

    //citizenship no *
    if (await page.locator('#CitizenShipNo').isVisible()) {
        console.log('identity no exists');
    }
    else {
        await page.locator('#CitizenShipNo').fill(identityno);
    }

    //citizenship issue date *
    await page.locator('#CitizenShipIssueDate').fill('2070/05/09');

    //CitizenshipIssuingAuthority *
    await page.locator('#CitizenshipIssuingAuthority').fill('DAO');

    //Citizenship Issue District *
    await page.getByRole('button', { name: '' }).nth(2).click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'TAPLEJUNG' }).dblclick()

    if (await page.locator('#MobileNo').isVisible()) {
        console.log('number already exist');
    }
    else {
        await page.locator('MobileNo').fill(mobileno);
    }


    await page.getByRole('textbox', { name: 'Email' }).fill(email);

    //Occupation *
    await page.locator('div:nth-child(9) > div > .form-group > .input-group > .input-group-append > .btn').click();
    await page.waitForTimeout(500);
    await page.getByRole('cell', { name: 'SERVICE' }).dblclick();
    //Designation *
    await page.getByText('Designation').fill('IT engineer');
    //employment status *
    await page.locator('#EmploymentStatusId').selectOption('4');
    //#IncomeSource *
    await page.locator('#IncomeSourceId').selectOption('1');
    const highprofile = await page.locator('#noRadio');
    await expect(highprofile).toBeChecked('No');

    await page.getByLabel('Annual Income *').fill(panno);

    // Spouse Information
    //Spouse name*
    await page.getByLabel('Spouse Name', { exact: true }).fill(firstName + ' ' + lastName);
    //Spouse Birth Date*
    await page.getByLabel('Spouse BirthDate', { exact: true }).fill('2060/05/09');
    //spouse occupation *
    await page.locator('#SpouseInformation').getByRole('button', { name: '' }).nth(1).click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'HOUSE WIFE' }).dblclick();

    //Indentity Information
    //await page.getByRole('link', { name: 'Delete' }).click();
    await page.locator('.IdentitySearch').click();
    await page.waitForTimeout(1500);
    await page.locator('//*[@id="search-grid"]/div[2]/div[2]/div/div/table/tbody/tr[2]/td').dblclick();
    await page.locator('#IdentityNo').fill(identityno);
    await page.locator('#IssueAuthority').fill('NID');
    await page.locator('#IssueDate').fill('2050/05/05');
    await page.locator('#ExpiryDate').fill('2090/01/01');
    await page.locator('#btnAddData').click();

    //Family Information
    await page.getByText('Family').click();

    if (await page.getByRole('cell', { name: 'Father', exact: true }).isVisible()) {
        console.log('Father name already exists');
    } else {
        await page.getByRole('cell', { name: '' }).getByRole('button').click();
        await page.waitForTimeout(1000);
        await page.getByRole('cell', { name: 'Father', exact: true }).dblclick();
        await page.getByPlaceholder('full name').fill(firstName + ' ' + lastName);
        await page.getByRole('button', { name: '' }).click();
    }

    if (await page.getByRole('cell', { name: 'Mother', exact: true }).isVisible()) {
        console.log('Mother name already exists');
    } else {
        await page.getByRole('cell', { name: '' }).getByRole('button').click();
        await page.waitForTimeout(1000);
        await page.getByRole('cell', { name: 'Mother', exact: true }).dblclick();
        await page.getByPlaceholder('full name').fill(firstName + ' ' + lastName);
        await page.getByRole('button', { name: '' }).click();
    }

    if (await page.getByRole('cell', { name: 'Grand Mother', exact: true }).isVisible()) {
        console.log('Grand Mother name already exists');
    } else {
        await page.getByRole('cell', { name: '' }).getByRole('button').click();
        await page.waitForTimeout(1000);
        await page.getByRole('cell', { name: 'Grand Mother', exact: true }).dblclick();
        await page.getByPlaceholder('full name').fill(firstName + ' ' + lastName);
        await page.getByRole('button', { name: '' }).click();
    }

    if (await page.getByRole('cell', { name: 'Grand Father', exact: true }).isVisible()) {
        console.log('Grand Father name already exists');
    } else {
        await page.getByRole('cell', { name: '' }).getByRole('button').click();
        await page.waitForTimeout(1000);
        await page.getByRole('cell', { name: 'Grand Father', exact: true }).dblclick();
        await page.getByPlaceholder('full name').fill(firstName + ' ' + lastName);
        await page.getByRole('button', { name: '' }).click();
    }

    // Address Details
    await page.locator('#profile-tab').click();
    //province*
    await page.locator('#permanentAddress div').filter({ hasText: 'Province *' }).getByRole('button').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'Bagmati' }).dblclick();
    //District*
    await page.locator('#permanentAddress div').filter({ hasText: 'District *' }).getByRole('button').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'KATHMANDU' }).dblclick();
    //Local body*
    await page.locator('#permanentAddress div').filter({ hasText: 'Local Body *' }).getByRole('button').click();
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'Kathmandu Metropolitian City' }).dblclick();
    //tole name*
    await page.getByRole('textbox', { name: 'Tole Name *' }).fill(address);

    //ward no *
    await page.getByRole('textbox', { name: 'Ward No *' }).fill('15');
    await page.waitForTimeout(500);
    await page.getByText('Same as Permanent').click();

    //Nominee Information

    //     await page.getByRole('tab', { name: 'Nominee Information' }).click();
    //     await page.getByText('No Nominee').click();
    //         //nominee name
    //     await page.getByLabel('Nominee Name *').fill(firstName + ' ' + lastName);
    //     await page.locator('#nomineeFieldSet div').filter({ hasText: 'Nominee Name * Nominee Name (' }).getByRole('button').click();
    //     await page.waitForTimeout(1000);
    //     //relation
    //     await page.getByRole('cell', { name: 'Father', exact: true }).dblclick();
    //     await page.locator('#nomineeFieldSet').getByRole('button', { name: '' }).nth(2).click();
    //     await page.waitForTimeout(1000);
    // //ward no
    //     await page.getByRole('textbox', { name: 'Ward No *' }).fill('15');

    //     await page.getByRole('textbox', { name: 'Tole Name *' }).fill(address);

    //     await page.locator('#PortalCustomerKYCRequestNomineesViewModel_MobileNo').fill(mobileno);

    //     await page.setInputFiles('#NomineeFiles', 'Upload/CIT_recent_image.png');
    //     await page.locator('#NomineeDocFile').getByRole('combobox').selectOption('24');
    //     await page.getByRole('textbox', { name: 'Doc. Title' }).fill('Citizenship');
    //     await page.setInputFiles('#NomineeFilesDoc', 'Upload/NEPALI_citizenship_image.jpg');

    //     //Guardian Information
    //     await page.getByRole('tab', { name: 'Guardian Information' }).click();
    //     await page.getByText('No Guardian').click();
    //     //guardian name
    //     await page.locator('#PortalCustomerKYCRequestGuardiansViewModel_GuardianName').fill(firstName + ' ' + middlename + ' ' + lastName);


    //     await page.locator('#guardianFieldSet div').filter({ hasText: 'Guardian Name * Guardian Name' }).getByRole('button').click();
    //     await page.waitForTimeout(1000);
    //     await page.getByRole('cell', { name: 'Mother', exact: true }).dblclick();

    //     await page.getByRole('textbox', { name: 'Ward No *' }).fill('15');


    //     await page.locator('#PortalCustomerKYCRequestGuardiansViewModel_MobileNo').fill(mobileno);


    //     await page.setInputFiles('#GuardianFiles', 'Upload/CIT_recent_image.png');
    //     await page.locator('#GuardianDocFile').getByRole('combobox').selectOption('24');
    //     await page.getByRole('textbox', { name: 'Doc. Title' }).fill('Citizenship');
    //     await page.setInputFiles('#GuardianFilesDoc', 'Upload/NEPALI_citizenship_image.jpg');

    // Document
    // await page.getByText('Document').click();
    await page.getByRole('tab', { name: 'Document' }).click();
    await page.locator('#DocFile').getByRole('combobox').selectOption('24');
    await page.getByRole('textbox', { name: 'Doc. Title' }).fill('nid cit');
    await page.setInputFiles('#FilesDoc', 'Upload/cit_passport_image.jpg');

    //Bank
    await page.getByRole('tab', { name: 'Bank' }).click();
    await page.locator('#bankDetails').getByRole('button', { name: '' }).click();
    await page.waitForTimeout(1000);
    await page.getByPlaceholder('Enter your keyword').fill('PRABHU BANK LIMITED');
    await page.getByPlaceholder('Enter your keyword').press('Enter');
    await page.waitForTimeout(1000);
    await page.getByRole('cell', { name: 'PRABHU BANK LIMITED' }).dblclick();
    await page.locator('#BankBranchName').fill(address);
    await page.locator('#BankAccountNo').fill(accountno);

    //final save

    await page.getByRole('button', { name: ' Save' }).click();
    await page.pause();
    //Confirm save
    await page.getByRole('button', { name: 'Confirm' }).click();
});
});