class LoginPage
{
  
    constructor(page)
    {
        this.page=page;
        this.loginButton=page.locator("//a[@id='loginLink']");
        this.userName= page.locator("#username");
        this.password= page.locator("#password");
        
       
      
    }
   async goto()
  {
    await this.page.goto("https://stginvestor.sw.gov.qa/");
    await this.loginButton.click();
  
  }

    async validLogin(userName, password)
    {     
      //login
      await this.userName.fill(userName);
      await this.password.fill(password);
     
    }
  
}
module.exports={LoginPage};