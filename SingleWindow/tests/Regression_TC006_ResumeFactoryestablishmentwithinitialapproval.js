import { test, expect } from '@playwright/test';
const {POManager}=require('../PageObjects/POManager');
const testdata=JSON.parse(JSON.stringify(require('../PageObjects/TestData.json')));

test('Regression_TC006_ResumeFactoryestablishment with initialapproval', async ({ page }) => {

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
       await page.locator("(//a[@class='nav-link'])[6]").click();
       await page.waitForTimeout(2000);
       await page.locator("//a[normalize-space()='Services']").click();
       await page.waitForTimeout(2000);
       await page.getByText('Resume Factory Establishment').click();
       await page.getByText('Start the service ( Resume Factory Establishment )').click();
       

      //Start Resume Factory establishment 
      // Factory search list
       await page.getByPlaceholder('Search').click();
       await page.getByPlaceholder('Search').fill(testdata.ResumeFactory);
       await page.getByRole('row', { name: 'faktwry for metal goods manufacturing فاكتوري لصناعة المنتجات المعدنية 40000555 Resume Factory Establishment' }).getByRole('button').click();
       //Applicant Info
       await page.getByText('Next').click();
       //Identification Documents Updates
       await page.getByRole('textbox').click();
       await page.getByRole('button', { name: '2023' }).click();
       await page.getByText('2027').click();
       await page.getByText('December').click();
       await page.getByText('12', { exact: true }).click();
       await page.getByText('Next').click();
        //Approvals 
        await page.getByRole('checkbox').check();
        await page.getByPlaceholder('Approval No').click();
        await page.getByPlaceholder('Approval No').fill('5555');
        await page.getByRole('textbox').nth(1).click();
        await page.getByText('2', { exact: true }).first().click();
        await page.getByRole('textbox').nth(2).click();
        await page.getByText('25').click();
        await page.getByText('Next').click();
        
       await page.waitForTimeout(2000);
       //Upload Documents 
       
       const fileChooserPromise10 = page.waitForEvent('filechooser');
       await page.locator("(//button[@id='fileUpload'])[1]").click();
       const fileChooser1 = await fileChooserPromise10;
       await fileChooser1.setFiles("tests/Attachments/Agreement2.pdf");
       await page.getByText('Next').click();

       //Agree on term and condition, submit
       await page.getByText('I have verified and confirmed the form data.').click();
       await page.locator("//a[normalize-space()='Submit']").click();

       //Assertion to verify the SR submitted successfully
      // await page.waitForTimeout(2000);
       const message= await page.locator(".animated.fadeInDown.finishedMessage.ng-star-inserted").textContent();
       expect("The request has been submitted successfully", message);
       //Print the result
       console.log("Appliction submitted message"+message);
});