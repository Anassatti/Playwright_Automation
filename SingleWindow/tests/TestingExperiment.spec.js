
const {POManager}=require('../PageObjects/POManager');
const testdata=JSON.parse(JSON.stringify(require('../PageObjects/TestData.json')));
const { test, expect } = require('@playwright/test');

test('Testing', async({browser})=>{
    const context = await browser.newContext();
 const page = await context.newPage();
  await page.viewportSize(1536 );
  await page.viewportSize(835);
  const SRNo="SR042307";
  const poManager= new POManager(page);
  const signButton=page.locator("input[value='Continue']");
  const continueButton=page.locator("button[name='submitButton']");

  const loginpage= poManager.getLoginPage();
  await page.goto("https://stginvestor.sw.gov.qa/");
  //await page.locator("#loginLink").click
  await loginpage.validLogin(testdata.username,testdata.password);
  await signButton.click();
  await continueButton.click();

  //Open Manage menu
  await page.locator("(//a[@class='nav-link'])[6]").click();
  await page.locator("input[placeholder='Filter By Request Id']").click();
  await page.locator("input[placeholder='Filter By Request Id']").fill(SRNo);
  await page.locator('.btn').first().click();
  
        //Submit Comprehensive Update request------------------------------------------------------------
        await page.locator(".btn.btn-info.white.mt-2.mb-3").click();

        const pagePromise = context.waitForEvent('page');
        
        const Newpage = await pagePromise;
        await Newpage.getByLabel('Partners / Capital amount').check();
       
        await page.waitForTimeout(2000);

        //Confirm 
        await Newpage.getByRole('button', { name: 'Confirm Updates' }).click();
       // await page.waitForTimeout(2000);
     


        //Confirm Entity Legal Type
        await Newpage.getByRole('button', { name: 'Confirm' }).click();
        await page.waitForTimeout(2000);

        //Update partner
        await Newpage.getByRole('button', { name: 'Confirm' }).click();
       
        await Newpage.locator("button[class='swal2-confirm swal2-styled']").click();
        await page.waitForTimeout(2000);
        await Newpage.locator("(//i[@class='icon-edit grey'])[2]").click();
        await page.waitForTimeout(2000);
        await Newpage.locator("//button[normalize-space()='Get Person Details']").click();
        await Newpage.locator("div[class='modal-footer'] button[type='button']").click()
        await Newpage.getByRole('button', { name: 'Confirm' }).click();
       // await page.waitForTimeout(2000);
       //  await Newpage.getByRole('button', { name: 'Confirm' }).click();
       await page.waitForTimeout(3000);

        //Confirm Update Business Activities
   
        await Newpage.getByRole('button', { name: 'Confirm' }).click();
       await page.waitForTimeout(3000);

       //Confirm Update Trade Name
       await Newpage.getByRole('button', { name: 'Confirm' }).dblclick();
      

       //Signatories / Managers
       await page.waitForTimeout(3000);
       await Newpage.getByRole('button', { name: 'Confirm' }).click();
       //Financial
       await Newpage.locator("input[type='checkbox']").click();
       await page.waitForTimeout(2000);

    //    await Newpage.locator('div').filter({ hasText: /^Capital Total \(QAR\) \*$/ }).first().click();
    //    await Newpage.getByPlaceholder('Please Enter the Capital Total in QAR').dblc
       await Newpage.getByPlaceholder('Please Enter the Capital Total in QAR').fill('1000');
       //await Newpage.getByPlaceholder('Please Enter the Cash Total Shares').click();
       await Newpage.getByPlaceholder('Please Enter the Cash Total Shares').fill('100');
      // await Newpage.getByRole('row', { name: 'Single Window btsstesp 0 0' }).getByRole('textbox').first().click();
       await Newpage.getByRole('row', { name: 'Single Window btsstesp 0 0' }).getByRole('textbox').first().fill('20');
      // await Newpage.getByRole('row', { name: 'Test British 0 0' }).getByRole('textbox').first().click();
       await Newpage.getByRole('row', { name: 'Test British 0 0' }).getByRole('textbox').first().fill('20');
      // await Newpage.getByRole('row', { name: 'ABDULLA A.RAHMAN AL-HAMAD 0 0' }).getByRole('textbox').first().click();
       await Newpage.getByRole('row', { name: 'ABDULLA A.RAHMAN AL-HAMAD 0 0' }).getByRole('textbox').first().fill('60');
  
      
       await Newpage.getByRole('button', { name: 'Confirm' }).click();
       await page.waitForTimeout(2000);
       //Contract Terms
       await Newpage.getByRole('button', { name: 'Confirm' }).click();
      

       //Upload documents
       //Attachment 1
       let [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        page.locator("(//button[@id='fileUpload'])[1]").click(),
      ]);
      await fileChooser.setFiles("tests/Attachments/Agreement2.pdf");
      await page.waitForTimeout(2000);


       //Attachment 2
       let [fileChooser2] = await Promise.all([
        page.waitForEvent('filechooser'),
        page.locator("(//button[@id='fileUpload'])[2]").click(),
      ]);
      await fileChooser2.setFiles("tests/Attachments/Agreement.pdf");
      await page.waitForTimeout(2000);

       await Newpage.getByRole('button', { name: 'Next' }).click();
       //Submit Update request

         // Accept terms/Submit the application
         //await page.getByText('I hereby confirm that the information provided herein is accurate, correct and c').click();
         await Newpage.locator("label[for='til']").click();
         await page.waitForTimeout(2000);
         await Newpage.getByRole('button', { name: 'Submit' }).click();
         await page.waitForTimeout(2000);

          //Assertion to verify the SR submitted successfully
       const comphreUpdate_Message= await Newpage.locator(".animated.fadeInDown.finishedMessage").textContent();
       expect("The request has been submitted successfully", comphreUpdate_Message);
       //Print the result
});