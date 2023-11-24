const { test, expect } = require('@playwright/test');
const {POManager}=require('../PageObjects/POManager');
const testdata=JSON.parse(JSON.stringify(require('../PageObjects/TestData.json')));

test('Regression_TC004_Add branch.spec', async ({ page }) => {
    //Maximize Browser
    await page.viewportSize(1536 );
    await page.viewportSize(835);
  
   
    const signButton=page.locator("input[value='Continue']");
    const continueButton=page.locator("button[name='submitButton']");
    const poManager= new POManager(page);
    //Login access
      
    const loginpage= poManager.getLoginPage();
    await loginpage.goto();
    await loginpage.validLogin(testdata.username,testdata.password);
    await signButton.click();
    await continueButton.click();
    //Add Branch

    await page.locator("(//a[@class='nav-link'])[6]").click();
    await page.waitForTimeout(2000);
    await page.locator("//a[normalize-space()='Services']").click();
    await page.waitForTimeout(2000);
    await page.locator("//a[@id='Add Branch']").click();
    await page.locator("#startapplication").click();

   

    await page.getByPlaceholder('Search').fill(testdata.AddBranch_CP);
    await page.getByRole('button', { name: 'Add A Branch' }).click();
    await page.waitForTimeout(6000);

    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Next' }).click();
   // await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Add to Branch' }).click();
    await page.waitForTimeout(2000);
    //await page.getByRole('button', { name: 'Next' }).click();
    //if New Branch Business Activities not visiable, system should readd the branch
    // if(await page.locator(".tableRowOdd.ng-star-inserted").isVisible)
    // {
    //     await page.getByRole('button', { name: 'Next' }).click();

    // }else
    // {
    //     await page.getByRole('button', { name: 'Add to Branch' }).click();
    //     await page.getByRole('button', { name: 'Next' }).click();
    // }
    
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByRole('heading', { name: '+ Add Additional Signatories / Managers' }).click();
    await page.getByRole('combobox').selectOption('1190002');
    await page.getByRole('radio').check();
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: ' Add Signatory / Manager' }).click();
    await page.getByRole('button', { name: 'Add Signatory / Managers' }).click();
    await page.getByLabel('Roles').selectOption('27063400056');
    await page.locator('#usrrul').nth(1).selectOption('1060031');
    await page.getByText('Full and Absolute Authority').click();
    await page.getByRole('button', { name: 'Add New Role & Responsibility' }).click();
    await page.getByText('Next').click();

    let [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        page.locator("(//button[@id='fileUpload'])[1]").click(),
        ]);
        await fileChooser.setFiles(['tests/Attachments/Agreement3.pdf']);

    await page.getByRole('button', { name: 'Next' }).click();

    //Confirm all the request data is correct

    await page.locator("label[for='til']").click();
    await page.waitForTimeout(2000);
    // Submit the request
    await page.locator(".bigbtn.ng-star-inserted").click();
    await page.waitForLoadState("networkidle");

    //Assertion to verify the SR submitted successfully
    const message= await page.locator(".animated.fadeInDown.finishedMessage.ng-star-inserted").textContent();
    expect("The request has been submitted successfully", message);
    //Print the result
    console.log("Appliction submitted message"+message);
  



});