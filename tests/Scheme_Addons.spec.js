const{test,expect}=require('@playwright/test');
import { login } from '../pages/login';


  test.only('Scheme Addons-Create',async({page})=>{
    test.setTimeout(12000000);
    await page.goto('http://172.31.1.13:1902/', { timeout: 100000 });
    const eservice_login = new login(page);
    await eservice_login.eservice_login('O058555', 'P@ss123');
    await page.pause();
    await page.getByText('Scheme Addons').click();
    await page.waitForTimeout(1000);
    await page.getByRole('link', { name: 'Create' }).click();
    await page.locator('#AcGroupCode').fill('KBB');
    await page.locator('#AcGroupCode').press('Enter');
    await page.locator('#CustomerCode').fill('0010187318');
    await page.locator('#CustomerCode').press('Enter');
    await page.waitForTimeout(1000);
    await page.getByRole('button', { name: ' Save' }).click();
  });

  test('Scheme Addons-core-acknowledgement',async({page})=>{
    test.setTimeout(12000000);
    await page.goto('http://172.31.1.13:1901/', { timeout: 100000 });
    const eservice_login = new login(page);
    await eservice_login.eservice_login('bhupendra', 'Pass@123');
    await page.getByText('Portal').click();
    await page.getByPlaceholder('Search Input').pressSequentially('Scheme Addons Acknowledgement');
    await page.getByRole('link', { name: 'Scheme Addons Acknowledgement' }).click();
    await page.waitForTimeout(1000);
  
    });

    test('Scheme Addons-core-rejected',async({page})=>{
      test.setTimeout(12000000);
      await page.goto('http://172.31.1.13:1901/', { timeout: 100000 });
      const eservice_login = new login(page);
      await eservice_login.eservice_login('bhupendra', 'Pass@123');
      await page.getByText('Portal').click();
      await page.getByPlaceholder('Search Input').pressSequentially('Scheme Addons Acknowledgement');
      await page.getByRole('link', { name: 'Scheme Addons Acknowledgement' }).click();
      await page.waitForTimeout(1000);
    
      });