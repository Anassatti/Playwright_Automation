const { test, expect } = require('@playwright/test');
const {POManager}=require('../PageObjects/POManager');
const testdata=JSON.parse(JSON.stringify(require('../PageObjects/TestData.json')));

test('Regression_TC029_Amalgamation', async ({ page }) => {
  //Maximize Browser
  await page.viewportSize(1536 );
  await page.viewportSize(835);

  //login page data/controls
  const signButton=page.locator("input[value='Continue']");
  const continueButton=page.locator("button[name='submitButton']");
  const poManager= new POManager(page);
  //const additionalData=page.locator("#UserCardExpiryDate");

  //Login access
  const loginpage= poManager.getLoginPage();
  await page.goto("https://stgcounter.sw.gov.qa/");
  await loginpage.validLogin(testdata.username,testdata.password);
  await signButton.click();
  await continueButton.click();
  await page.waitForTimeout(3000);
 // await additionalData.fill(testdata.AdditionalData_date);
 // await continueButton.click();

  //Start Amalgamation service
  await page.getByRole('link', { name: 'Start Request' }).click();
  await page.locator('#QID').click();
  await page.locator('#QID').fill(testdata.username);
  await page.locator('#expiryDate').click();
  await page.getByLabel('Select year').selectOption('2025');
  await page.locator("select[aria-label='Select month']").selectOption("Jan");
  await page.getByRole('link', { name: '1', exact: true }).click();
  await page.locator('#service').selectOption('merger/list');
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();

  //search in company list
  const companyListSearch= poManager.getCompanySearch();
  await companyListSearch.ListSearch(testdata.Amalgamation_CP);
  await page.locator(".btn.btn-primary").click();
  await page.waitForTimeout(2000);
  //Handling popup
      //  if(page.locator("button[class='swal2-confirm swal2-styled']").isVisible())
      //  {
      //    await page.locator("button[class='swal2-confirm swal2-styled']").click();
      //  }
    
  //General information/
  await page.getByRole('radio').nth(1).check();
  await page.getByRole('radio').nth(2).check();
  await page.getByLabel('Transferee Company Legal Type *').selectOption('1510002');
  await page.locator('#amalgamationDetails').fill('Done by Test Automation');
  await page.getByRole('button', { name: 'Next' }).click();

  await page.locator('#crNumber').click();
  await page.locator('#crNumber').fill('40000458');
  //await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('button', { name: '2023' }).click();
  await page.getByText('2024').click();
  await page.getByText('May').click();
  await page.getByText('31', { exact: true }).click();
  await page.getByLabel('', { exact: true }).click();

  await page.waitForTimeout(2000);
  await page.getByRole('row', { name: 'Limited Liability Company Owned by One Person 40000377 Active 300,000 ' }).getByRole('textbox').fill("1000");
  await page.getByRole('button', { name: 'Next' }).click();
  //await page.getByRole('row', { name: 'Limited Liability Company Owned by One Person 40000377 Active 300,000 ' }).getByRole('textbox').click();
 // await page.getByRole('row', { name: 'cfsefwe rfgvwergergrt Limited Liability Company Owned by One Person 40000262 Active 12,300,00 ' }).getByRole('textbox').fill('1000');
         
  //Documents upload 
  const fileChooserPromise10 = page.waitForEvent('filechooser');
  await page.locator("(//button[@id='fileUpload'])[1]").click();
  const fileChooser1 = await fileChooserPromise10;
  await fileChooser1.setFiles("tests/Attachments/Agreement2.pdf");

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

  // Accept terms/Submit the application
  await page.getByText('I hereby confirm that the information provided herein is accurate, correct and c').click();
  await page.getByRole('button', { name: 'Submit' }).click();

  //Assertion to verify the SR submitted successfully
  const message= await page.locator(".animated.fadeInDown.finishedMessage.ng-star-inserted").textContent();
  expect("The request has been submitted successfully", message);
  //Print the result
  console.log("Appliction submitted message"+message);
  await page.waitForTimeout(2000);
   // Split SR number
   const SubmittedSR= message.split("is");
   const SR=SubmittedSR[1].split("]")[0];
   const SRNo= SR.split("[")[1];


    // Start approval process- Approval portal-----------------------------------------------

    await page.goto('https://stgap.sw.gov.qa/');
    await page.getByRole('link', { name: 'Login' }).click();
    await continueButton.click();
    // Waiting untill next aproval step upload
   await page.waitForTimeout(30000);
   
    //Amalgamation Announcement Review - MoCI CA Employee--------------------------------------
    await page.getByRole('button', { name: 'MOCI-CA-EMP' }).click();
    await page.locator('.form-filter').first().click();
    await page.locator('.form-filter').first().fill(SRNo);
    await page.getByRole('link', { name: SRNo}).click();
    await page.getByRole('button', { name: 'Claim Request' }).click();
    await page.locator("#approvalNotesTextArea").fill("Greeting from Automation Testing");
    await page.getByRole('button', { name: 'Confirmation' }).click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.locator("a[href='/wps/portal/approvals/home']").click();
    await page.waitForTimeout(40000);

    //Amalgamation Review - MoCI CA Section Head------------------------------------------------
    await page.getByRole('button', { name: 'MOCI-CA-SEC-HEAD' }).click();
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
    await page.locator('#months').fill('20');
    await page.locator('#approvalStartDate').click();
    await page.getByRole('link', { name: '16', exact: true }).click();
    await page.locator('#approvalAttachmentsBtn').setInputFiles('tests/Attachments/Agreement2.pdf');
    await page.getByRole('button', { name: 'Confirmation' }).click();
    await page.getByRole('button', { name: 'Ok' }).click();
    // Waiting untill next aproval step upload
    await page.waitForTimeout(50000);

    //Amalgamation Announcement
await page.goto('https://stginvestor.sw.gov.qa/');
await page.getByRole('link', { name: 'Login' }).click();
await continueButton.click();

//Action Center- Investor Establishment Actions
await page.locator("(//a[@class='nav-link'])[6]").click();
await page.locator("input[placeholder='Filter By Request Id']").click();
await page.locator("input[placeholder='Filter By Request Id']").fill(SRNo);
await page.locator('.btn').first().click();

 // Waiting 
 await page.waitForTimeout(20000);
 //A copy of the publication of the decision to merge (Mnask Advertising) attachment

 const fileChooserPromise13 = page.waitForEvent('filechooser');
 await page.locator("(//button[@id='fileUpload'])[1]").click();
 const fileChooserA = await fileChooserPromise13;
 await fileChooserA.setFiles("tests/Attachments/Agreement2.pdf");

 const fileChooserPromise14 = page.waitForEvent('filechooser');
 await page.locator("(//button[@id='fileUpload'])[2]").click();
 const fileChooserB = await fileChooserPromise14;
 await fileChooserB.setFiles("tests/Attachments/Agreement.pdf");

 await page.locator(".bigbtn").click();


    //Amalgamation Announcement Review - MoCI CA Employee--------------------------------------
    await page.goto('https://stgap.sw.gov.qa/');
    await page.getByRole('button', { name: 'MOCI-CA-EMP' }).click();
    //await page.waitForTimeout(20000);
    await page.locator('.form-filter').first().click();
    await page.locator('.form-filter').first().fill(SRNo);
    await page.getByRole('link', { name: SRNo}).click();
    await page.getByRole('button', { name: 'Claim Request' }).click();
    await page.waitForTimeout(1000);
    await page.locator("#approvalNotesTextArea").fill("Greeting from Automation Testing");
    await page.getByRole('button', { name: 'Confirmation' }).click();
    await page.getByRole('button', { name: 'Ok' }).click();
  


 //Amalgamation Execution----------------------------------------------------------
 await page.goto('https://stginvestor.sw.gov.qa/');
 //await page.waitForTimeout(40000);
//await page.getByRole('link', { name: 'Login' }).click();
 await page.locator("(//a[@class='nav-link'])[6]").click();
 await page.locator("input[placeholder='Filter By Request Id']").click();
 await page.locator("input[placeholder='Filter By Request Id']").fill(SRNo);
 await page.locator('.btn').first().click();
 //Waiting
// await page.waitForTimeout(20000);
 //Confirm Amalgamation Completion
// await page.locator(".bigbtn").click();









});