const { test, expect } = require('@playwright/test');
const {POManager}=require('../PageObjects/POManager');
const testdata=JSON.parse(JSON.stringify(require('../PageObjects/TestData.json')));

test('Regression_TC023_Cancel application from counter', async ({ browser }) => {
      // //Maximize browser, test data
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.viewportSize(1536 );
      await page.viewportSize(835);
      //const additionalData=page.locator("UserCardExpiryDate");

      //login page data/controls
      const signButton=page.locator("input[value='Continue']");
      const continueButton=page.locator("button[name='submitButton']");
      const poManager= new POManager(page);

      //Login access
      const loginpage= poManager.getLoginPage();
      await page.goto("https://stgcounter.sw.gov.qa/");
      await loginpage.validLogin(testdata.username,testdata.password);
      await signButton.click();
      await continueButton.click();

      //Cancel appliction
      await page.waitForTimeout(2000);
      await page.locator("#requestNumber").fill(testdata.SRNo_Cancel);
      await page.waitForTimeout(3000);
      await page.locator("#submitBtn").click();
      await page.waitForTimeout(3000);
      

      //Handling new page- Request details
      const pagePromise = context.waitForEvent('page');
      await page.locator(".ng-binding[target='_blank']").click();
      const newPage = await pagePromise;
      await newPage.waitForLoadState();
      await newPage.locator("//a[normalize-space()='Cancel Request']").click();

      //Adding cancellation reason
      const cancelUponrequest= await newPage.locator("//*[@id='cancelUponRequestSelect']");
                               cancelUponrequest.selectOption("Request Owner");
      const cancelReasn= await newPage.locator("//*[@id='cancellationReasonSelect']");
                                cancelReasn.selectOption("Technical issue");

    //Cancel the application
    await newPage.locator("#cancellationButton").click();
    await page.waitForTimeout(3000);
    await newPage.locator("//*[@id='cancellationModal']/div/div/div[3]/button[2]").click();

    //Assertion- successfully cancelled
    const successMessage= await newPage.locator(".alert.alert-success").textContent();
    expect("The has been canceled successfully", successMessage);
  
});
