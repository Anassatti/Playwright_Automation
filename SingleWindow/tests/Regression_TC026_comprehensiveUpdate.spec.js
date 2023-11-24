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

        //Start Comprehensive Update
        await page.locator("(//a[@class='nav-link'])[6]").click();;
        await page.locator("//a[normalize-space()='Services']").click();
        await page.locator("//a[@id='Comprehensive Update ']").click();
        await page.locator("#startapplication").click();

         //search in company list
         const companyListSearch= poManager.getCompanySearch();
         await companyListSearch.ListSearch(testdata.ComprehensiveUpdate_CP);
         await page.locator(".btn.btn-primary").click();
         await page.waitForTimeout(2000);

         //Updates responsible manager
         await page.locator("#updateResponsibleManager").click();
         await page.waitForTimeout(3000);
         //Confirm
         await page.getByRole('button', { name: 'Confirm' }).click();
        // await page.waitForTimeout(3000);

         //Confirm Entity Legal Type
         await page.waitForTimeout(2000);
         await page.getByRole('button', { name: 'Confirm' }).click();
         await page.waitForTimeout(2000);

         //Confirm Update Business Activities
      await page.waitForTimeout(2000);
         await page.getByRole('button', { name: 'Confirm' }).click();
        await page.waitForTimeout(2000);

        //Confirm Update Trade Name
        await page.getByRole('button', { name: 'Confirm' }).click();
        await page.waitForTimeout(2000);

        //Update Responsible Manager 
        await page.getByRole('textbox').first().click();
        await page.getByRole('textbox').first().clear();
       await page.getByRole('textbox').first().fill('27063400908');

      //  await page.locator("input[class='form-control mb-3']").click();
      //  await page.getByRole('button', { name: '2030' }).click();
      //  await page.getByText('February').click();
      //  await page.getByText('2', { exact: true }).first().click();
      await page.getByRole('button', { name: 'Get Person Details' }).click();

        await page.waitForTimeout(2000);
        await page.locator("#phone").fill("50303262");
        await page.waitForTimeout(1000);
        await page.locator("input[type='email']").fill("asatti@malomatia.com");
        await page.locator("button[class='bigbtn']").click();

        //Approvals
        // await page.locator("input[placeholder='Approval No']").fill("66889922");
        // await page.getByRole('textbox').nth(1).click();
        // await page.getByText('2').first().click();
        // await page.getByRole('textbox').nth(2).click();
        // await page.getByText('20', { exact: true }).click();
        await page.getByRole('button', { name: 'Next' }).click();

        //Upload Documents
        let [fileChooser] = await Promise.all([
            page.waitForEvent('filechooser'),
            page.locator("(//button[@id='fileUpload'])[1]").click(),
          ]);
          await fileChooser.setFiles("tests/Attachments/Agreement2.pdf");
          await page.waitForTimeout(2000);
        
          // const fileChooserPromise = page.waitForEvent('filechooser');
          // await page.locator("(//button[@id='fileUpload'])[2]").click();
          // const fileChooser3 = await fileChooserPromise;
          // await fileChooser3.setFiles("tests/Attachments/Agreement3.pdf");
          await page.locator("button[class='bigbtn']").click();
          //await page.waitForTimeout(2000);

          // Accept terms/Submit the application
          //await page.getByText('I hereby confirm that the information provided herein is accurate, correct and c').click();
          await page.locator("label[for='til']").click();
          await page.waitForTimeout(2000);
          await page.getByRole('button', { name: 'Submit' }).click();
          await page.waitForTimeout(2000);

           //Assertion to verify the SR submitted successfully
        const message= await page.locator(".animated.fadeInDown.finishedMessage.ng-star-inserted").textContent();
        expect("The request has been submitted successfully", message);
        //Print the result

        console.log("Appliction submitted message"+message);

});