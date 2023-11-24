const { test, expect } = require('@playwright/test');
const {POManager}=require('../PageObjects/POManager');
const testdata=JSON.parse(JSON.stringify(require('../PageObjects/TestData.json')));


test('Regression_TC030_Split-up', async ({ browser }) => {
//Maximize Browser
 const context = await browser.newContext();
 const page = await context.newPage();
  await page.viewportSize(1536 );
  await page.viewportSize(835);


  //const additionalData=page.locator("#UserCardExpiryDate");
  const signButton=page.locator("input[value='Continue']");
  const continueButton=page.locator("button[name='submitButton']");
  const poManager= new POManager(page);

  //Login access
  const loginpage= poManager.getLoginPage();
  await page.goto("https://stgcounter.sw.gov.qa/");
  await loginpage.validLogin(testdata.username,testdata.password);
  await signButton.click();
  await continueButton.click();
  await page.waitForTimeout(3000);
  // await additionalData.fill("17/06/2024");
  // await continueButton.click();

  //Start Split up service
  await page.getByRole('link', { name: 'Start Request' }).click();
  await page.locator('#QID').click();
  await page.locator('#QID').fill('27063400056');
  await page.locator('#expiryDate').click();
  await page.getByLabel('Select year').selectOption('2025');
  await page.locator("select[aria-label='Select month']").selectOption("Jan");
  await page.getByRole('link', { name: '1', exact: true }).click();
  await page.locator('#service').selectOption('split/list');
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();

   //search in company list
   const companyListSearch= poManager.getCompanySearch();
   await companyListSearch.ListSearch(testdata.SplitUP_CP);
   await page.locator(".btn.btn-primary").click();
   await page.waitForTimeout(2000);

  //await page.getByRole('row', { name: 'test single name counter TM Main WLL Owned by One Person 40000092 60000126 Start' }).getByRole('button').click();
  await page.getByLabel('Yes').check();
  await page.waitForTimeout(2000);
  await page.getByLabel('Entity Legal Type *').selectOption('1510002');
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('1000');
  await page.getByRole('button', { name: 'Add Company' }).click();
  await page.getByRole('button', { name: 'Next' }).click();

 
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

const fileChooserPromise1 = page.waitForEvent('filechooser');
await page.locator("(//button[@id='fileUpload'])[3]").click();
const fileChooser4 = await fileChooserPromise1;
await fileChooser4.setFiles("tests/Attachments/Agreement4.pdf");

const fileChooserPromise3 = page.waitForEvent('filechooser');
await page.locator("(//button[@id='fileUpload'])[4]").click();
const fileChooser5 = await fileChooserPromise3;
await fileChooser5.setFiles("tests/Attachments/Agreement.pdf");

const fileChooserPromise4 = page.waitForEvent('filechooser');
await page.locator("(//button[@id='fileUpload'])[5]").click();
const fileChooser6 = await fileChooserPromise4;
await fileChooser6.setFiles("tests/Attachments/Dec.pdf");
        
await page.getByRole('button', { name: 'Next' }).click();

const fileChooserPromise5 = page.waitForEvent('filechooser');

//Attach summary document
await page.locator('#summaryAttachment').click();
const fileChooser7 = await fileChooserPromise5;
await fileChooser7.setFiles("tests/Attachments/Dec2.pdf");

  //Summary attachment
  let [fileChooserSplit] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.locator("//input[@id='summaryAttachment']").click(),
  ]);
  await fileChooserSplit.setFiles(['tests/Attachments/Agreement.pdf']);
// Confirm the terms// Submit the request
 

 
  await page.waitForTimeout(2000);
  await page.getByText('I hereby confirm that the information provided herein is accurate, correct and c').click();
  await page.getByRole('button', { name: 'Submit' }).click();

   //Assertion to verify the SR submitted successfully
   const message= await page.locator(".animated.fadeInDown.finishedMessage").textContent();
   expect("The request has been submitted successfully", message);
   //Print confirmation message
   console.log("Appliction submitted successfully:"+message);
   //Extract SR number from confirmation successful message
   await page.waitForTimeout(2000);
   // Pay the renewal application and completing the process
   const SubmittedSR= message.split("is");
   const SR=SubmittedSR[1].split("]")[0];
   const SRNo= SR.split("[")[1];


    // Start approval process- Approval portal--------------------------------------------

    await page.goto('https://stgap.sw.gov.qa/');
    await page.getByRole('link', { name: 'Login' }).click();
    await continueButton.click();
    // Waiting untill next aproval step upload
   await page.waitForTimeout(30000);
   
    //Split Review - MoCI CA Manager------------------------------------------------------
    await page.getByRole('button', { name: 'MOCI-CA-EMP' }).click();
    await page.locator('.form-filter').first().click();
    await page.locator('.form-filter').first().fill(SRNo);
    await page.getByRole('link', { name: SRNo}).click();
    await page.getByRole('button', { name: 'Claim Request' }).click();
    await page.locator("#approvalNotesTextArea").fill("Greeting from Automation Testing");
    await page.getByRole('button', { name: 'Confirmation' }).click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.locator("a[href='/wps/portal/approvals/home']").click();
    await page.waitForTimeout(20000);

    //Split Review - Section Head-----------------------------------------------------------
    await page.getByRole('button', { name: 'MOCI-CA-SEC-HEAD' }).click();
    await page.locator('.form-filter').first().click();
    await page.locator('.form-filter').first().fill(SRNo);
    await page.getByRole('link', { name: SRNo}).click();
    await page.getByRole('button', { name: 'Claim Request' }).click();
    await page.locator("#approvalNotesTextArea").fill("Greeting from Automation Testing");
    await page.getByRole('button', { name: 'Confirmation' }).click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.locator("a[href='/wps/portal/approvals/home']").click();
    await page.waitForTimeout(20000);

      //Split Review - MoCI CA Section Head
      await page.getByRole('button', { name: 'MOCI-CA-MANAGER' }).click();
      await page.locator('.form-filter').first().click();
      await page.locator('.form-filter').first().fill(SRNo);
      await page.getByRole('link', { name: SRNo}).click();
      await page.getByRole('button', { name: 'Claim Request' }).click();
      await page.locator('#approvalNumberId').click();
      await page.locator('#approvalNumberId').fill('1233444');
      await page.locator("#approvalNotesTextArea").fill("Greeting from Automation Testing");
      await page.locator('#approvalDurationRadio').nth(1).check();
      await page.locator('#months').click();
      await page.locator('#months').click();
      await page.locator('#months').fill('15');
      await page.locator('#approvalStartDate').click();
      await page.getByRole('link', { name: '15', exact: true }).click();
      await page.locator('#approvalAttachmentsBtn').setInputFiles('tests/Attachments/Agreement2.pdf');
      await page.getByRole('button', { name: 'Confirmation' }).click();
      await page.getByRole('button', { name: 'Ok' }).click();
      // Waiting untill next aproval step upload
      await page.waitForTimeout(20000);
   
      //Split - Investor Establishment Actions

        //Open Investor portal-Login
        await page.goto('https://stginvestor.sw.gov.qa/');
        await page.getByRole('link', { name: 'Login' }).click();
        await continueButton.click();

        //Action Center- Investor Establishment Actions
        //Open Manage menu
        await page.locator("(//a[@class='nav-link'])[6]").click();
        await page.locator("input[placeholder='Filter By Request Id']").click();
        await page.locator("input[placeholder='Filter By Request Id']").fill(SRNo);
        await page.locator('.btn').first().click();
        //Create Comprehensive Establishment request------------------------------------------------

        await page.locator("#crNumber").fill("40000458");
        await page.locator("td[class='text-center no-wrap'] button[class='btn btn-primary']").click();
        //Confirm by clicking on popup
        await page.locator("button[class='swal2-confirm swal2-styled']").click();

        //Submit Comprehensive Update request------------------------------------------------------------
        await page.locator(".btn.btn-info.white.mt-2.mb-3").click();
        
         //Partners / Capital amount
    
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
         await Newpage.locator("(//i[@class='icon-edit grey'])[5]").click();
         await page.waitForTimeout(2000);
         await Newpage.locator("//button[normalize-space()='Get Person Details']").click();
         await Newpage.locator("div[class='modal-footer'] button[type='button']").click()
         await Newpage.getByRole('button', { name: 'Confirm' }).click();
        // await page.waitForTimeout(2000);
        //  await Newpage.getByRole('button', { name: 'Confirm' }).click();
        //  await page.waitForTimeout(2000);

         //Confirm Update Business Activities
    
         await Newpage.getByRole('button', { name: 'Confirm' }).click();
        await page.waitForTimeout(2000);

        //Confirm Update Trade Name
        await Newpage.getByRole('button', { name: 'Confirm' }).dblclick();
       

        //Signatories / Managers
        await page.waitForTimeout(3000);
        await Newpage.getByRole('button', { name: 'Confirm' }).click();
        //Financial
        await Newpage.getByRole('checkbox', { name: 'Capital has In-Kind shares' }).dblclick();
        await page.waitForTimeout(1000);
        await Newpage.locator('div').filter({ hasText: /^Capital Total \(QAR\) \*$/ }).first().click();
        await Newpage.getByPlaceholder('Please Enter the Capital Total in QAR').dblclick();
        await Newpage.getByPlaceholder('Please Enter the Capital Total in QAR').fill('1000');
        await Newpage.getByPlaceholder('Please Enter the Cash Total Shares').click();
        await Newpage.getByPlaceholder('Please Enter the Cash Total Shares').fill('100');
        await Newpage.getByRole('row', { name: 'Single Window btsstesp 0 0' }).getByRole('textbox').first().click();
        await Newpage.getByRole('row', { name: 'Single Window btsstesp 0 0' }).getByRole('textbox').first().fill('20');
        await Newpage.getByRole('row', { name: 'Test British 0 0' }).getByRole('textbox').first().click();
        await Newpage.getByRole('row', { name: 'Test British 0 0' }).getByRole('textbox').first().fill('20');
        await Newpage.getByRole('row', { name: 'ABDULLA A.RAHMAN AL-HAMAD 0 0' }).getByRole('textbox').first().click();
        await Newpage.getByRole('row', { name: 'ABDULLA A.RAHMAN AL-HAMAD 0 0' }).getByRole('textbox').first().fill('60');
        await Newpage.getByRole('button', { name: 'Confirm' }).click();

        //Contract Terms
        await Newpage.getByRole('button', { name: 'Confirm' }).click();
        await page.waitForTimeout(2000);

        //Upload documents
        //Attachment 1
        const fileChooserPromise10 = page.waitForEvent('filechooser');
        await Newpage.locator("(//button[@id='fileUpload'])[1]").click();
        const fileChooser10 = await fileChooserPromise10;
        await fileChooser10.setFiles("tests/Attachments/Agreement4.pdf");


        //Attachment 2
        const fileChooserPromise11 = page.waitForEvent('filechooser');
        await page.locator("(//button[@id='fileUpload'])[2]").click();
        const fileChooser18 = await fileChooserPromise11;
        await fileChooser18.setFiles("tests/Attachments/Agreement.pdf");
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

        console.log("Comprehensive Update submitted successfully, please approve it and pay it"+comphreUpdate_Message);

 

});