const { test, expect } = require('@playwright/test');
const {POManager}=require('../PageObjects/POManager');
const testdata=JSON.parse(JSON.stringify(require('../PageObjects/TestData.json')));
test('Issue Commercial Permit', async ({ page }) => {
     //Maximize Browser
     await page.viewportSize(1536 );
     await page.viewportSize(835);
     const additionalData=page.locator("UserCardExpiryDate");
     const signButton=page.locator("input[value='Continue']");
     const continueButton=page.locator("button[name='submitButton']");

    const poManager= new POManager(page);
     //Login
     const loginpage= poManager.getLoginPage();
     await loginpage.goto();
     await loginpage.validLogin(testdata.username,testdata.password);
     await signButton.click();
     await continueButton.click();
  
     //Issue commercial permit
    
     await page.locator("(//a[@class='nav-link'])[6]").click();
     await page.locator("//a[normalize-space()='Services']").click();
     await page.locator("//a[@id='Issue Commercial Permit']").click();
     await page.locator("#startapplication").click();
     await page.waitForLoadState("networkidle");
   
      //Commercial Registrations
     const companyListSearch= poManager.getCompanySearch();
     await companyListSearch.ListSearch(testdata.CRIssue);
     await page.locator(".btn.bigbtn").click();
    await page.waitForTimeout(2000);
    await page.locator(".bigbtn").click();
    await page.waitForTimeout(2000);
    await page.locator("button[class='bigbtn']").click();
    await page.waitForTimeout(6000);


      //Company information 
      const location=poManager.getLocation();
      await location.locationFill();
     // const dropdown1= page.locator("//*[@id='layoutContainers']/div/div[2]/div[1]/div/section/div[2]/app-root/app-resume-cp/div/main/div/div/div[2]/div/div/app-step-two/app-location/div/div[2]/div[1]/div/select");
     // await dropdown1.selectOption("Industrial");
     
     

     // const dropdown2=page.locator("//*[@id="layoutContainers"]/div/div[2]/div[1]/div/section/div[2]/app-root/app-resume-cp/div/main/div/div/div[2]/div/div/app-step-two/app-location/div/div[2]/div[2]/div/select");
     // await dropdown2.selectOption("Factory");
     // //await page.locator("option[value='1050003']").click();
     //  await page.locator("(//select[@class='form-control ng-pristine ng-valid ng-touched'])[2]").click();
     //  await page.locator("input[placeholder='Please Enter Location Area']").fill("200");
     //  await page.locator("input[placeholder='Please Enter Property Deed Number']").fill("3333");
     //  await page.locator("input[placeholder='Please Enter the Proper Value']").fill("3333");
     //  await page.locator("(//input[@type='text'])[6]").fill("2023-10-02");
     //  await page.locator("(//select[@class='form-control ng-pristine ng-valid ng-touched'])[3]").selectOption("Private Property");
     //  await page.locator("(//select[@class='form-control ng-pristine ng-valid ng-touched'])[4]").selectOption("AL DOHA MUNICIPALITY ");
     //  await page.locator(".form-control.ng-pristine.ng-valid.ng-touched").selectOption("37");
     //  await page.locator("#ditrictnum").selectOption("Fereej Bin Omran");
     //  await page.locator("#streetnum").selectOption("852 - Abu Al Fateh ");
     //  await page.locator("input[placeholder=' Please Enter Building No']").fill("38");
     //  await page.locator("input[placeholder=' Please Enter Floor']").fill("2");
     //  await page.locator("input[placeholder=' Please Enter Land No. (PIN)']").fill("234455");
     //  await page.locator("input[placeholder='Please Enter Building Owner Name[Arbic]']").fill("كريم");
     //  await page.locator("input[placeholder='Please Enter Building Owner Name[English]']").fill("Kareem");
     //  await page.locator("input[placeholder='Please Enter Kahrama No']").fill("200200");
     //  await page.locator("input[placeholder='Please Enter Unit No']").fill("22334");
     //  await page.locator("textarea[placeholder='Please Enter Address Description']").fill("Test");
     //  await page.locator("select[class='form-control ng-pristine ng-valid ng-touched']").selectOption("Select Existing Person");
     //  await page.locator("input[class='ng-pristine ng-valid ng-touched']").check();
     //Adding responsible manager
     const responsibleManager= await page.locator("//*[@id='layoutContainers']/div/div[2]/div[1]/div/section/div[2]/app-root/app-resume-cp/div/main/div/div/div[2]/div/div/app-step-two/div[2]/div[2]/div/select");
     await responsibleManager.selectOption("Select Existing Person");

     await this.responsibleManagerExisting.check();
      await page.locator("button[class='bigbtn']").click();
      //Approval section
      await page.locator("input[placeholder='Approval No']").fill("9009009");
      await page.locator("tbody tr td:nth-child(4) input:nth-child(1)").fill("2023-10-03");
      await page.locator("tbody tr td:nth-child(5) input:nth-child(1)").fill("2023-10-31");
      await page.locator("button[class='bigbtn']").click();

     //Upload documents
     await page.locator("(//button[@id='fileUpload'])[1]").click();
     await page.setInputFiles("input[type='file']", 'Agreement.pdf');
     await page.waitForTimeout("2000");
     await page.locator("(//button[@id='fileUpload'])[2]").click();
     await page.setInputFiles("input[type='file']", 'Dec.pdf');
     await page.waitForTimeout("2000");
     await page.locator("button[class='bigbtn']").click();
     //Submit SR
     await page.waitForTimeout("3000");
     await page.locator("label[for='til']").click();
     await page.waitForTimeout("1000");
     await page.locator(".bigbtn.ng-star-inserted").click();

     //Assertion
     const message= await page.locator(".animated.fadeInDown.finishedMessage.ng-star-inserted").textContent();
     expect("The request has been submitted successfully", message);

});

