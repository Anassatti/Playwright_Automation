import { test, expect } from '@playwright/test';
const {POManager}=require('../PageObjects/POManager');
const testdata=JSON.parse(JSON.stringify(require('../PageObjects/TestData.json')));

test('Regression_TC015_Resume Factory establishment without initial approval', async ({ browser }) => {

       //Maximize Browser
       const context = await browser.newContext();
       const page = await context.newPage();
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
        await page.getByText('Resume Factory Establishment').click();
        await page.getByText('Start the service ( Resume Factory Establishment )').click();
        

       //Start Resume Factory establishment 
       // Factory search list
        await page.getByPlaceholder('Search').click();
        await page.getByPlaceholder('Search').fill(testdata.ResumeFactory);
        //await page.getByRole('row', { name: 'faktwry for metal goods manufacturing فاكتوري لصناعة المنتجات المعدنية 40000555 Resume Factory Establishment' }).getByRole('button').click();
        await page.getByRole('button', { name: 'Resume Factory Establishment' }).click();
        //Applicant Info
        await page.getByText('Next').click();
        //Identification Documents Updates
        // await page.getByRole('textbox').click();
        // await page.getByRole('button', { name: '2023' }).click();
        // await page.getByText('2025').click();
        // await page.getByText('January').click();
        // await page.getByText('1', { exact: true }).click();
        await page.getByText('Next').click();
         //Approvals 
         await page.getByRole('checkbox').check();
         await page.getByPlaceholder('Approval No').click();
         await page.getByPlaceholder('Approval No').fill('5555');
         await page.getByRole('textbox').nth(1).click();
         await page.getByText('2', { exact: true }).first().click();
         await page.getByRole('textbox').nth(2).click();
         await page.getByText('25').click();
         await page.getByText('Next').click();
         
        await page.waitForTimeout(2000);
        //Upload Documents 
        
        const fileChooserPromise10 = page.waitForEvent('filechooser');
        await page.locator("(//button[@id='fileUpload'])[1]").click();
        const fileChooser1 = await fileChooserPromise10;
        await fileChooser1.setFiles("tests/Attachments/Agreement2.pdf");
        await page.getByText('Next').click();

        //Agree on term and condition, submit
        await page.getByText('I have verified and confirmed the form data.').click();
        await page.locator("//a[normalize-space()='Submit']").click();

        //Assertion to verify the SR submitted successfully
        // await page.waitForTimeout(2000);
        const message= await page.locator(".animated.fadeInDown.finishedMessage.ng-star-inserted").textContent();
        expect("The request has been submitted successfully", message);
        //Print the result
        console.log("Appliction submitted message"+message);
        //Extract SR number 
        await page.waitForTimeout(2000);
        const SubmittedSR= message.split("is");
        const SR=SubmittedSR[1].split("]")[0];
        const SRNo= SR.split("[")[1];
         // Waiting untill next aproval step upload
        await page.waitForTimeout(70000);

        //Action Center land Details

        await page.getByRole('button', { name: 'Go to Action Center' }).click();
        await page.locator("input[placeholder='Filter By Request Id']").click();
        await page.locator("input[placeholder='Filter By Request Id']").fill(SRNo);
        await page.locator('.btn').first().click();
        await page.locator('#permitNo').click();
        await page.locator('#permitNo').fill('66778888');
        await page.locator('#permitDate').click();
        await page.getByText('15', { exact: true }).click();
       // await page.getByText('15').click();
        await page.getByRole('button', { name: 'Next' }).click();
        // Upload attachment
        const fileChooserPromise = page.waitForEvent('filechooser');
        await page.locator("//div[@class='d-block']").click();
        const fileChooser3 = await fileChooserPromise;
        await fileChooser3.setFiles("tests/Attachments/Agreement3.pdf");
        await page.getByRole('button', { name: 'Submit' }).click();
        
        //Go back to Action Center
        //await page.locator("//a[normalize-space()='Action Center']").click();
       // await page.locator(".draw.meet[routerlink='/dashboard/actioncenter']").click();
       await page.locator("//*[@id='navbarNav']/ul/li[1]/a").click();
       //await page.getByRole('button', { name: 'Action Center' }).click();
        await page.locator("input[placeholder='Filter By Request Id']").click();
        await page.locator("input[placeholder='Filter By Request Id']").fill(SRNo);
       // await page.locator('.btn').first().click();
         await page.locator("//tab[1]//div[1]//div[1]//div[1]//div[2]//a[1]").click();
        await page.getByLabel('No').click();
        await page.getByRole('combobox').selectOption('1750001');
        await page.getByRole('button', { name: 'Next' }).dblclick();

           //Upload land attachments
           //Attachment one
         const fileChooserPromise2 = page.waitForEvent('filechooser');
         await page.locator("//tbody/tr[1]/td[3]/button[1]/div[1]").click();
         const fileChooser4 = await fileChooserPromise2;
         await fileChooser4.setFiles("tests/Attachments/Agreement.pdf");
         //Attachment 2
         const fileChooserPromise3 = page.waitForEvent('filechooser');
         await page.locator("(//button[@type='button'])[6]").click();
         const fileChooser5 = await fileChooserPromise3;
         await fileChooser5.setFiles("tests/Attachments/Dec.pdf");
        await page.getByRole('button', { name: 'Submit' }).dblclick();
       // await page.waitForTimeout(30000);

        // Start approval process- Approval portal

        //Opne Approval portal
        await page.goto('https://stgap.sw.gov.qa/');
        await page.getByRole('link', { name: 'Login' }).click();
        //await page.getByRole('button', { name: 'Continue' }).click();
        await continueButton.click();
        // await page.getByRole('link', { name: 'Login' }).click();
        // await page.getByRole('button', { name: 'Continue' }).click();
        // Waiting untill next aproval step upload
        await page.waitForTimeout(90000);

        await page.getByRole('button', { name: 'MOCI - Industrial Zones Dept.' }).click();
        await page.locator('.form-filter').first().click();
        await page.locator('.form-filter').first().fill(SRNo);
        await page.getByRole('link', { name: SRNo}).click();
        await page.getByRole('button', { name: 'Claim Request' }).click();
        await page.locator('#approvalNumberId').click();
        await page.locator('#approvalNumberId').fill('1234');
        await page.locator('#approvalDurationRadio').nth(1).check();
        await page.getByText('Months').click();
        await page.locator('#months').click();
        await page.locator('#months').fill('12');
        await page.locator('#approvalStartDate').click();
        await page.getByRole('link', { name: '11', exact: true }).click();
        await page.locator('#approvalAttachmentsBtn').setInputFiles('tests/Attachments/Agreement.pdf');
        await page.getByRole('button', { name: 'Confirmation' }).click();
        await page.getByRole('button', { name: 'Ok' }).click();
        await page.locator("a[href='/wps/portal/approvals/home']").click();

        // Waiting untill next aproval step upload
       //await page.waitForTimeout(25000);

        await page.getByRole('button', { name: 'MOCI - Industrial Development Dept.' }).click();
        await page.locator('.form-filter').first().click();
        await page.locator('.form-filter').first().fill(SRNo);
        await page.getByRole('link', { name: SRNo}).click();
        await page.getByRole('button', { name: 'Claim Request' }).click();
        await page.locator('#approvalNumberId').click();
        await page.locator('#approvalNumberId').fill('1233444');
        await page.locator('#approvalDurationRadio').nth(1).check();
        await page.locator('#months').click();
        await page.locator('#months').click();
        await page.locator('#months').fill('12');
        await page.locator('#approvalStartDate').click();
        await page.getByRole('link', { name: '11', exact: true }).click();
        await page.locator('#approvalAttachmentsBtn').setInputFiles('tests/Attachments/Agreement2.pdf');
        await page.getByRole('button', { name: 'Confirmation' }).click();
        await page.getByRole('button', { name: 'Ok' }).click();

         // Waiting untill next aproval step upload
        // await page.waitForTimeout(25000);

        //Open counter portal for payment
          //Login access
          await page.goto("https://stgcounter.sw.gov.qa/");
          await continueButton.click();

      //Starting payment process    
         await page.locator("#requestNumber").fill(SRNo);
         await page.locator("#submitBtn").click();

     //Handling new page- Request tasks
        const pagePromise = context.waitForEvent('page');
        await page.locator(".ng-binding[target='_blank']").click();
        const Newpage = await pagePromise;
        await Newpage.getByRole('link', { name: 'Pay' }).click();
        await Newpage.getByRole('button', { name: 'Pay Online' }).click();

        //Open Payment gateway, and fill Billing Information
        // await Newpage.getByLabel('First Name *').click();
        // await Newpage.getByLabel('First Name *').click();
        await Newpage.getByLabel('Address Line 1 *').click();
        await Newpage.getByLabel('Address Line 1 *').fill('Qatar');
       // await Newpage.getByLabel('City *').click();
        //await Newpage.getByLabel('City *').fill('Doha');
        await Newpage.getByLabel('Country/Region *').selectOption('QA');
        await Newpage.getByLabel('Phone Number *').click();
        await Newpage.getByLabel('Phone Number *').fill('50303262');
        await Newpage.locator("#bill_to_email").fill("asatti@malomatia.com");
        // await Newpage.getByLabel('Email *').fill('asatti@malomatia.com');      
        await Newpage.getByLabel('Mastercard').check();
        await Newpage.getByLabel('Card Number *').click();
        await Newpage.getByLabel('Card Number *').fill('2222400060000007');
        await Newpage.getByLabel('Expiration Month *').selectOption('03');
        await Newpage.getByLabel('Expiration Year *').selectOption('2030');
        await Newpage.getByLabel('CVN *').click();
        await Newpage.getByLabel('CVN *').fill('737');
        await Newpage.getByRole('button', { name: 'Pay' }).click(); 

        //Assertion- Verify Resume Factory is completed
        const Finalmessage=  await Newpage.getByText('Success! Payment completed successfully. You can download your receipt and certi').textContent();
        expect("Success! Payment completed successfully", Finalmessage);

        console.log("Regression_TC015_Resume Factory establishment without initial approval, See you in the next release")

       
});
