  const { test, expect } = require('@playwright/test');
  const {POManager}=require('../PageObjects/POManager');
  const testdata=JSON.parse(JSON.stringify(require('../PageObjects/TestData.json')));

  test('Regression_TC018_Comprehensiveclosure-Close company with liquidation', async ({ page }) => {
    
           //Maximize Browser
            await page.viewportSize(1536 );
            await page.viewportSize(835);
           
         
            //const additionalData=page.locator("UserCardExpiryDate");
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
            await companyListSearch.ListSearch(testdata.CP_ClosureWithLiquidation);
            await page.locator(".btn.btn-primary").click();

             //Handling popup
              // if(page.locator("button[class='swal2-confirm swal2-styled']").isVisible())
              // {
              //   await page.locator("button[class='swal2-confirm swal2-styled']").click();
              // }

      
            //Start the closure process
            await page.locator("#close-establishment").check();

            //Choose Liquidate only option
            await page.waitForTimeout(3000);
            await page.locator("#liquidate-only").check();
          
            //Select liquidation period 
            await page.waitForTimeout(1000);
            await page.locator(".form-control.ng-valid.ng-dirty.ng-touched").selectOption("1");

            //Wait and Click next
            await page.waitForTimeout(1000);
            await page.locator("button[class='bigbtn']").click();

            //Add liquidator details, select from company signatories
            await page.locator("label[for='SelectFromCompanySignatories'] h6").click();
            await page.waitForTimeout(2000);
            await page.locator("#signatoryRadio").check();
            await page.waitForTimeout(1000);
            await page.locator("button[class='bigbtn']").click();

          //Upload attachment Two
            await page.waitForTimeout(3000);
            // const counter=await attachment.count();
            // for(let i=0;i<counter;i++)
            // {
            //   attachment.nth(i);
            //   await page.locator("(//button[@id='fileUpload'])").setInputFiles("input[type='file']", 'Agreement.pdf');
            // }

            //Documents upload 
              let [fileChooser] = await Promise.all([
                page.waitForEvent('filechooser'),
                page.locator("(//button[@id='fileUpload'])[1]").click(),
              ]);
              await fileChooser.setFiles("tests/Attachments/Agreement2.pdf");
              await page.waitForTimeout(2000);

              const fileChooserPromise = page.waitForEvent('filechooser');
              await page.locator("(//button[@id='fileUpload'])[2]").click();
              const fileChooser3 = await fileChooserPromise;
              await fileChooser3.setFiles("tests/Attachments/Agreement3.pdf");
              await page.locator("button[class='bigbtn']").click();


            //Confirm all the request data is correct
            await page.waitForTimeout(4000);
            await page.locator("label[for='til']").click();

            // Submit the request
            await page.waitForTimeout(2000);
            await page.locator("//button[normalize-space()='Submit']").click();
            
            //wait until the list of entities load
            await page.waitForLoadState("networkidle");

              //Assertion to verify if the SR submitted successfully or not

            const message= await page.locator(".animated.fadeInDown.finishedMessage.ng-star-inserted").textContent();
            expect("The request has been submitted successfully", message);
            console.log("Appliction submitted message"+message);
          
  });