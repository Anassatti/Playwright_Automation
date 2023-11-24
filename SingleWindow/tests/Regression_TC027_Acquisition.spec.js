const { test, expect } = require('@playwright/test');
const {POManager}=require('../PageObjects/POManager');
const testdata=JSON.parse(JSON.stringify(require('../PageObjects/TestData.json')));

test('Regression_TC027_Acquisition', async ({ page }) => {
  //Maximize Browser
  await page.viewportSize(1536 );
  await page.viewportSize(835);

 //login page data/controls
//const additionalData=page.locator("UserCardExpiryDate");
  const signButton=page.locator("input[value='Continue']");
  const continueButton=page.locator("button[name='submitButton']");
  const poManager= new POManager(page);

  //Login access 
  const loginpage= poManager.getLoginPage();
  await page.goto("https://stgcounter.sw.gov.qa/");
  await loginpage.validLogin(testdata.username,testdata.password);
  await signButton.click();
  await continueButton.click();

  //Acquisition service
  await page.getByRole('link', { name: 'Start Request' }).click();
  await page.locator('#QID').click();
  await page.locator('#QID').fill(testdata.username);
  await page.locator('#expiryDate').click();
  await page.getByLabel('Select year').selectOption('2025');
  await page.locator("select[aria-label='Select month']").selectOption("Jan");
  await page.getByRole('link', { name: '1', exact: true }).click();
  await page.locator('#service').selectOption('acquisition/list');
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();

   //search in company list
   const companyListSearch= poManager.getCompanySearch();
   await companyListSearch.ListSearch(testdata.Acquisition_CR);
   //await page.locator("//tbody/tr[2]/td[6]/button[1]").click();
  await page.getByRole('row', { name: 'asda hhaahaa Main Public Joint Stock Company 40000122 60000144 Start' }).getByRole('button').click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('div').filter({ hasText: /^Commercial Registration Number \*$/ }).nth(1).click();
  await page.locator('#crNumber').click();
  await page.locator('#crNumber').fill(testdata.Acquisition_Compnay);
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('button', { name: '2023' }).click();
  await page.getByText('2024').click();
  await page.getByText('May').click();
  await page.getByText('31', { exact: true }).click();
  await page.getByLabel('', { exact: true }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByLabel('Acquisition Method *').selectOption('2030001');
  await page.getByLabel('Acquisition Type *').selectOption('2040002');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForTimeout(4000);

  //Attach required dcouments
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator("(//button[@id='fileUpload'])[1]").click();
  const fileChooser3 = await fileChooserPromise;
  await fileChooser3.setFiles("tests/Attachments/Agreement3.pdf");

  const fileChooserPromise1 = page.waitForEvent('filechooser');
  await page.locator("(//button[@id='fileUpload'])[2]").click();
  const fileChooser4 = await fileChooserPromise1;
  await fileChooser4.setFiles("tests/Attachments/Agreement4.pdf");

  const fileChooserPromise3 = page.waitForEvent('filechooser');
  await page.locator("(//button[@id='fileUpload'])[3]").click();
  const fileChooser5 = await fileChooserPromise3;
  await fileChooser5.setFiles("tests/Attachments/Agreement.pdf");

  const fileChooserPromise4 = page.waitForEvent('filechooser');
  await page.locator("(//button[@id='fileUpload'])[4]").click();
  const fileChooser6 = await fileChooserPromise4;
  await fileChooser6.setFiles("tests/Attachments/Dec2.pdf");

  await page.waitForTimeout(2000);
 await page.getByRole('button', { name: 'Next' }).click();

//Summary attachment
  let [fileChooserAcq] = await Promise.all([
    page.waitForEvent('filechooser'),
    page.locator("//input[@id='summaryAttachment']").click(),
  ]);
  await fileChooserAcq.setFiles(['tests/Attachments/Dec.pdf']);

// Confirm the terms
   await page.waitForTimeout(2000);
   await page.locator("label[for='til']").click();
  
   // Submit the request
   await page.locator(".bigbtn.ng-star-inserted").click();

   //Assertion to verify the SR submitted successfully
   const message= await page.locator(".animated.fadeInDown.finishedMessage.ng-star-inserted").textContent();
   expect("The request has been submitted successfully", message);
  //Print the result
  console.log("Appliction submitted successfully:"+message);

  //-----------------------------------------------------------------Approval process---------------------------------------------

  // Split SR number
  const SubmittedSR= message.split("is");
  const SR=SubmittedSR[1].split("]")[0];
  const SRNo= SR.split("[")[1];


   // Start approval process- Approval portal-----------------------------------------------

   await page.goto('https://stgap.sw.gov.qa/');
   await page.getByRole('link', { name: 'Login' }).click();
   await continueButton.click();
  
  
   // MoCI CA Employee--------------------------------------
    // Waiting untill load
  await page.waitForTimeout(90000);
   await page.getByRole('button', { name: 'MOCI-CA-EMP' }).click();
   await page.locator('.form-filter').first().click();
   await page.locator('.form-filter').first().fill(SRNo);
   await page.getByRole('link', { name: SRNo}).click();
   await page.getByRole('button', { name: 'Claim Request' }).click();
   await page.locator("#approvalNotesTextArea").fill("Greeting from Automation Testing");
   await page.getByRole('button', { name: 'Confirmation' }).click();
   await page.getByRole('button', { name: 'Ok' }).click();
   await page.locator("a[href='/wps/portal/approvals/home']").click();
   await page.waitForTimeout(30000);

   // MoCI CA Section Head------------------------------------------------
   await page.getByRole('button', { name: 'MOCI-CA-SEC-HEAD' }).click();
   await page.locator('.form-filter').first().click();
   await page.locator('.form-filter').first().fill(SRNo);
   await page.getByRole('link', { name: SRNo}).click();
   await page.getByRole('button', { name: 'Claim Request' }).click();
   await page.locator('#approvalNumberId').fill('1233444');
   await page.locator("#approvalNotesTextArea").fill("Greeting from Automation Testing");
   await page.locator('#approvalDurationRadio').nth(1).check();
   await page.locator('#months').click();
   await page.locator('#months').click();
   await page.locator('#months').fill('20');
   await page.locator('#approvalStartDate').click();
   await page.getByRole('link', { name: '17', exact: true }).click();
   await page.locator('#approvalAttachmentsBtn').setInputFiles('tests/Attachments/Agreement2.pdf');
   await page.getByRole('button', { name: 'Confirmation' }).click();
   await page.getByRole('button', { name: 'Ok' }).click();
   // Waiting untill next aproval step upload
  // await page.waitForTimeout(30000);
  await page.waitForTimeout(30000);
   //Submit Acquisition Announcement
await page.goto('https://stginvestor.sw.gov.qa/');
await page.getByRole('link', { name: 'Login' }).click();
await continueButton.click();
//await page.waitForTimeout(30000);
//Action Center- Investor Establishment Actions
await page.locator("(//a[@class='nav-link'])[6]").click();
await page.locator("input[placeholder='Filter By Request Id']").click();
await page.locator("input[placeholder='Filter By Request Id']").fill(SRNo);
await page.locator('.btn').first().click();

// Waiting 
await page.waitForTimeout(30000);
//A copy of the declaration of the acquisition

const fileChooserPromise13 = page.waitForEvent('filechooser');
await page.locator("(//button[@id='fileUpload'])[1]").click();
const fileChooserA = await fileChooserPromise13;
await fileChooserA.setFiles("tests/Attachments/Agreement2.pdf");

await page.locator(".bigbtn").click();


   //MOCI CA Announcement Employee Revision - MoCI CA Employee--------------------------------------
   await page.goto('https://stgap.sw.gov.qa/');
   await page.getByRole('button', { name: 'MOCI-CA-EMP' }).click();
   await page.locator('.form-filter').first().click();
   await page.locator('.form-filter').first().fill(SRNo);
   await page.getByRole('link', { name: SRNo}).click();
   //await page.waitForTimeout(30000);
   await page.getByRole('button', { name: 'Claim Request' }).click();
   await page.locator("#approvalNotesTextArea").fill("Greeting from Automation Testing");
   await page.getByRole('button', { name: 'Confirmation' }).click();
   await page.getByRole('button', { name: 'Ok' }).click();
 
   await page.waitForTimeout(40000);

//Execution of the Acquisition----------------------------------------------------------
await page.goto('https://stginvestor.sw.gov.qa/');
//await page.waitForTimeout(40000);
//await page.getByRole('link', { name: 'Login' }).click();
await page.locator("(//a[@class='nav-link'])[6]").click();
await page.locator("input[placeholder='Filter By Request Id']").click();
await page.locator("input[placeholder='Filter By Request Id']").fill(SRNo);
await page.locator('.btn').first().click();
//Waiting
await page.waitForTimeout(30000);
//Confirm Amalgamation Completion
 await page.locator(".bigbtn").click();

 
})