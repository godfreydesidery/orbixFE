import { HttpClient } from '@angular/common/http';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CorporateCustomerService } from '../corporate-customer.service';

@Component({
  selector: 'app-sales-receipt',
  templateUrl: './sales-receipt.component.html',
  styleUrls: ['./sales-receipt.component.css']
})
export class SalesReceiptComponent implements OnInit {
  @ViewChild('chequePayment', {static:true}) chequePayment: ElementRef;

  

  public customersNames: string [] = []
  public customers = {}

  id : any
  receiptNo : string
  receiptDate : Date
  receiptAmount : number
  paymentMode : string
  chequeNo : string
  chequeDate : Date
  bank : string
  creditNoteNo : string
  status : string


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
  amountDue    : number
  discountRate :number
  discountStartDate : Date
  discountEndDate : Date
  priceMargin :number
  priceMarginStartDate : Date
  priceMarginEndDate : Date


  constructor(private httpClient : HttpClient) {

    this.id            = null
    this.receiptNo     = ''
    this.receiptDate   = null
    this.receiptAmount = null
    this.paymentMode   = ''
    this.chequeNo      = ''
    this.chequeDate    = null
    this.bank          = ''
    this.creditNoteNo  = ''
    this.status        = ''


    this.custId               = ''
    this.customerNo           = ''
    this.customerName         = ''
    this.contactName          = ''
    this.address              = ''
    this.telephone            = ''
    this.vatNo                = ''
    this.creditLimit          = null
    this.creditDays           = null
    this.amountDue            = null
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

  generateReceiptNo(){
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
		return "CRT-"+result1+result2
  }
  

  createReceipt(){
    this.receiptNo = this.generateReceiptNo()
    this.clearCustomer()
    this.unlockCustomer()
    this.hideAll()
  }

  saveChequeReceipt(){
    alert('savecheque')
  }
  saveCashReceipt(){
    alert('savecash')
  }
  saveCreditNoteReceipt(){
    alert('savecrnote')
  }
  saveOtherReceipt(){
    alert('saveother')
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
    this.amountDue    = null;
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
    this.amountDue    =customer['amountDue']
    this.invoiceLimit=customer['invoiceLimit']
    this.discountRate = customer['discountRate']
    this.discountStartDate=customer['discountStartDate']
    this.discountEndDate = customer['discountEndDate']
    this.priceMargin = customer['priceMargin']
    this.priceMarginStartDate=customer['priceMarginStartDate']
    this.priceMarginEndDate = customer['priceMarginEndDate']
  }




  chequeVisible : boolean = false
  cashVisible   : boolean = false
  creditNoteVisible : boolean = false
  otherVisible  : boolean = false

  showChequePayment(){
    if(this.custId == null || this.custId == ""){
      alert("Please select a customer")
      return
    }
    if(this.receiptDate == null){
      alert("Please enter receipt date")
      return
    }
    this.chequeVisible = true
    this.cashVisible   = false
    this.creditNoteVisible = false
    this.otherVisible  = false
  }
  showCashPayment(){
    if(this.custId == null || this.custId == ""){
      alert("Please select a customer")
      return
    }
    if(this.receiptDate == null){
      alert("Please enter receipt date")
      return
    }
    this.chequeVisible = false
    this.cashVisible   = true
    this.creditNoteVisible = false
    this.otherVisible  = false
  }
  showCreditNotePayment(){
    if(this.custId == null || this.custId == ""){
      alert("Please select a customer")
      return
    }
    if(this.receiptDate == null){
      alert("Please enter receipt date")
      return
    }
    this.chequeVisible = false
    this.cashVisible   = false
    this.creditNoteVisible = true
    this.otherVisible  = false
  }
  showOtherPayment(){
    if(this.custId == null || this.custId == ""){
      alert("Please select a customer")
      return
    }
    if(this.receiptDate == null){
      alert("Please enter receipt date")
      return
    }
    this.chequeVisible = false
    this.cashVisible   = false
    this.creditNoteVisible = false
    this.otherVisible  = true
  }
  hideAll(){
    this.chequeVisible = false
    this.cashVisible   = false
    this.creditNoteVisible = false
    this.otherVisible  = false
  }

  /**Lock variables */
	lockedReceipt : boolean = true
	lockedCustomer: boolean = true

  lockedBarcode : boolean = false
  lockedItemCode : boolean = false
  lockedDescription : boolean = false
	
	private lockReceipt(){
		this.lockedReceipt = true
	}
	private lockCustomer(){
		this.lockedCustomer = true
	}
	
	private unlocReceipt(){
		this.lockedReceipt = false
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
}

