const { test, expect } = require('@playwright/test');
const {POManager}=require('../PageObjects/POManager');
const testdata=JSON.parse(JSON.stringify(require('../PageObjects/TestData.json')));

test('Regression_TC001_ComprehensiveEstablishmentRTN+CR', async ({ page }) => {
       //Maximize Browser
       await page.viewportSize(1536 );
       await page.viewportSize(835);

       //login page data/controls
       const signButton=page.locator("input[value='Continue']");
       const continueButton=page.locator("button[name='submitButton']");
       const poManager= new POManager(page);
       
       //Login access
        const loginpage= poManager.getLoginPage();
        await loginpage.goto();
        await loginpage.validLogin(testdata.username,testdata.password);
        await signButton.click();
        await continueButton.click();
        await page.locator("(//a[@class='nav-link'])[6]").click();
        await page.waitForTimeout(2000);
        await page.locator("//a[normalize-space()='Services']").click();
        await page.waitForTimeout(2000);
        await page.locator("//a[@id='Comprehensive Establishment']").click();
        await page.locator("#startapplication").click();
        
        //Start RTN+CR application
        // await page.getByText('Comprehensive Establishment', { exact: true }).click();
        // await page.getByText('Start the service ( Comprehensive Establishment )').click();
      //  await page.getByText('Applicant', { exact: true }).click();
        await page.getByText('Start the service').click();
        await page.getByRole('combobox').selectOption('1500001');
        await page.getByText('The limited liability company owned by one person is composed of one person, tha').click();
        await page.getByRole('button', { name: 'Next' }).click();
      //  await page.getByRole('heading', { name: '+ Add another partner' }).click();
     //   await page.waitForTimeout(1000);
       // await page.getByRole('combobox').nth(1).selectOption('1180001');
        //await page.locator("(//select[@class='form-control ng-valid ng-dirty ng-touched'])[1]").click();
        // await page.getByRole('textbox').first().click();
        // await page.getByRole('textbox').first().fill('25863417657');
        // await page.getByRole('textbox').nth(1).click();
        // await page.getByRole('button', { name: '2023' }).click();
        // await page.getByText('2025', { exact: true }).click();
        // await page.getByText('January').click();
        // await page.getByText('1', { exact: true }).first().click();
        // await page.getByLabel('', { exact: true }).click();
        // await page.getByPlaceholder('Please Enter Mobile Number').click();
        // await page.getByPlaceholder('Please Enter Mobile Number').fill('50303262');
        // await page.getByRole('combobox').nth(2).selectOption('1890001');
        // await page.getByRole('button', { name: 'Add Partner' }).click();
        await page.waitForTimeout(2000);
        await page.getByText('Next').dblclick();
        await page.getByRole('heading', { name: '+ Add More Business Activity(s)' }).click();
        await page.getByPlaceholder('Please Enter Correct Business Activity').click();
        await page.getByPlaceholder('Please Enter Correct Business Activity').fill('flag');
        await page.getByText('Search').nth(2).click();
        await page.getByText('Business Industry Code: 995236').click();
        await page.getByText('Add Selected').click();
        await page.getByText('Next').click();
        await page.getByLabel('Non Arabic').check();
        await page.getByPlaceholder('Please Enter Trade Name (English)').click();
        await page.getByPlaceholder('Please Enter Trade Name (English)').press('CapsLock');
        await page.getByPlaceholder('Please Enter Trade Name (English)').fill('M');
        await page.getByPlaceholder('Please Enter Trade Name (English)').press('CapsLock');
        await page.getByPlaceholder('Please Enter Trade Name (English)').fill('NetMumbi');
        await page.locator('.scrollContainer').click();
      await page.getByText('Advertising').click();
    
        await page.getByLabel('I have read all the guidelines for choosing trade names and made sure that they are applied to the proposed names, especially that the trade name includes the purpose or activity and that the trade name is spoken in Arabic as it is in the English language and not a translation of it').check();
        await page.getByLabel('I have used the trade name search tool and made sure that the names you have chosen do not match the names already reserved').check();
        await page.getByRole('button', { name: ' Add Trade Name' }).click();
        await page.getByText('Next').click();
        await page.getByText('Please unclick here if you do not have a labor requirement at this stage.').click();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(10000);
        await page.getByRole('heading', { name: '+ Add Additional Signatories / Managers' }).click();
        await page.getByRole('combobox').selectOption('1190002');
        await page.getByRole('radio').check();
        await page.getByRole('checkbox').click();
        await page.waitForTimeout(2000);
        await page.getByRole('button', { name: ' Add Signatory / Manager' }).click();
        await page.locator('.col-xl-12 > .col-lg-6').first().click();
    
        await page.locator('#SignatoryModal').click();
        await page.getByLabel('Roles').selectOption('27063400056');
        await page.locator('#usrrul').nth(1).selectOption('1060031');
        await page.getByText('Full and Absolute Authority').click();
        await page.getByRole('button', { name: 'Add New Role & Responsibility' }).click();
        await page.getByText('Next').click();
        await page.waitForTimeout(9000);
        //Financial 
        await page.getByPlaceholder('Please Enter the Capital Total in QAR').click();
        await page.getByPlaceholder('Please Enter the Capital Total in QAR').fill('1000');
        await page.getByText('Employment').click();
        await page.getByPlaceholder('Please Enter the Cash Total Shares').click();
        await page.getByPlaceholder('Please Enter the Cash Total Shares').fill('100');
       await page.getByRole('row', { name: 'ABDULLA A.RAHMAN AL-HAMAD 0 0' }).getByRole('textbox').click();
        await page.getByRole('row', { name: 'ABDULLA A.RAHMAN AL-HAMAD 0 0' }).getByRole('textbox').clear();
        await page.getByRole('row', { name: 'ABDULLA A.RAHMAN AL-HAMAD 0 0' }).getByRole('textbox').fill('100');
         await page.getByPlaceholder('Please Enter the Cash Total Shares').clear();
        await page.getByPlaceholder('Please Enter the Cash Total Shares').fill('100');
        await page.getByRole('row', { name: 'ABDULLA A.RAHMAN AL-HAMAD 0 0' }).getByRole('textbox').click();
        await page.getByRole('row', { name: 'ABDULLA A.RAHMAN AL-HAMAD 0 0' }).getByRole('textbox').clear();
        await page.getByRole('row', { name: 'ABDULLA A.RAHMAN AL-HAMAD 0 0' }).getByRole('textbox').fill('100');

       // await page.getByRole('row', { name: 'ABDULLA A.RAHMAN AL-HAMAD 0 0' }).getByRole('textbox').click();
        // await page.getByRole('row', { name: 'ABDULLA A.RAHMAN AL-HAMAD 0 0' }).getByRole('textbox').fill('100');
        // await page.waitForTimeout(1000);
        // await page.getByPlaceholder('Please Enter the Cash Total Shares').clear();
        // await page.getByPlaceholder('Please Enter the Cash Total Shares').fill('100');
        // await page.waitForTimeout(2000);
        // await page.getByRole('row', { name: 'ABDULLA A.RAHMAN AL-HAMAD 0 0' }).getByRole('textbox').clear();
        // await page.getByRole('row', { name: 'ABDULLA A.RAHMAN AL-HAMAD 0 0' }).getByRole('textbox').fill('100');

        //await page.waitForTimeout(5000);
        // await page.locator("//button[normalize-space()='Back']").click();
        // await page.getByText('Next').click();
        // await page.waitForTimeout(2000);
        // await page.getByPlaceholder('Please Enter the Capital Total in QAR').click();
        // await page.getByPlaceholder('Please Enter the Capital Total in QAR').fill('1000');
        //  await page.waitForTimeout(2000);
        // await page.getByText('Employment').click();
        // await page.getByPlaceholder('Please Enter the Cash Total Shares').click();
        // await page.getByPlaceholder('Please Enter the Cash Total Shares').fill('100');
        // await page.waitForTimeout(2000);
        // await page.getByRole('row', { name: 'ABDULLA A.RAHMAN AL-HAMAD 0 0' }).getByRole('textbox').click();
        // await page.getByRole('row', { name: 'ABDULLA A.RAHMAN AL-HAMAD 0 0' }).getByRole('textbox').fill('100');
        
        await page.waitForTimeout(2000);
        await page.getByRole('button', { name: 'Confirm' }).click();
        //Company Information
        await page.getByPlaceholder('Email :').click();
        await page.getByPlaceholder('Email :').fill('asatti@malomatia.com');

        //General Tax Authority Registration Details
        // await page.getByPlaceholder('Please Enter Tax Contact Person Position').click();
        // await page.getByPlaceholder('Please Enter Tax Contact Person Position').press('CapsLock');
        // await page.getByPlaceholder('Please Enter Tax Contact Person Position').fill('T');
        // await page.getByPlaceholder('Please Enter Tax Contact Person Position').press('CapsLock');
        await page.getByPlaceholder('Please Enter Tax Contact Person Position').fill('Test');
        await page.getByPlaceholder(' Please Enter the Proper Value').click();
        await page.getByPlaceholder(' Please Enter the Proper Value').fill("1200");
        //await page.locator("input[placeholder='Please Enter the Proper Value']").fill("1200");
        await page.locator('app-gta').getByRole('textbox').nth(2).click();
        await page.getByText('10').first().click();
        await page.waitForTimeout(2000);
        await page.getByRole('combobox').selectOption('1');
        await page.getByRole('radio').check();
        await page.getByRole('button', { name: 'Next' }).click();
        await page.waitForTimeout(2000);
        //Contract type 
        await page.getByRole('heading', { name: 'Standard' }).click();
        await page.getByText('Next').click();
         //Add Beneficiary
        await page.getByRole('button', { name: 'Add Beneficiary' }).click();
        await page.getByRole('combobox').selectOption('1: Object');
        await page.getByRole('textbox').first().click();
        await page.getByRole('textbox').first().fill('27063400056');
        await page.getByRole('textbox').nth(1).click();
        await page.getByRole('button', { name: '2023' }).click();
        await page.getByText('2025').click();
        await page.getByText('January').click();
        await page.getByText('1', { exact: true }).first().click();
        await page.getByRole('button', { name: 'Get Person Details' }).click();
        await page.getByRole('button', { name: 'Add & Proceed to UBO Additional Info' }).click();
        await page.getByLabel('Place of Birth *').selectOption('1520006');
        await page.getByText('No', { exact: true }).nth(1).click();
        await page.getByPlaceholder('Please Enter the current residency address, In case not residing in Qatar').click();
        await page.getByPlaceholder('Please Enter the current residency address, In case not residing in Qatar').press('CapsLock');
        await page.getByPlaceholder('Please Enter the current residency address, In case not residing in Qatar').fill('T');
        await page.getByPlaceholder('Please Enter the current residency address, In case not residing in Qatar').press('CapsLock');
        await page.getByPlaceholder('Please Enter the current residency address, In case not residing in Qatar').fill('Test');
        await page.getByText('Exercises ruling control').click();
        await page.getByRole('button', { name: 'Save', exact: true }).click();
        await page.getByText('Next').click();


        // Upload attachment 
        await page.getByText('I have verified and confirmed the form data.').click();
        await page.getByText('Submit', { exact: true }).click();
        //Assertion to verify the SR submitted successfully
        const message= await page.locator(".animated.fadeInDown.finishedMessage.ng-star-inserted").textContent();
        expect("The request has been submitted successfully", message);
        //Print the result
        console.log("Appliction submitted message"+message);

    
});