class CompanySearch
{
  
    constructor(page)
    {
        
        this.company=page.locator("input[placeholder='Search']");
       
      
    }
   async ListSearch(CP)
  {
    await this.company.fill(CP);
    
  }

  
}
module.exports={CompanySearch};