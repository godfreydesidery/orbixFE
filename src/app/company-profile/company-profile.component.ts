import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CompanyProfileService } from '../company-profile.service';
import { Data } from '../data';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {


  public company = {}


  id                 : any
  companyName        : string
  companyLogo        : string
  tin                : string
  vrn                : string
  postAddress        : string
  postCode           : string
  physicalAddress    : string
  telephone          : string
  mobile             : string
  email              : string
  fax                : string
  bankAccountName    : string
  bankAccountAddress : string
  bankPostCode       : string
  bankName           : string
  bankAccountNo      : string

  constructor(private httpClient : HttpClient) { 
    this.id                 = ''
    this.companyName        = ''
    this.companyLogo        = ''
    this.tin                = ''
    this.vrn                = ''
    this.postAddress        = ''
    this.postCode           = ''
    this.physicalAddress    = ''
    this.telephone          = ''
    this.mobile             = ''
    this.email              = ''
    this.fax                = ''
    this.bankAccountName    = ''
    this.bankAccountAddress = ''
    this.bankPostCode       = ''
    this.bankName           = ''
    this.bankAccountNo      = ''
  }

  async ngOnInit(): Promise<void> {
    try{
      this.company = await (new CompanyProfileService(this.httpClient)).getCompany()
      
    }catch(e ){

    }
    this.showCompany(this.company)
    console.log(this.company)
    
  }

  clear(){
    /**
     * clear the fields
     * PRE:empty / non empty fields
     * POS:empty fields
     */
    this.id                 = ''
    this.companyName        = ''
    this.companyLogo        = ''
    this.tin                = ''
    this.vrn                = ''
    this.postAddress        = ''
    this.postCode           = ''
    this.physicalAddress    = ''
    this.telephone          = ''
    this.mobile             = ''
    this.email              = ''
    this.fax                = ''
    this.bankAccountName    = ''
    this.bankAccountAddress = ''
    this.bankPostCode       = ''
    this.bankName           = ''
    this.bankAccountNo      = ''
  }

  getCompanyData(){
    /**
     * gets item data from inputs
     * RETURN supplier object
     */
    var supplierData = {
      id                 : this.id,
      companyName        : this.companyName,
      companyLogo        : this.companyLogo,
      tin                : this.tin,
      vrn                : this.vrn,
      postAddress        : this.postAddress,
      postCode           : this.postCode,
      physicalAddress    : this.physicalAddress,
      telephone          : this.telephone,
      mobile             : this.mobile,
      email              : this.email,
      fax                : this.fax,
      bankAccountName    : this.bankAccountName,
      bankAccountAddress : this.bankAccountAddress,
      bankPostCode       : this.bankPostCode,
      bankName           : this.bankName,
      bankAccountNo      : this.bankAccountNo
    }
    return supplierData;
  }
  showCompany(company : any){
    
    /**
     * render supplier information for display, these are displayed 
     * automatically using two way data binding
     */
    this.id                 = company['id']
    this.companyName        = company['companyName']
    this.companyLogo        = company['companyLogo']
    this.tin                = company['tin']
    this.vrn                = company['vrn']
    this.postAddress        = company['postAddress']
    this.postCode           = company['postCode']
    this.physicalAddress    = company['physicalAddress']
    this.telephone          = company['telephone']
    this.mobile             = company['mobile']
    this.email              = company['email']
    this.fax                = company['fax']
    this.bankAccountName    = company['bankAccountName']
    this.bankAccountAddress = company['bankAccountAddress']
    this.bankPostCode       = company['bankPostCode']
    this.bankName           = company['bankName']
    this.bankAccountNo      = company['bankAccountNo']
  }
  validateData(){
    /**
     * validates user inputs
     * return false if validation fails
     */
    var valid : boolean = true
    var message : string = ''
    if(this.companyName == ''){
      valid = false
      message = message+'\nCompany Name must not be empty!'
    }
    
    
    if (message != ''){
      alert('Error:'+message)
    }
    return valid
  }

  saveCompany() { 
    /**
     * Save the company profile
     */
    if(this.validateData()==true){
      this.httpClient.post(Data.baseUrl + "/company" , this.getCompanyData())
      .subscribe(
        data=>{
          window.alert('Saved successifully')
          this.id=data['id']
        },
        error=>{
          console.log(error)
          alert("Operation failed\nError Code:"+error['status']+"\n"+error['statusText'])
        }
      )
    }
  }
}
