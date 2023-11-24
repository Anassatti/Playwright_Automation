const { test, expect } = require('@playwright/test');
const {POManager}=require('../PageObjects/POManager');
const testdata=JSON.parse(JSON.stringify(require('../PageObjects/TestData.json')));

test('Regression_TC025_Comprehensive closure-Close Establishment', async ({ page }) => {
    
     //Maximize Browser
        await page.viewportSize(1536 );
        await page.viewportSize(835);
        

        //login page data/controls
        const signButton=page.locator("input[value='Continue']");
        const continueButton=page.locator("button[name='submitButton']");
        const poManager= new POManager(page);

         //Login access
         const loginpage= poManager.getLoginPage();
         await loginpage.goto();
         await loginpage.validLogin(testdata.username,testdata.password);
         await signButton.click();
         await continueButton.click();

        //Add company closure
        await page.locator("(//a[@class='nav-link'])[6]").click();;
        await page.locator("//a[normalize-space()='Services']").click();
        await page.locator("//a[@id='Company Closure']").click();
        await page.locator("#startapplication").click();
      
         //wait until the list of entities load
        await page.waitForLoadState("networkidle");
        //search in company list
        const companyListSearch= poManager.getCompanySearch();
        await companyListSearch.ListSearch(testdata.CP_Closure);
        await page.locator(".btn.btn-primary").click();
        await page.waitForTimeout(2000);

          //Handling popup
          if(page.locator("button[class='swal2-confirm swal2-styled']").isVisible())
          {
            await page.locator("button[class='swal2-confirm swal2-styled']").click();
          }
       
        //await page.on('dialog', dialog=> dialog.accept());

        //Start the closure process
        await page.locator("#close-establishment").click();
        await page.waitForTimeout(2000);
        await page.locator(".bigbtn").click();
        await page.locator("button[class='bigbtn']").click();

        //Upload attachment One
         await page.locator("(//button[@id='fileUpload'])[1]").click();
         await page.setInputFiles("input[type='file']", 'tests/Attachments/Agreement3.pdf');
    
         //Upload attachment Two
          await page.waitForTimeout(3000);
          await page.locator("(//button[@id='fileUpload'])[2]");
          await page.setInputFiles("input[type='file']", 'tests/Attachments/Agreement4.pdf');

          await page.waitForTimeout(2000);
          await page.locator("button[class='bigbtn']").click();
        //Confirm all the request data is correct
          await page.waitForTimeout(2000);
          await page.locator("label[for='til']").click();
          await page.waitForTimeout(2000);
        // Submit the request
          await page.locator("//button[normalize-space()='Submit']").click();
          await page.waitForTimeout(3000);


         //Assertion to verify the SR submitted successfully
        const message= await page.locator("//*[@id='resultBox']/p").textContent();
        const SR= message.split(3);
        console.log("SR number"+SR);
        expect("The request has been submitted successfully", message);
        //Print the result
        console.log("Appliction submitted message"+message);
          
});