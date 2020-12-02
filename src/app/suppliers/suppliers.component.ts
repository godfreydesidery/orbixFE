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

  public suppliersNames: string [] = []
  public suppliers = {}

  /**
   * field variables
   */
  id              : any
  supplierCode    : string
  supplierName    : string
  contactName     : string
  tin             : string
  vrn             : string
  termsOfPayment  : string
  postAddress     : string
  postCode        : string
  physicalAddress : string
  telephone       : string
  mobile          : string
  email           : string
  fax             : string
  bankAccountName : string
  bankPostAddress : string
  bankPostCode    : string
  bankName        : string
  bankAccountNo   : string
  bankStatus      : string

  constructor(private httpClient: HttpClient ) {
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

  async ngOnInit(): Promise<void> {
    /**
     * Load supplier names for autocompletion
     * PRE:Empty array of suppliers names
     * POS:A n array of supplier names
     */
    ((new SupplierService(this.httpClient)).getSuppliersNames())
    .then(
      res=>{
        Object.values(res).map((supplierName:string)=>{
          this.suppliersNames.push(supplierName)
        })
      }
    );
    this.suppliers = await (new SupplierService(this.httpClient)).getSuppliers()
  }

  clear(){
    /**
     * clear the fields
     * PRE:empty / non empty fields
     * POS:empty fields
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
     * RETURN supplier object
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
     * Validates user inputs
     * If validation fails,
     * display error message and return false
     * Otherwise, returns true
     */
    var valid : boolean = true
    var message : string = ''
    if(this.supplierCode == null || this.supplierCode == ''){
      valid = false
      message = "Supplier Code must not be empty!"
      alert("Error: "+message)
      return
    }
    if(this.supplierName == null || this.supplierName == ''){
      valid = false
      message = "Supplier Name must not be empty!"
      alert("Error: "+message)
      return
    }
    return valid
  }

  saveSupplier() { 
    /**
     * Create a new supplier, or update an existing supplier
     * First validate user input
     * 
     */
    if(this.validateData()==true){
      if( this.id == '' || this.id == null || this.id == 0 ) {
        //save a new supplier
        this.httpClient.post(Data.baseUrl + "/suppliers" , this.getSupplierData())
        .subscribe(
          data=>{
            window.alert('Supplier created successifully')
            this.id=data['id']
          },
          error=>{
            console.log(error)
            alert("Operation failed\nError Code:"+error['status']+"\n"+error['statusText'])
          }
        )
      } else {
        //update an existing supplier
        this.httpClient.put(Data.baseUrl + "/suppliers/" + this.id , this.getSupplierData())
        .subscribe(
          data=>{
            window.alert('Supplier updated successifully')
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
  async searchSupplier() { 
    /**
     * Search an existing supplier by supplier id
     * First determine the supplier id using getSupplierId(), then searches
     * supplier using respective supplier id
     */
    var supplierId = null
    supplierId = await (new SupplierService(this.httpClient)).getSupplierId(this.supplierCode , this.supplierName)
    if(supplierId == null){
      if(this.supplierCode == '' && this.supplierName == ''){
        alert('Please enter a search key!')
      }else{
        alert('The requested record could not be found')
      }
      
    }else{
      var supplier =await (new SupplierService(this.httpClient)).getSupplier(supplierId)
      this.showSupplier(supplier)
    }
  }
  /**
   * 
   * @param id Search a the selected supplier
   */
  async search(id : any){
    this.clear()
    var supplier =await (new SupplierService(this.httpClient)).getSupplier(id)
    this.showSupplier(supplier)
  }
  deleteSupplier() { 
    /**
     * Delete a supplier given supplier id
     * PRE:Supplier record originally in the database
     * POS:Supplier record removed from the database
     */
    var id = this.id
    if(id == ''){
      alert('Please select a supplier to delete')
      return
    }
    if(window.confirm('Delete the selected supplier?\nThe supplier will be removed and this action can not be undone.\nConfirm?')){
      this.httpClient.delete(Data.baseUrl+"/suppliers/"+id)
      .subscribe(
        data=>{
          console.log(data)
          if(data==null){
            this.clear()
            alert('Supplier Successiful deleted')
          }
        },
        error=>{
          alert('Could not delete the selected supplier')
        }
      )
    }
  }
  //not used
  lock : boolean = false
  lockInputs(){
    if(this.lock){
      this.lock = false
    }else if(!this.lock){
      this.lock = true
    }
  }
  
}
