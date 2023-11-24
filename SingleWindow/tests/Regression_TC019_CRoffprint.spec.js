const { test, expect } = require('@playwright/test');
const {POManager}=require('../PageObjects/POManager');
const testdata=JSON.parse(JSON.stringify(require('../PageObjects/TestData.json')));

test('Regression_TC019_CRoffprint', async ({ page }) => {
        //Maximize Browser
        await page.viewportSize(1536 );
        await page.viewportSize(835);
       
       // const additionalData=page.locator("UserCardExpiryDate");
        const signButton=page.locator("input[value='Continue']");
        const continueButton=page.locator("button[name='submitButton']");
        const poManager= new POManager(page);

         //Login access
         const loginpage= poManager.getLoginPage();
         await loginpage.goto();
         await loginpage.validLogin(testdata.username,testdata.password);
         await signButton.click();
         await continueButton.click();

         //Commercial Registration Offprint
         await page.locator("(//a[@class='nav-link'])[6]").click();;
         await page.locator("//a[normalize-space()='Services']").click();
         await page.locator("(//a[normalize-space()='Commercial Registration Offprint'])[1]").click();;
         await page.locator("#startapplication").click();
         await page.locator("#crNumber").fill(testdata.CR_Offprint);
         await page.locator("(//input[@id='ed'])[1]").click();
         await page.locator("(//input[@id='ed'])[2]").click();

        //Handle pop up
        await page.waitForTimeout(3000);
        await page.locator("button[class='swal2-confirm swal2-styled']").click();
        await page.waitForLoadState("networkidle");

       //pay the fees for the print our the CR, which is 50 QAR
       await page.locator("div[class='d-flex justify-content-end'] a[role='button']").click();
       await page.waitForLoadState("networkidle");
       
       //fill payment details
       await page.locator("#details-button").click();
       await page.locator("#proceed-link").click();
       await page.waitForTimeout(3000);
       await page.locator("#bill_to_forename").fill("Anas");
       await page.locator("#bill_to_surname").fill("Satti");
       await page.locator("#bill_to_address_line1").fill("Qatar");
       await page.locator("#bill_to_address_city").fill("Doha");
       await page.locator("#bill_to_address_country").selectOption("Qatar");
       await page.locator("#bill_to_phone").fill("0097450303262");
       await page.locator("#bill_to_phone").fill("0097450303262");
       await page.locator("#bill_to_email").fill("asatti@malomatia.com");
       await page.locator("#card_type_002").check();
       await page.locator("#card_number").fill("2222400060000007");
       await page.locator("#card_expiry_month").selectOption("03");
       await page.locator("#card_expiry_year").selectOption("2030");
       await page.locator("#card_cvn").fill("737");
       await page.locator("input[value='Pay']").click();
       await page.waitForLoadState("networkidle");

       //Assertion to verify if the application is submitted successfully  or not
       const message= await page.locator("div[role='alert']").textContent();
       expect("The payment was received successfully,", message);



  


})