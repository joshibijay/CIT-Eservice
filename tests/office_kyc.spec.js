import { test, expect } from '@playwright/test';
import { login } from '../pages/login.js';
import { firstName, middlename, lastName, email, mobileno, address, telno, accountno, vatno, panno, identityno, formatted_Date } from '../pages/test';

test.beforeEach('Login and Navigate', async ({ page }) => {
    test.setTimeout(120000);
    await page.goto('http://10.10.11.14:1902/');
    const eservice_login = new login(page);
    
    await eservice_login.eservice_login('O001551', 'Pass"1234');
    
});

test('Office KYC', async ({ page }) => {
    test.setTimeout(120000);
    await test.step('Navigate to Office KYC Update', async () => {
        await page.getByText('Office KYC Update').click();
        console.log('✅ Navigation to Office KYC Update successful');
        
    });

    await test.step('Verify Office KYC Tabs', async () => {
        await expect(page.locator('#first-tab')).toContainText('Office');
        await expect(page.locator('#address-tab')).toContainText('Contact Person');
        await expect(page.locator('#office-address-tab')).toContainText('Address');
        await expect(page.locator('#document-tab')).toContainText('Documents');
        console.log('✅ All KYC tabs verified successfully');
    });

    await test.step('Verify Office Name Fields', async () => {
        const officeNameField = page.getByPlaceholder('Office Name', { exact: true });
        await expect(officeNameField).toBeVisible();
        await expect(officeNameField).not.toBeEditable();
        console.log('✅ Office Name field is read-only');
        await page.pause(); 
        const officeNameFieldloc = page.getByPlaceholder('Office Name (Local Language)');
        await expect(officeNameFieldloc).toBeEditable();

        if (!(await officeNameFieldloc.isVisible())) {
            await officeNameFieldloc.clear();
            await officeNameFieldloc.fill('परीक्षण');
        } else {
            await officeNameFieldloc.clear();
            await officeNameFieldloc.fill('परीक्षण कार्यालय नाम');
        }
        
        console.log('✅ Office Name local field is read-only');
      
    });

    await test.step('Verify Office Registration Date', async () => {
        const officeRegDateField = page.getByLabel('Office Registration Date');
        await expect.soft(officeRegDateField).toBeEmpty();
        console.log('✅ Office reg date is empty by default');

        if(officeRegDateField.isVisible()==true){
            await officeRegDateField.clear();
        
        await officeRegDateField.fill('1010/11/11');
        await officeRegDateField.press('Enter');
        console.log('❌ Invalid Date entered');

        await officeRegDateField.fill('2010/11/11');
        await officeRegDateField.press('Enter');
        console.log('✅ Valid Date entered successfully');}
        
        else{
            await officeRegDateField.fill('1010/11/11');
        await officeRegDateField.press('Enter');
        console.log('❌ Invalid Date entered');

        await officeRegDateField.fill('2010/11/11');
        await officeRegDateField.press('Enter');
        console.log('✅ Valid Date entered successfully');
        }
    });

    await test.step('Verify Business Nature Field', async () => {
        const businessNatureField = page.locator('#BusinessNature');
        await expect.soft(businessNatureField).toBeEmpty();
        if(businessNatureField.isVisible()==true){

            await businessNatureField.clear();
            await page.getByRole('button', { name: ' Save' }).click();
            await expect(page.locator('.jconfirm-content')).toContainText('Business Nature is required');
            console.log('❌ Business Nature field is required');
            await page.getByText('OK').click();
        }
        else{
            await page.getByRole('button', { name: ' Save' }).click();
            await expect(page.locator('.jconfirm-content')).toContainText('Business Nature is required');
            console.log('❌ Business Nature field is required');
            await page.getByText('OK').click(); 
        }
        await businessNatureField.fill('Test data');
    });

    await test.step('Verify PAN Number Field', async () => {
        const pannoField = page.locator('#PanNo');
        await expect.soft(pannoField).toBeEmpty();
        console.log('✅ PAN No is empty by default');

        // await page.getByRole('button', { name: ' Save' }).click();
        // await expect.soft(page.locator('#BusinessNature-error')).toContainText('This field is required');
        // console.log('❌ PAN No is required');

        await pannoField.pressSequentially(panno.slice(0, -1));
        await pannoField.press('Tab');
        await expect(page.getByText('This field must be at least 9 and at most 9 characters long')).toContainText('This field must be at least 9 and at most 9 characters long');

        // await pannoField.clear();
        // await pannoField.fill(panno + '1');
        // await pannoField.press('Tab');
        // await expect(page.locator('#PanNo-error')).toContainText('This field must be at least 9 and at most 9 characters long');

        await pannoField.clear();
        await pannoField.fill(panno);
    });
    await test.step('Verify PAN Registration Date', async () => {
        const panregdate = page.locator('#PanRegistrationDate');
        await expect.soft(panregdate).toBeEmpty();
        console.log('✅ PAN reg date is empty by default');

        // await page.getByRole('button', { name: ' Save' }).click();

        await panregdate.fill('0000/00/00');
        await panregdate.press('Tab');
      

        await panregdate.clear();
        await panregdate.fill('1998/01/01');
        await panregdate.press('Tab');
        await expect(panregdate).toBeVisible();
    });

    await test.step('Verify VAT Number Field', async () => {
        const checkvat = page.locator('#isVatRegister');
        await expect(checkvat).not.toBeChecked();
        // vat register to be disabled if the vat register is uncheck
        //await expect(VatNumfield).toBeDisabled();
        if(checkvat.uncheck==true){
            await expect(VatNumfield).isDisabled();
        }
        else{
        await checkvat.check();
        const VatNumfield = page.locator('#VatNo');
        await expect.soft(VatNumfield).toBeEmpty();
        console.log('✅ VAT No is empty by default');

        // await page.getByRole('button', { name: ' Save' }).click();
        // await expect.soft(page.locator('#BusinessNature-error')).toContainText('This field is required');
        // console.log('❌ VAT No field is required');

        await VatNumfield.fill(vatno.slice(0, -1));
        await VatNumfield.press('Tab');
        await expect(page.getByText('This field must be at least 9 and at most 9 characters long')).toContainText('This field must be at least 9 and at most 9 characters long');

        // await VatNumfield.clear();

        // await VatNumfield.fill(vatno.slice(0, +1));
        // await expect(page.locator('.field-validation-error').nth(3)).toContainText('This field must be at least 9 and at most 9 characters long');
        await VatNumfield.clear();
        await VatNumfield.fill(vatno);
        }
    });

   

    await test.step('Verify VAT Registration Date', async () => {
        const vatregdate = page.locator('#VatRegistrationDate');
        await expect.soft(vatregdate).toBeEmpty();
        console.log('✅ VAT reg date is empty by default');

        // await page.getByRole('button', { name: ' Save' }).click();
        await vatregdate.fill('0000/00/00');
        await vatregdate.press('Tab');
        await expect.soft(vatregdate).toBeEmpty();

        await vatregdate.clear();
        await vatregdate.fill('1998/01/01');
        await vatregdate.press('Tab');
        await expect(vatregdate).toBeVisible();
    });

    await test.step('Verify Registering Authority and Registration Number', async () => {
        const regauth = page.locator('#RegisteringAuthority');
        await expect.soft(regauth).toBeEmpty();
        // await page.getByRole('button', { name: ' Save' }).click();
        await regauth.fill('FCGO');
        await regauth.press('Tab');

        const regno = page.locator('#RegistrationNo');
        await expect.soft(regno).toBeEmpty();
        // await page.getByRole('button', { name: ' Save' }).click();
        await regno.fill(panno);
    });

    await test.step('Verify Default Country Name and Sector Selection', async () => {
        await expect(page.locator('#CountryName')).toHaveValue('Nepal');

        const button = page.locator('button[data-attr-sectorname="SectorName"]');
        await button.dblclick();
        await page.waitForTimeout(1500);
        await page.locator('td.pq-grid-cell[pq-col-indx="0"]').first().dblclick();
    });

    await test.step('Verify the Contact Person', async()=>{
        await page.locator('#address-tab').click();
        const contactname=page.locator('#ContactPersonName');
        //verify if the contact name is empty by default
        await expect.soft(contactname).toBeEmpty();
        console.log('Contact person is empty by default');
        //verify if the contact name is required
        await contactname.clear();
        await page.getByRole('button', { name: ' Save' }).click();;
        await expect(page.locator(".jconfirm-content div")).toContainText('Contact Person Name is required.');
        await page.getByText('OK').click();
        //verifu the contact name with valid data
        await contactname.fill(firstName +' ' + lastName);
    });

    await test.step('Verify the Contact Person Position', async()=>{
     
        const contactpost=page.locator('#ContactPersonPosition');
        //verify if the contact name is empty by default
        await expect.soft(contactpost).toBeEmpty();
        console.log('Contact person  post is empty by default');
        //verify if the contact name is required
        await contactpost.clear();
        await page.getByRole('button', { name: ' Save' }).click();
        await expect(page.locator(".jconfirm-content div")).toContainText('Contact Person Position is required.');
        await page.getByText('OK').click();
        //verifu the contact name with valid data
        await contactpost.fill('Engineer');
    });

    await test.step('Verify the Contact Person Email ID', async()=>{
     
        const contactemail=page.locator('#ContactPersonEmailId');
        //verify if the contact email is empty by default
        await expect.soft(contactemail).toBeEmpty();
        //verify if the contact email is required
        await contactemail.clear();
        await page.getByRole('button', { name: ' Save' }).click();
        await expect(page.locator(".jconfirm-content div")).toContainText('Contact Person Email is required.');
        await page.getByText('OK').click();
        //verify the contact email with invalid data
        await contactemail.pressSequentially('abcd');
        await expect(page.locator("#ContactPersonEmailId-error")).toContainText('Please enter a valid email');
        //verify the contact email with valid data
        await contactemail.fill(email);

    });

    await test.step('Verify the Contact Person tel no', async()=>{
     
        const contacttel=page.locator('#ContactPersonTelNo');
        //verify if the contact tel is empty by default
        await expect.soft(contacttel).toBeEmpty();
        //verify if the contact tel is required
        await contacttel.clear();
        await page.getByRole('button', { name: ' Save' }).click();
        await page.waitForTimeout(500);
        await expect(page.locator(".jconfirm-content div")).toContainText('Contact Person Tel. No. is required');
        await page.getByText('OK').click();
        //verify the contact tel with invalid data
        // await contacttel.pressSequentially(telno.slice(0,-7));
        // await expect.soft(page.locator("#ContactPersonTelNo-error ")).toContainText('This field must be at least 3 and at most 50 characters long.');
        await contacttel.clear();
        //verify the contact tel with valid data
        await contacttel.fill(telno);

    });
    
    await test.step('Verify the Contact Person mobile no', async()=>{
     
        const contactmob=page.locator('#ContactPersonMobileNo');
        //verify if the contact mobile is empty by default
        await expect.soft(contactmob).toBeEmpty();
        //verify if the contact tel is required
        await contactmob.clear();
        await page.getByRole('button', { name: ' Save' }).click();
        await expect(page.locator(".jconfirm-content div")).toContainText('Contact Person Mobile No. is required.');
        await page.getByText('OK').click();
        //verify the contact tel with invalid data
        await contactmob.pressSequentially(mobileno.slice(0,-1));
        await expect.soft(page.locator(".field-validation-error ")).toContainText('Please enter a valid phone number');
        await contactmob.clear();
        //verify the contact tel with valid data
        await contactmob.fill(mobileno);

    });

    await test.step('Verify the Address-state', async()=>{
     await page.locator('#office-address-tab').click();
        const state=page.locator('#StateName');
        //verify if the state is empty by default
        await expect.soft(state).toBeEmpty();
        //verify if the state is required
        await page.getByRole('button', { name: ' Save' }).click();
        await expect.soft(page.locator(".jconfirm-content div")).toContainText('state is required.');
        await page.getByText('OK').click();
        //verify using the valid data
        await page.getByRole('button', { name: '' }).first().click();
        await page.waitForTimeout(1500);
        await page.locator('td.pq-grid-cell[pq-col-indx="0"]').first().dblclick();
    });

    await test.step('Verify the Address-District', async()=>{
           const district=page.locator('#DistrictName');
           //verify if the state is empty by default
           await expect.soft(district).toBeEmpty();
           //verify if the state is required
           await page.getByRole('button', { name: ' Save' }).click();
           await expect.soft(page.getByText('.jconfirm-content div')).toContainText('District name is required.');
           await page.getByText('OK').click();
           //verify using the valid data
           await page.getByRole('button', { name: '' }).nth(1).click();
           await page.waitForTimeout(1500);
           await page.locator('td.pq-grid-cell[pq-col-indx="0"]').first().dblclick();
       });
       await test.step('Verify the Address-Local Body', async()=>{
        const localbody=page.locator('#LocalBodyName');
        //verify if the state is empty by default
        await expect.soft(localbody).toBeEmpty();
        //verify if the state is required
        // await page.getByRole('button', { name: ' Save' }).click();
        // await expect(page.getByText('LocaLBody is required.')).toContainText('LocaLBody is required.');
        // await page.getByText('OK').click();
        //verify using the valid data
        await page.getByRole('button', { name: '' }).nth(2).click();
        await page.waitForTimeout(1500);
        await page.locator('td.pq-grid-cell[pq-col-indx="0"]').first().dblclick();
    });


    await test.step('Verify the office tel no', async()=>{
     
        const officetel=page.getByPlaceholder('officephone');
        //verify if the office tel is empty by default
        await expect.soft(officetel).toBeEmpty();
        //verify if the office tel is required
        await officetel.clear();
        await page.getByRole('button', { name: ' Save' }).click();
        await expect(page.getByText('officephone is required.')).toContainText('officephone is required.');
        await page.getByText('OK').click();
        //verify the office tel with invalid data
        // await officetel.fill(telno.slice(0,-1));
        // await expect(page.locator(".field-validation-error ")).toContainText('Please enter a valid number');
        //verify the contact tel with valid data
        await officetel.fill(telno);
        await page.getByPlaceholder('website').fill(email);
    });

    

    await test.step('Verify the office tol name', async()=>{
     
        const officetol=page.getByPlaceholder('Tole Name');
        //verify if the office tol is empty by default
        await expect.soft(officetol).toBeEmpty();
        //verify if the office tel is required
        await officetol.clear();
        await page.getByRole('button', { name: ' Save' }).click();
        await expect(page.locator('.jconfirm-content div')).toContainText('Tole Name is required.');
        await page.getByText('OK').click();
        //verify the office tel with invalid data
        // await officetel.fill(telno.slice(0,-1));
        // await expect(page.locator(".field-validation-error ")).toContainText('Please enter a valid number');
        //verify the contact tel with valid data
        await officetol.fill(address);
     
    });

    await test.step('Verify the ward name', async()=>{
    
        const officeward=page.locator('#WardNo');
        //verify if the ward is empty by default
       // Retrieve the value of the officeward field
const officewardValue = await officeward.inputValue();

// Check if the field is empty
if (officewardValue.trim() === '') {
    await page.getByRole('button', { name: ' Save' }).click();
    await expect.soft(page.locator('.jconfirm-content div')).toContainText('Ward No is required.');
    await page.getByText('OK').click();
} else {
    
    await officeward.clear();
    await officeward.fill('12');
}
        
     
 
        //verify the office tel with invalid data
        // await officetel.fill(telno.slice(0,-1));
        // await expect(page.locator(".field-validation-error ")).toContainText('Please enter a valid number');
        //verify the contact tel with valid data
       
    });


    await test.step('Verify the office Email ID', async()=>{
     
        const officeemail=page.locator('#EmailId');
        //verify if the contact email is empty by default
        await expect.soft(officeemail).toBeEmpty();
        //verify if the contact email is required
        await officeemail.clear();
        await page.getByRole('button', { name: ' Save' }).click();
        await expect(page.locator('.jconfirm-content div')).toContainText('Email is required');
        await page.getByText('OK').click();
        await officeemail.clear();
        //verify the contact email with invalid data
        await officeemail.pressSequentially('abcd');
        await expect(page.getByText('Please enter a valid email')).toContainText('Please enter a valid email');
        await officeemail.clear();
        //verify the contact email with valid data
        await officeemail.fill(email);

    });

    await test.step('Verify the documents',async()=>{
await page.locator('#document-tab').click();
await page.pause();
//verify if the dropdown is empty by default
await page.getByRole('combobox').selectOption('18');
await expect.soft(page.locator('input[name="DocTitle"]')).toBeEmpty();
await page.locator('input[name="DocTitle"]').fill('docs');
await page.setInputFiles('#FilesDoc','Upload/NEPALI_citizenship_image.jpg');
    });

    await test.step('Verify the declaration part',async()=>{
const declare=page.locator('#declaration');
await expect(declare).not.toBeChecked();
//verify if the declaration is mandatory
await page.getByRole('button', { name: ' Save' }).click();
await expect(page.locator('.jconfirm-content div')).toContainText('Please confirm your authorization by checking the declaration box');
await page.getByText('OK').click();
await declare.check();
await page.getByRole('button', { name: ' Save' }).click();
await page.getByRole('button', { name: 'Confirm' }).click();
    });

    await test.step('Verify the KYC status',async()=>{
        await page.reload();
await page.getByText('Office KYC Update').click();
await expect(page.getByRole('button', { name: ' Save' })).toBeHidden();


    });
});
