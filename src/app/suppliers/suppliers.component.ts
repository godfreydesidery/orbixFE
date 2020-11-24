import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Data } from '../data';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.css']
})
export class SuppliersComponent implements OnInit {

  /**
   * field variables
   */
  id
  supplierCode
  supplierName
  contactName
  tin
  vrn
  termsOfPayment
  postAddress
  postCode
  physicalAddress
  telephone
  mobile
  email
  fax
  bankAccountName
  bankPostAddress
  bankPostCode
  bankName
  bankAccountNo
  bankStatus

  constructor(private httpClient: HttpClient ) {
    this.id               ='';
    this.supplierCode     ='';
    this.supplierName     ='';
    this.contactName     ='';
    this.tin              ='';
    this.vrn              ='';
    this.termsOfPayment   ='';
    this.postAddress      ='';
    this.postCode         ='';
    this.physicalAddress  ='';
    this.telephone        ='';
    this.mobile           ='';
    this.email            ='';
    this.fax              ='';
    this.bankAccountName  ='';
    this.bankPostAddress  ='';
    this.bankPostCode     ='';
    this.bankName         ='';
    this.bankAccountNo    ='';
    this.bankStatus       ='';
  }

  clear(){
    /**
     * clear the fields
     */
    this.id               ='';
    this.supplierCode     ='';
    this.supplierName     ='';
    this.contactName      ='';
    this.tin              ='';
    this.vrn              ='';
    this.termsOfPayment   ='';
    this.postAddress      ='';
    this.postCode         ='';
    this.physicalAddress  ='';
    this.telephone        ='';
    this.mobile           ='';
    this.email            ='';
    this.fax              ='';
    this.bankAccountName  ='';
    this.bankPostAddress  ='';
    this.bankPostCode     ='';
    this.bankName         ='';
    this.bankAccountNo    ='';
    this.bankStatus       ='';
  }

  getSupplierData(){
    /**
     * gets item data from inputs
     */
    var supplierData = {
      id               :this.id,
      supplierCode     :this.supplierCode,
      supplierName     :this.supplierName,
      contactName      :this.contactName,
      tin              :this.tin,
      vrn              :this.vrn,
      termsOfPayment   :this.termsOfPayment,
      postAddress      :this.postAddress,
      postCode         :this.postCode,
      physicalAddress  :this.physicalAddress,
      telephone        :this.telephone,
      mobile           :this.mobile,
      email            :this.email,
      fax              :this.fax,
      bankAccountName  :this.bankAccountName,
      bankPostAddress  :this.bankPostAddress,
      bankPostCode     :this.bankPostCode,
      bankName         :this.bankName,
      bankAccountNo    :this.bankAccountNo,
      bankStatus       :this.bankStatus
    }
    return supplierData;
  }
  showSupplier(supplier){
    
    /**
     * render supplier information for display, these are displayed 
     * automatically using two way data binding
     */
    this.id               =supplier['id']
    this.supplierCode     =supplier['supplierCode']
    this.supplierName     =supplier['supplierName']
    this.contactName      =supplier['contactName']
    this.tin              =supplier['tin']
    this.vrn              =supplier['vrn']
    this.termsOfPayment   =supplier['termsOfPayment']
    this.postAddress      =supplier['postAddress']
    this.postCode         =supplier['postCode']
    this.physicalAddress  =supplier['physicalAddress']
    this.telephone        =supplier['telephone']
    this.mobile           =supplier['mobile']
    this.email            =supplier['email']
    this.fax              =supplier['fax']
    this.bankAccountName  =supplier['bankAccountName']
    this.bankPostAddress  =supplier['bankPostAddress']
    this.bankPostCode     =supplier['bankPostCode']
    this.bankName         =supplier['bankName']
    this.bankAccountNo    =supplier['bankAccountNo']
    this.bankStatus       =supplier['bankStatus']
  }
  validateData(){
    /**
     * validates user inputs
     * return false if validation fails
     */
    var valid : boolean = true
    
    
    return valid
  }

  saveSupplier() { 
    /**
     * create or update an item
     * first, check validation
     */
    if(this.validateData()==true){
      if( this.id == '' || this.id == null || this.id == 0 ) {
        //save a new supplier
        this.httpClient.post(Data.baseUrl + "/suppliers" , this.getSupplierData())
        .subscribe(
          data=>{
            window.alert('Supplier created successifully')
            console.log(data)
            this.id=data['id']
          },
          error=>{
            console.log(error)
          }
        )
      } else {
        //update an existing supplier
        this.httpClient.put(Data.baseUrl + "/suppliers/" + this.id , this.getSupplierData())
        .subscribe(
          data=>{
            window.alert('Supplier updated successifully')
            console.log(data)
            this.id=data['id']
          },
          error=>{
            console.log(error)
          }
        )
      }  
    }
  }
  async searchSupplier() { 
    /**
     * search supplier by id
     * gets id from getSupplierId
     */
    var supplierId=0
    this.clear
    supplierId = await (new SupplierService(this.httpClient)).getSupplierId(this.supplierCode , this.supplierName)
    if(supplierId==0||supplierId==null){
      alert('No matching record')
    }else{
      var supplier
      supplier =await (new SupplierService(this.httpClient)).getSupplier(supplierId)
      console.log(supplier)
      this.showSupplier(supplier)
    }
  }
  deleteSupplier() { 
    /**
     * delete an item given its id
     */
    var id = this.id
    this.httpClient.delete(Data.baseUrl+"/suppliers/"+id)
    .subscribe(
      data=>{
        console.log(data)
        if(data==null){
          this.clear()
          alert('Supplier successifully deleted')
        }
      },
      error=>{
        console.log(error)
      }
    )
  }

  ngOnInit(): void {}

}
