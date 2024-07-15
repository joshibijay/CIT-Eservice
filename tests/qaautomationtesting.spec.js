const { test, expect}=require('@playwright/test');

test('QAautomation using selectors and locators',async({page})=>{

    await page.goto('https://ultimateqa.com/automation');
   // await page.pause();// step by step playwright inspector
   // Login Automation------

   // finding the element using the text
    await page.getByText('Login automation').click();

    //finding the element using thje locator
    await page.locator('id=user[email]').fill('bijay@gmail.com');
    
    //finding the element using CSS Selector
    await page.getByPlaceholder('Password').fill('Bij@y124343');

    await page.pause();
    
    await page.locator('id=user[remember_me]').click();
    
    //using Xpath
    await page.locator('button.button').click();
    
    

});
