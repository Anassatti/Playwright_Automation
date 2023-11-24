class ServicesPayment
{
    constructor(page)
    {
        this.page=page;
        this.requestNumber=page.locator("#requestNumber");
        this.search=page.locator("#submitBtn");
    

    }


    async paymentService(SubmittedSR)
    {
    //Starting payment process    
    const context = await browser.newContext();
    const page = await context.newPage();
  

    await this.page.locator("#requestNumber").fill(SubmittedSR);
    await this.page.waitForTimeout(3000);
    await this.search.click();
  //  await this.page.locator(".ng-binding[target='_blank']").click();
   // await this.page.waitForTimeout(3000);
              
    //Handling new page- Request tasks
    const pagePromise = context.waitForEvent('page');
    await page.locator(".ng-binding[target='_blank']").click();
    const newPage = await pagePromise;
    await newPage.waitForLoadState();
   // await newPage.locator("//a[normalize-space()='Pay']").click();  

    //Open Payment Details Page
    const pagePromise1 = context.waitForEvent('page');
    await newPage.locator("//a[normalize-space()='Pay']").click();  
    const paymentDetails = await pagePromise1;
    await paymentDetails.waitForLoadState();
    await paymentDetails.locator("#onlinePayment").click();  

        //fill payment details
    await this.page.locator("#details-button").click();
    await this.page.locator("#proceed-link").click();
    await this.page.waitForTimeout(3000);
    await this.page.locator("#bill_to_forename").fill("Anas");
    await this.page.locator("#bill_to_surname").fill("Satti");
    await this.page.locator("#bill_to_address_line1").fill("Qatar");
    await this.page.locator("#bill_to_address_city").fill("Doha");
    await this.page.locator("#bill_to_address_country").selectOption("Qatar");
    await this.page.locator("#bill_to_phone").fill("0097450303262");
    await this.page.locator("#bill_to_phone").fill("0097450303262");
    await this.page.locator("#bill_to_email").fill("asatti@malomatia.com");
    await this.page.locator("#card_type_002").check();
    await this.page.locator("#card_number").fill("2222400060000007");
    await this.page.locator("#card_expiry_month").selectOption("03");
    await this.page.locator("#card_expiry_year").selectOption("2030");
    await this.page.locator("#card_cvn").fill("737");
    await this.page.locator("input[value='Pay']").click();
    await page.waitForLoadState("networkidle");

    //Assertion- successfully cancelled
    const successMessage= await newPage.locator(".alert.alert-success").textContent();
    expect("The has been canceled successfully", successMessage);
    }

}
module.exports={ServicesPayment};