class Location
{
  
    constructor(page)
    {
    this.page=page;   
    this.locationArea= page.locator("input[placeholder='Please Enter Location Area']");
    this.propertyDeedNumber= page.locator("input[placeholder='Please Enter Property Deed Number']");
    this.buildingCompletionCertificateNumber= page.locator("input[placeholder='Please Enter the Proper Value']");
    this.buildingCompletionDate= page.locator("//*[@id='layoutContainers']/div/div[2]/div[1]/div/section/div[2]/app-root/app-add-sub-cp/div/main/div/div[2]/div[2]/div/div/div/app-location/div/div[2]/div[6]/div/input");
    this.buildingNo= page.locator("input[placeholder=' Please Enter Building No']");
    this.floorNo= page.locator("input[placeholder=' Please Enter Floor']");
    this.landNo= page.locator("input[placeholder=' Please Enter Land No. (PIN)']");
    this.buildingOwnerName= page.locator("input[placeholder='Please Enter Building Owner Name[Arbic]']");
    this.buidlingOwnerEnglishName=page.locator("input[placeholder='Please Enter Building Owner Name[English]']");
    this.kharmaNo=page.locator("input[placeholder='Please Enter Kahrama No']");
    this.unitNo=page.locator("input[placeholder='Please Enter Unit No']");
    this.addressDescription=page.locator("textarea[placeholder='Please Enter Address Description']");
    this.responsibleManagerExisting=page.locator("input[class='ng-pristine ng-valid ng-touched']");
    this.waiting=page.waitForTimeout(2000);
    this.zoneNo=this.page.locator("div[class='col-6 select-box'] select[class='form-control ng-valid ng-dirty ng-touched']");
     
    }
   async locationFill(subCP)
  {
      //Location Information 
      const locationMainClassification= this.page.locator("//*[@id='layoutContainers']/div/div[2]/div[1]/div/section/div[2]/app-root/app-resume-cp/div/main/div/div/div[2]/div/div/app-step-two/app-location/div/div[2]/div[1]/div/select");
      await locationMainClassification.selectOption("Industrial");
      const locationSubClassification =this.page.locator("//*[@id='layoutContainers']/div/div[2]/div[1]/div/section/div[2]/app-root/app-resume-cp/div/main/div/div/div[2]/div/div/app-step-two/app-location/div/div[2]/div[2]/div/select");
      await locationSubClassification.selectOption("Factory");
      await this.locationArea.fill("200");
      await this.propertyDeedNumber.fill("3333");
      await this.buildingCompletionCertificateNumber.fill("557799");
      const propertyType =await this.page.locator("//*[@id='layoutContainers']/div/div[2]/div[1]/div/section/div[2]/app-root/app-resume-cp/div/main/div/div/div[2]/div/div/app-step-two/app-location/div/div[2]/div[7]/div/select");
      await propertyType.selectOption("Private Property");
  
       //Adress Information 
      const municipalityName = await this.page.locator("//*[@id='layoutContainers']/div/div[2]/div[1]/div/section/div[2]/app-root/app-resume-cp/div/main/div/div/div[2]/div/div/app-step-two/app-location/div/div[3]/div[2]/div/select");
      await municipalityName.selectOption("AL DOHA MUNICIPALITY");
      await this.zoneNo.selectOption("37");
      const districtName= await this.page.locator("//*[@id='ditrictnum']");
      await districtName.selectOption("Fereej Bin Omran");
      const street= await this.page.locator("//*[@id='streetnum']");
      await street.selectOption("852 - Abu Al Fateh ");
      await this.buildingNo.fill("38");
      await this.floorNo.fill("2");
      await this.landNofill("234455");
      await this.buildingOwnerName.fill("كريم");
      await this.buidlingOwnerEnglishNamefill("Kareem");
      await this.kharmaNo.fill("200200");
      await this.unitNo.fill("22334");
      await this.addressDescription.fill("Test");

    }
    
  }
module.exports={Location};