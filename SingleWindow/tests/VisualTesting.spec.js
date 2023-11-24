const {test,expect } = require('@playwright/test');
const {POManager}=require('../PageObjects/POManager');
const { timeStamp } = require('console');
const Paths = require('path');
const testdata=JSON.parse(JSON.stringify(require('../PageObjects/TestData.json')));

test('VisualTesting_Single Window', async ({ page }) => {

  //Maximize Browser
       await page.viewportSize(1536 );
      await page.viewportSize(835);
    
      // for(let i=0;i<10;++i)
      // { 
      //   //const millisStart = timeStamp;
      //   page.screenshot("test.png");
      // }
      const signButton=page.locator("input[value='Continue']");
      const continueButton=page.locator("button[name='submitButton']");
      const poManager= new POManager(page);
      //Login access
      const loginpage= poManager.getLoginPage();
      await loginpage.goto();
      await page.screenshot("screen89.png")

      await loginpage.validLogin(testdata.username,testdata.password);
     
      await signButton.click();
     
      await continueButton.click();
  
 // await page.waitForTimeout(2000);
expect(await page.screenshot()).toMatchSnapshot()
//expect(await page.screenshot("")).toMatchSnapshot();
//const millisStart = timeStamp;

//page.screenshot().setPath(Paths("C:/Users/asatti/Desktop/SW/Playwright/Screenshots/" + millisStart + ".png")).setFullPage(true);
//await page.screenshot("screen89.png")


});