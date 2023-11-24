
const {LoginPage}=require('./LoginPage');
const {CompanySearch}=require('./CompanySearch');
const {Location}=require('./Location');
const {ServicesPayment}=require('./ServicesPayment');


class POManager
{
    constructor(page)
    {
        this.loginpage= new LoginPage(page);
        this.companyListSearch= new CompanySearch(page);
        this.location=new Location(page);
        this.payment= new ServicesPayment(page);
    }

    getLoginPage()
    {
        return this.loginpage;
    }

    getCompanySearch()
    {
        return this.companyListSearch;
    }
    getLocation()
    {
        return this.location();
    }
    getPayment()
    {
        return this.payment;
    }
}
module.exports={POManager};