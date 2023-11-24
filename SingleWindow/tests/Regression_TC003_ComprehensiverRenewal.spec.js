import { test, expect } from '@playwright/test';
const {POManager}=require('../PageObjects/POManager');
const testdata=JSON.parse(JSON.stringify(require('../PageObjects/TestData.json')));

test('Regression_TC003_ComprehensiverRenewal', async ({ browser }) => {

       //Maximize Browser
       const context = await browser.newContext();
       const page = await context.newPage();
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
        await page.locator("(//a[@class='nav-link'])[6]").click();
        await page.waitForTimeout(2000);
        await page.locator("//a[normalize-space()='Services']").click();
        await page.waitForTimeout(2000);
        await page.locator("//a[@id='Comprehensive Renewal']").click();
        await page.locator("#startapplication").click();

       //Renewal
        await page.getByPlaceholder('Search').click();
        //await page.getByPlaceholder('Search').click();
        await page.getByPlaceholder('Search').fill(testdata.CompRenewal);
        await page.getByRole('button', { name: ' Renew' }).click();
         //Handling popup
          // if(page.locator("button[class='swal2-confirm swal2-styled']").isVisible())
          // {
          //   await page.locator("button[class='swal2-confirm swal2-styled']").click();
          // }
        await page.getByRole('combobox').selectOption('1');
      // await page.locator("//*[@id='layoutContainers']/div/div[2]/div[1]/div/section/div[2]/app-root/app-renew-establish-wizard/div/main/div/div[2]/div[2]/div/div/div/app-company-permits-table/div/div/div[1]/table/tbody/tr/td[7]/input").click();
        await page.getByRole('row', { name: 'Commercial Registration Active 07/09/2022 06/09/2024	40000093' }).getByRole('checkbox').check();
        await page.getByRole('button', { name: 'Next' }).click();
      //Confirm Batches
        await page.getByRole('button', { name: 'Confirm Batches' }).click();
        await page.waitForTimeout(2000);
        await page.getByText('I hereby confirm that the information provided herein is accurate, correct and c').click();
        await page.waitForTimeout(2000);
        await page.getByRole('button', { name: 'Submit' }).click();

        //Assertion to verify the SR submitted successfully
         await page.waitForTimeout(2000);
        const message= await page.locator(".animated.fadeInDown.finishedMessage").textContent();
        expect("The request has been submitted successfully", message);
        //Print the result
        console.log("Appliction submitted message"+message);
        await page.waitForTimeout(2000);
        // Pay the renewal application and completing the process
        const SubmittedSR= message.split("is");
        const SR=SubmittedSR[1].split("]")[0];
        const SRNo= SR.split("[")[1];
        // Waiting until the system convert the status to under payment
        await page.waitForTimeout(90000);
      
        //Login access
            await page.goto("https://stgcounter.sw.gov.qa/");
            await continueButton.click();

        //Starting payment process    
           await page.locator("#requestNumber").fill(SRNo);
           await page.locator("#submitBtn").click();

       //Handling new page- Request tasks
          const pagePromise = context.waitForEvent('page');
          await page.locator(".ng-binding[target='_blank']").click();
          const newPage = await pagePromise;
          await newPage.getByRole('link', { name: 'Pay' }).click();
          await newPage.getByRole('button', { name: 'Pay Online' }).click();

        //fill payment details
        await newPage.getByLabel('First Name *').click();
        await newPage.getByLabel('First Name *').fill('Anas');
        await newPage.getByLabel('Last Name *').click();
        await newPage.getByLabel('Last Name *').fill('Satti');
        await newPage.getByLabel('Address Line 1 *').click();
        await newPage.getByLabel('Address Line 1 *').fill('Qatar');
        await newPage.getByLabel('City *').click();
        await newPage.getByLabel('City *').fill('Doha');
        await newPage.getByLabel('Country/Region *').selectOption('QA');
        await newPage.getByLabel('Phone Number *').click();
        await newPage.getByLabel('Phone Number *').fill('97450303262');
        await newPage.getByLabel('Email *').click();
        await newPage.getByLabel('Email *').fill('asatti@malomatia.com');
        await newPage.getByLabel('Mastercard').check();
        await newPage.getByLabel('Card Number *').click();
        await newPage.getByLabel('Card Number *').fill('2222400060000007');
        await newPage.getByLabel('Expiration Month *').selectOption('03');
        await newPage.getByLabel('Expiration Year *').selectOption('2030');
        await newPage.getByLabel('CVN *').click();
        await newPage.getByLabel('CVN *').fill('737');
        await newPage.getByRole('button', { name: 'Pay' }).click();

      //Assertion- successfully cancelled
       const successMessage= await newPage.getByText('Success! Payment completed successfully. You can download your receipt and certi').textContent();
       expect("Success! Payment completed successfully", successMessage);
       console.log("Regression_TC003_ComprehensiverRenewal has been completed successfully, See you in the next release")
          
  

});