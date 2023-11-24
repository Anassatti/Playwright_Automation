const { test, expect } = require('@playwright/test');
//const {LoginPage }= require('../SingleWindowProject/LoginPage.js');

test('Add Branch', async ({ page }) => {
    //Maximize Browser
    await page.viewportSize(1536 );
    await page.viewportSize(835);
   // const userName="27063400056";
   // const password="Sw123456A";
   const login= page.locator("#loginLink");
const username=page.locator("#username");
const password=page.locator("#password");
const continueButton=page.locator("input[value='Continue']");
const SubmitButton=page.locator("button[name='submitButton']");
  //await page.screenshot({path:"C://Users//asatti//Desktop//SW//Playwright//Automation//tests//singleWindow.spec.js-snapshots//screen.png"});
  //await expect(page).toHaveScreenshot('screen.png');
  
//const loginPage= new LoginPage(page);
await page.goto("https://stginvestor.sw.gov.qa/");
//loginPage.validLogin(userName,password);
await page.waitForTimeout(2000);
await login.click();
await username.fill("27063400056");
await password.fill("Sw123456A");
await continueButton.click();
await SubmitButton.click();
  // Services 
  await page.locator("(//a[@class='nav-link'])[6]").click();;
  await page.locator("//a[normalize-space()='Services']").click();
  await page.locator("//a[@id='Add Branch']").click();
  await page.locator("//a[@id='startapplication']").click();
  //wait until the list of entities load
  await page.waitForLoadState("networkidle");
  
  //Search about CP

  await page.locator("input[placeholder='Search']").fill("60000355");
  //Add new branch
  await page.locator(".btn.btn-primary").click();
  //General information
  await page.locator(".bigbtn").click();
  //Identification Documents Updates
  await page.waitForTimeout(2000);
  await page.locator("button[class='bigbtn']").click();
  await page.waitForTimeout(6000);
  //Add business Activity 
  await page.locator("//div[normalize-space()='Add to Branch']").dblclick();
 // await page.waitForTimeout(3000);
 await page.locator("button[class='bigbtn']").click();
 
  // //Add Signatories / Managers
  await page.locator(".form-control.ng-valid.ng-dirty.ng-touched").click();
  //await page.locator(".form-control.ng-valid.ng-touched.ng-dirty").click();
  await page.locator("input[value='Select'][name='option1']").click();
  await page.locator("input[value='Select'][type='checkbox']").check();
  await page.locator("//button[normalize-space()='']").click();
  await page.locator("//button[normalize-space()='Add Signatory / Managers']").click();
  await page.locator("(//select[@id='usrrul'])[1]").click();
  await page.locator("(//select[@id='usrrul'])[2]").click();
  await page.locator("(label[for='1580001id']").check();
  await page.locator("div[class='col-6'] button[type='button']").click();
  await page.locator("//a[normalize-space()='Next']']").click();

  // //Documents Upload
  await page.locator("#fileUpload").click();
  await page.setInputFiles("input[type='file']", 'C://Users//asatti//Desktop//SW//TestData//Attachments_Testdata//Passport.pdf');
  await page.locator('.btn.btn-success').click();
  await page.locator("button[class='bigbtn']").click();
  await page.locator("label[for='til']").check();
  await page.locator("//button[normalize-space()='Submit']").click();

//   // //Assertion

//   const message= await page.locator(".animated.fadeInDown.finishedMessage.ng-star-inserted").textContent();

//   await expect("The request has been submitted successfully", message);

//  // page.pause();

});


