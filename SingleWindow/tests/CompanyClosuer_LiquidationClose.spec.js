const { test, expect } = require('@playwright/test');
const {POManager}=require('../PageObjects/POManager');

test('Company Closure_Liquidate And Close', async ({ page }) => {
  
      //Maximize Browser
        await page.viewportSize(1536 );
        await page.viewportSize(835);
        const username="27063400056";
        const password="Sw123456A";
        const CR="40000458";
        const additionalData=page.locator("UserCardExpiryDate");
        const signButton=page.locator("input[value='Continue']");
        const continueButton=page.locator("button[name='submitButton']");
        const poManager= new POManager(page);

        //Login access
        const loginpage= poManager.getLoginPage();
        await loginpage.goto();
       await loginpage.validLogin(username,password );
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
      await companyListSearch.ListSearch(CR);
      await page.locator(".btn.btn-primary").click();
      
        //Handling popup
        if(page.locator("button[class='swal2-confirm swal2-styled']").isVisible())
        {
          await page.locator("button[class='swal2-confirm swal2-styled']").click();
        }

      
      //await page.on('dialog', dialog=> dialog.accept());

      //Start the closure process
      await page.locator("#close-establishment").check();

      //Choose Liquidate only option
      await page.waitForTimeout(3000);
      await page.locator("label[for='liquidate-and-close'] h5[class='mb-2']").check();
    
      //Select liquidation period 
      await page.waitForTimeout(3000);
     //await page.locator(".form-control.ng-valid.ng-dirty.ng-touched").selectOption({index:2});
          //Wait and Click next
          await page.waitForTimeout(1000);
          await page.locator("button[class='bigbtn']").click();

      //Add liquidator details, select from company signatories
      await page.locator("label[for='SelectFromCompanySignatories'] h6").click();
      await page.waitForTimeout(2000);
      await page.locator("#signatoryRadio").check();
      await page.waitForTimeout(1000);
      await page.locator("button[class='bigbtn']").click();

      //Upload attachment One
      await page.locator("(//button[@id='fileUpload'])[1]").click();
      await page.setInputFiles("input[type='file']", 'Dec.pdf');

    //Upload attachment Two
      await page.waitForTimeout(3000);
      await page.locator("(//button[@id='fileUpload'])[2]").click();
      await page.setInputFiles("input[type='file']", 'Agreement.pdf');
      await page.waitForTimeout(2000);
      await page.locator("button[class='bigbtn']").click();

      //Confirm all the request data is correct
      await page.waitForTimeout(4000);
      await page.locator("label[for='til']").click();

      // Submit the request
      await page.waitForTimeout(2000);
      await page.locator("//button[normalize-space()='Submit']").click();
      
      //wait until the list of entities load
      await page.waitForLoadState("networkidle");
        // //Assertion

    const message= await page.locator(".animated.fadeInDown.finishedMessage.ng-star-inserted").textContent();
    const SR= message.split(1);
    console.log("SR number"+SR);

      expect("The request has been submitted successfully", message);
        
});