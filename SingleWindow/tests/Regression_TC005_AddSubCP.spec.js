const { test, expect } = require('@playwright/test');
const {POManager}=require('../PageObjects/POManager');
const testdata=JSON.parse(JSON.stringify(require('../PageObjects/TestData.json')));

//Run tests in parallel
//test.describe.configure({mode:'serial'});
test('@web Regression_TC005_Add Sub CP', async ({ browser }) => {

  //Maximize Browser
 
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.viewportSize(1536 );
  await page.viewportSize(835);
  const poManager= new POManager(page);
  
  //Location controls
  const signButton=page.locator("input[value='Continue']");
  const continueButton=page.locator("button[name='submitButton']");
  const locationArea= page.locator("input[placeholder='Please Enter Location Area']");
  const propertyDeedNumber= page.locator("input[placeholder='Please Enter Property Deed Number']");
  const buildingCompletionCertificateNumber= page.locator("input[placeholder='Please Enter the Proper Value']");
  

  //Login access
    
  const loginpage= poManager.getLoginPage();
  await loginpage.goto();
  await loginpage.validLogin(testdata.username,testdata.password );
  await signButton.click();
  await continueButton.click();

  //Add Sub CP

  await page.locator("(//a[@class='nav-link'])[6]").click();
  await page.locator("//a[normalize-space()='Services']").click();
  await page.waitForTimeout(6000);
  await page.locator("//*[@id='Add Sub Commercial Permit']").click();
  await page.locator("#startapplication").click();

  //Company list search
  //const companyListSearch= poManager.getCompanySearch();
  //await page.waitForLoadState("networkidle");
  // await companyListSearch.ListSearch(CP);
  await page.waitForTimeout(6000);
  page.locator("input[placeholder='Search']").fill(testdata.AddSubCP_CP);
  await page.locator("//*[@id='companyDetails']/div/app-establish-list/div[3]/table/tbody/tr[1]/td[5]/button").click();
  await page.waitForLoadState("networkidle");

  const SubCommercialPermitType= await page.locator("//*[@id='layoutContainers']/div/div[2]/div[1]/div/section/div[2]/app-root/app-add-sub-cp/div/main/div/div[2]/div[2]/div/div/div/app-add-cptype/div/div/div/div/select");
                                  SubCommercialPermitType.selectOption("ATM");
  await page.waitForTimeout(5000);
  await page.locator("#customCheckDisabled0").check();
  await page.locator(".bigbtn").click();
  await page.waitForTimeout(5000);

  //Company Information
  await page.locator("input[placeholder='Email :']").fill(testdata.emailID);
  //const location= new Location(page);
  //await location.locationFill(subCP);

  //Location Information
  await page.waitForTimeout(5000);
  await locationArea.fill("200");
  await propertyDeedNumber.fill("3333");
  await buildingCompletionCertificateNumber.fill("557799");
  await page.waitForTimeout(1000);
  await page.locator('div:nth-child(6) > .form-group > .form-control').first().click();
  await page.getByText('10').first().dblclick();
  await page.waitForTimeout(1000);
  await page.locator('div:nth-child(7) > .form-group > .form-control').first().selectOption('1090003');
  await page.locator('div:nth-child(9) > .form-group > .form-control').first().click();
  await page.getByText('10').first().dblclick();
 

  //Adress Information 
  await page.locator('div:nth-child(3) > div:nth-child(2) > .form-group > .form-control').selectOption('1890001');
  await page.locator('div:nth-child(3) > div:nth-child(3) > .form-group > .form-control').selectOption('37');
  await page.locator('#ditrictnum').selectOption("Fereej Bin Omran");
  await page.locator('#streetnum').selectOption('3254');
  await page.getByPlaceholder(' Please Enter Building No').click();
  await page.getByPlaceholder(' Please Enter Building No').fill('38')
  await page.getByPlaceholder(' Please Enter Floor').click();
  await page.getByPlaceholder(' Please Enter Floor').fill('2');
  await page.getByPlaceholder(' Please Enter Land No. (PIN)').click();
  await page.getByPlaceholder(' Please Enter Land No. (PIN)').fill('3332');
  await page.getByPlaceholder('Please Enter Building Owner Name[Arbic]').click();
  await page.getByPlaceholder('Please Enter Building Owner Name[Arbic]').fill('كريم');
  await page.getByPlaceholder('Please Enter Building Owner Name[English]').click();
  await page.getByPlaceholder('Please Enter Building Owner Name[English]').fill('Kareem');
  await page.getByPlaceholder('Please Enter Kahrama No').click();
  await page.getByPlaceholder('Please Enter Kahrama No').fill('000900');
  await page.getByPlaceholder('Please Enter Unit No').click();
  await page.getByPlaceholder('Please Enter Unit No').fill('1223');
  await page.getByPlaceholder('Please Enter Address Description').click();
  await page.getByPlaceholder('Please Enter Address Description').fill('Greeting from Automation Testing');

  //Add resposnible manager
  await page.locator('.col-6 > .form-control').selectOption('1');
  await page.waitForTimeout(2000);
  await page.getByRole('radio').click();
  await page.locator("button[class='bigbtn']").click();
  
  // await page.waitForTimeout(1000);
  // await page.getByRole('button', { name: 'Next' }).click();

  //Upload attachment 
  const fileChooserPromise = page.waitForEvent('filechooser');
  await page.locator("(//button[@id='fileUpload'])[1]").click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles("tests/Attachments/Dec.pdf");

  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Next' }).click();

  //Submit SR
  await page.getByText('I hereby confirm that the information provided herein is accurate, correct and c').click();
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForTimeout(2000);
  //Assertion to verify the SR submitted successfully
  const message= await page.locator(".animated.fadeInDown.finishedMessage.ng-star-inserted").textContent();
  expect("The request has been submitted successfully", message);
  //Print the result
  console.log("Appliction submitted message"+message);

});