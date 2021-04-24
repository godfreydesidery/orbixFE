import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CorporateCustomerService } from '../corporate-customer.service';
import { Data } from '../data';

@Component({
  selector: 'app-allocation',
  templateUrl: './allocation.component.html',
  styleUrls: ['./allocation.component.css']
})
export class AllocationComponent implements OnInit {

  public customersNames: string [] = []
  public customers = {}

  _new : boolean = true

  id : any
  allocationNo : string
  allocationDate : Date
  allocationAmount : number

  invId : any
  invoiceNo : string
  invoiceDate : Date
  invoiceAmount : number
  invoiceAmountPayed : number
  invoiceAmountDue : number
  invoiceDueDate : Date
  invoiceStatus : string
  


  custId   : any
  customerNo   : string
  customerName : string
  contactName  : string
  address      : string
  telephone    : string
  vatNo        : string
  creditLimit  : number
  invoiceLimit :number
  creditDays   : number
  outstandingBalance    : number
  amountUnallocated : number
  discountRate :number
  discountStartDate : Date
  discountEndDate : Date
  priceMargin :number
  priceMarginStartDate : Date
  priceMarginEndDate : Date

  constructor(private httpClient : HttpClient) {
    this.id               = null
    this.allocationNo     = ''
    this.allocationDate   = new Date()
    this.allocationAmount = null

    
    this.invId               = null
    this.invoiceNo           = ''
    this.invoiceDate         = null
    this.invoiceAmount       = null
    this.invoiceAmountPayed  = null
    this.invoiceAmountDue    = null
    this.invoiceDueDate      = null
    this.invoiceStatus       = ''
  
   



    this.custId               = ''
    this.customerNo           = ''
    this.customerName         = ''
    this.contactName          = ''
    this.address              = ''
    this.telephone            = ''
    this.vatNo                = ''
    this.creditLimit          = null
    this.creditDays           = null
    this.outstandingBalance            = null
    this.amountUnallocated    = null
    this.invoiceLimit         = null
    this.discountRate         = null
    this.discountStartDate    = null
    this.discountEndDate      = null
    this.priceMargin          = null
    this.priceMarginStartDate = null
    this.priceMarginEndDate   = null
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
     this.customers = await (new CorporateCustomerService(this.httpClient)).getCustomers();
  }

  newAllocation(){
    this._new = true
    this.clearAllocation()
    this.clearInvoice()
    this.clearCustomer()
    this.unlockCustomer()
    this.lockInvoice()
    this.unlockValue()
    
    this.allocationNo = this.generateAllocationNo()
  }

  async allocate(){
    
    if(window.confirm('Saving allocation. Confirm?') == false){
      return
    }
    this.allocationDate = new Date()
    
    //alert(this.allocationDate)
    if(this.allocationDate == null){
      //alert('Please enter allocation date')
      //return
    }
    if(this.allocationAmount <= 0){
      alert('Invalid Amount')
      return
    }
    await this.httpClient.post(Data.baseUrl + "/allocations" , this.getAllocationData())
    .toPromise()
    .then(
      data => {
        this.searchCustomerByNo()
        this.searchInvoiceByInvoiceNoAndCustomerNo()
        this.lockInvoice()

        alert('Allocation '+data['allocationNo']+ ' successifully allocated.')

        this.allocationAmount = 0
        this.lockValue()
        
       // alert('Receipt No: '+data['receiptNo']+' Received successifully')
      }
    )
    .catch(
      error => {
        alert(error['error']);
        console.log(error)
      }
    )
  }

  getAllocationData(){
    return {
      allocationNo : this.allocationNo,
      allocationDate : this.allocationDate,
      allocationAmount : this.allocationAmount,
      customer : {
        custId : this.custId,
        customerNo : this.customerNo,
        customerName : this.customerName
      },
      customerInvoice : {
        invId : this.invId,
        invoiceNo : this.invoiceNo,
        invoiceDate : this.invoiceDate,
        invoiceAmount : this.invoiceAmount,
        invoiceAmountPayed : this.invoiceAmountPayed,
        invoiceAmountDue : this.invoiceAmountDue,
        invoiceDueDate : this.invoiceDueDate,
        invoiceStatus : this.invoiceStatus
      }
    }
  }



  generateAllocationNo(){
    /**Generate a unique Invoice No */

		var anysize = 5;//the size of string 
		var charset1 = "123456789"; //from where to create
		var charset2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

		var result1="";
		var result2=""
		for( var i=0; i < anysize; i++ )
			result1 += charset1[Math.floor(Math.random() * charset1.length)];
		for( var i=0; i < 1; i++ )
			result2 += charset2[Math.floor(Math.random() * charset2.length)];
		return "ALC-"+result1+result2
  }

  clearAllocation(){
    this.id               = null
    this.allocationNo     = ''
    this.allocationDate   = null
    this.allocationAmount = null
  }

  clearInvoice(){
    this.invId               = null
    this.invoiceNo           = ''
    this.invoiceDate         = null
    this.invoiceAmount       = null
    this.invoiceAmountPayed  = null
    this.invoiceAmountDue    = null
    this.invoiceDueDate      = null
    this.invoiceStatus       = ''
  }

  async searchInvoiceByInvoiceNoAndCustomerNo(){
    var invoice = null
    await this.httpClient.get(Data.baseUrl+"/customer_invoices/invoice_no="+this.invoiceNo+"/customer_no="+this.customerNo)
    .toPromise()
    .then(
      data => {
        invoice = data
        this.showInvoice(invoice)
        this.lockInvoice()
        this._new = false
      }
    )
    .catch(
      error => {
        alert(error['error'])
        console.log(error)
      }
    )
    


  }

  showInvoice(invoice : any){
    this.invId              = invoice['id']
    this.invoiceNo          = invoice['invoiceNo']
    this.invoiceDate        = invoice['invoiceDate']
    this.invoiceAmount      = invoice['invoiceAmount']
    this.invoiceAmountPayed = invoice['invoiceAmountPayed']
    this.invoiceAmountDue   = invoice['invoiceAmountDue']
    this.invoiceStatus      = invoice['invoiceStatus']
    this.invoiceDueDate     = invoice['invoiceDueDate']

  }


  clearCustomer(){
    this.custId='';
    this.customerNo   = '';
    this.customerName = '';
    this.contactName = '';
    this.address      = '';
    this.telephone    = '';
    this.vatNo        = '';
    this.creditLimit  = null;
    this.creditDays   = null;
    this.outstandingBalance    = null;
    this.amountUnallocated = null
    this.invoiceLimit = null
    this.discountRate = null
    this.discountStartDate = null
    this.discountEndDate = null
    this.priceMargin = null
    this.priceMarginStartDate = null
    this.priceMarginEndDate = null
  }


  searchCustomerByName(){
    this.customerNo = ''
    this.searchCustomer()
  }
  searchCustomerByNo(){
    this.customerName = ''
    this.searchCustomer()
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
        alert('The requested record could not be found')
      }
      
    }else{
      var customer =await (new CorporateCustomerService(this.httpClient)).getCustomer(customerId)
      this.showCustomer(customer)
      this.lockCustomer()
      if(this._new == true){
        this.unlockInvoice()
      }
      
    }
  }
  async searchCustomerById(custId : any) { 
    /**
     * Search an existing customer by customer id
     * First determine the customer id using getCustomerId(), then searches
     * customer using respective supplier id
     */
    var customer =await (new CorporateCustomerService(this.httpClient)).getCustomer(custId)
      this.showCustomer(customer)
    
  }
  showCustomer(customer : any){
    
    /**
     * render customer information for display, these are displayed 
     * automatically using two way data binding
     */
    this.custId   =customer['id']
    this.customerNo   =customer['customerNo']
    this.customerName =customer['customerName']
    this.contactName  =customer['contactName']
    this.address      =customer['address']
    this.telephone    =customer['telephone']
    this.vatNo        =customer['vatNo']
    this.creditLimit  =customer['creditLimit']
    this.creditDays   =customer['creditDays']
    this.outstandingBalance    =customer['outstandingBalance']
    this.amountUnallocated = customer['amountUnallocated']
    this.invoiceLimit=customer['invoiceLimit']
    this.discountRate = customer['discountRate']
    this.discountStartDate=customer['discountStartDate']
    this.discountEndDate = customer['discountEndDate']
    this.priceMargin = customer['priceMargin']
    this.priceMarginStartDate=customer['priceMarginStartDate']
    this.priceMarginEndDate = customer['priceMarginEndDate']
  }



  /**Lock variables */
	lockedInvoice : boolean = true
	lockedCustomer: boolean = true

  lockedBarcode : boolean = false
  lockedItemCode : boolean = false
  lockedDescription : boolean = false

  lockedValue : boolean = true
	
	private lockInvoice(){
		this.lockedInvoice = true
	}
	private lockCustomer(){
		this.lockedCustomer = true
	}
	
	private unlockInvoice(){
		this.lockedInvoice = false
	}
	private unlockCustomer(){
		this.lockedCustomer = false
	}
  private lockDetail(){
    this.lockedBarcode     = true
    this.lockedItemCode     = true
    this.lockedDescription = true
  }
  private unlockDetail(){
    this.lockedBarcode     = false
    this.lockedItemCode     = false
    this.lockedDescription = false
  }
  private lockValue(){
    this.lockedValue = true
  }
  private unlockValue(){
    this.lockedValue = false
  }

}
