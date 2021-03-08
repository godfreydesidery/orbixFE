import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CorporateCustomerService } from '../corporate-customer.service';
import { Data } from '../data';

@Component({
  selector: 'app-corporate-customers',
  templateUrl: './corporate-customers.component.html',
  styleUrls: ['./corporate-customers.component.css']
})
export class CorporateCustomersComponent implements OnInit {

  public customersNames: string [] = []
  public customers = {}

  /**
   * field variables
   */
  id           : any
  customerNo   : string
  customerName : string
  contactName  : string
  address      : string
  telephone    : string
  vatNo        : string
  creditLimit  : number
  creditDays   : number
  amountDue    : number
  

  constructor(private httpClient: HttpClient ) {
    this.id           = '';
    this.customerNo   = '';
    this.customerName = '';
    this.contactName = '';
    this.address      = '';
    this.telephone    = '';
    this.vatNo        = '';
    this.creditLimit  = null;
    this.creditDays   = null;
    this.amountDue    = null;
    
  }

  async ngOnInit(): Promise<void> {
    /**
     * Load customer names for autocompletion
     * PRE:Empty array of customers names
     * POS:A n array of customers names
     */
    ((new CorporateCustomerService(this.httpClient)).getCustomersNames())
    .then(
      res=>{
        Object.values(res).map((customerName:string)=>{
          this.customersNames.push(customerName)
        })
      }
    );
    this.customers = await (new CorporateCustomerService(this.httpClient)).getCustomers()
  }

  clear(){
    /**
     * clear the fields
     * PRE:empty / non empty fields
     * POS:empty fields
     */
    this.id           = '';
    this.customerNo   = '';
    this.customerName = '';
    this.contactName = '';
    this.address      = '';
    this.telephone    = '';
    this.vatNo        = '';
    this.creditLimit  = null;
    this.creditDays   = null;
    this.amountDue    = null;
  }

  getCustomerData(){
    /**
     * gets item data from inputs
     * RETURN customer object
     */
    var customerData = {
      id           :this.id,
      customerNo   :this.customerNo,
      customerName :this.customerName,
      contactName  :this.contactName,
      address      :this.address,
      telephone    :this.telephone,
      vatNo        :this.vatNo,
      creditLimit  :this.creditLimit,
      creditDays   :this.creditDays,
      amountDue    :this.amountDue
    }
    return customerData;
  }
  showCustomer(customer : any){
    
    /**
     * render customer information for display, these are displayed 
     * automatically using two way data binding
     */
    this.id           =customer['id']
    this.customerNo   =customer['customerNo']
    this.customerName =customer['customerName']
    this.contactName  =customer['contactName']
    this.address      =customer['address']
    this.telephone    =customer['telephone']
    this.vatNo        =customer['vatNo']
    this.creditLimit  =customer['creditLimit']
    this.creditDays   =customer['creditDays']
    this.amountDue    =customer['amountDue']
  }
  validateData(){
    /**
     * validates user inputs
     * return false if validation fails
     */
    var valid : boolean = true
    var message : string = ''
    if(this.customerNo == ''){
      valid = false
      message = message+'\nCustomer No is a required field!'
    }
    if(this.customerName == ''){
      valid = false
      message = message+'\nCustomer Name is a required field!'
    }
    if(this.address == ''){
      valid = false
      message = message+'\nCustomer Address is a required field!'
    }
    if(this.telephone == ''){
      valid = false
      message = message+'\nCustomer phone number is a required field!'
    }
    
    if (message != ''){
      alert('Error:'+message)
    }
    return valid
  }

  saveCustomer() { 
    /**
     * Create a new customer, or update an existing customer
     * First validate user input
     * 
     */
    if(this.validateData()==true){
      if( this.id == '' || this.id == null || this.id == 0 ) {
        //save a new customer
        this.httpClient.post(Data.baseUrl + "/customers" , this.getCustomerData())
        .subscribe(
          data=>{
            window.alert('Customer created successifully')
            this.id=data['id']
          },
          error=>{
            console.log(error)
            alert("Operation failed\nError Code:"+error['status']+"\n"+error['statusText'])
          }
        )
      } else {
        //update an existing customer
        this.httpClient.put(Data.baseUrl + "/customers/" + this.id , this.getCustomerData())
        .subscribe(
          data=>{
            window.alert('Customer updated successifully')
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
  async searchCustomer() { 
    /**
     * Search an existing customer by customer id
     * First determine the customer id using getCustomerId(), then searches
     * customer using respective supplier id
     */
    var customerId = null
    customerId = await (new CorporateCustomerService(this.httpClient)).getCustomerId(this.customerNo , this.customerName)
    if(customerId == null){
      if(this.customerNo == '' && this.customerName == ''){
        alert('Please enter a search key!')
      }else{
        alert('The requested record could not be found!')
      }
      
    }else{
      var customer =await (new CorporateCustomerService(this.httpClient)).getCustomer(customerId)
      this.showCustomer(customer)
    }
  }
  /**
   * 
   * @param id Search a the selected customer
   */
  async search(id : any){
    this.clear()
    var customer =await (new CorporateCustomerService(this.httpClient)).getCustomer(id)
    this.showCustomer(customer)
  }
  deleteCustomer() { 
    /**
     * Delete a customer given customer id
     * PRE:Customer record originally in the database
     * POS:Customer record removed from the database
     */
    var id = this.id
    if(id == ''){
      alert('Please select a customer to delete')
      return
    }
    if(window.confirm('Delete the selected customer?\nThe customer will be removed and this action can not be undone.\nConfirm?')){
      this.httpClient.delete(Data.baseUrl+"/customers/"+id)
      .subscribe(
        data=>{
          console.log(data)
          if(data==null){
            this.clear()
            alert('Customer Successiful deleted')
          }
        },
        error=>{
          alert('Could not delete the selected customer')
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
