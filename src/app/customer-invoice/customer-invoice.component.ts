import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CorporateCustomerService } from '../corporate-customer.service';
import { Data } from '../data';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-customer-invoice',
  templateUrl: './customer-invoice.component.html',
  styleUrls: ['./customer-invoice.component.css']
})
export class CustomerInvoiceComponent implements OnInit {

  public customersNames: string [] = []
  public customers = {}

  descriptions  : any = []

  _new : boolean = false

  invoice : Invoice = new Invoice()

  id : any
  invoiceNo : any
  invoiceDetails: InvoiceDetail[] = []
  invoiceDate : Date


  //invoice detail
  detailId    : any
  barcode     : string
  itemCode    : string
  description : string
  price       : number
  qty         : number
  
  
  custId   : any
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
    this.invoiceNo           = '';
    this.invoiceDate           = null;




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

    /**Load all item descriptions */
		((new ItemService(this.httpClient)).getItemsLongDescriptions())
		.then(
		res=>{
			Object.values(res).map((longDescription:string)=>{
			this.descriptions.push(longDescription)
			})
		}
		);


  }

  generateInvoiceNo(){
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
		return "CINV-"+result1+result2
  }

  createInvoice(){
    this.clearInvoice()
    this.clearCustomer()
    this.clearDetail()
    this.lockInvoice()
    this.unlockCustomer()
    this.invoiceNo = this.generateInvoiceNo()
    this.invoiceDetails = []
    this._new = true
    

  }

  public searchInvoice(){

  }

  public addInvoice(){

  }

  public addDetail(){
    if(this.custId == ''){
      alert("Please select a customer")
      return
    }
    if(this.validateDetail() == false){
      alert("Invalid entry")
      return
    }
    this.lockCustomer()

    var _invoiceDetail : InvoiceDetail = new InvoiceDetail
    _invoiceDetail.detailId      = this.detailId
    _invoiceDetail.barcode       = this.barcode
    _invoiceDetail.itemCode      = this.itemCode
    _invoiceDetail.description   = this.description
    _invoiceDetail.price         = this.price
    _invoiceDetail.qty           = this.qty
    if(this.checkDuplicate(this.itemCode,this.invoiceDetails) == false){
      this.invoiceDetails.push(_invoiceDetail)
      this.clearDetail()
    }
    

  }
  public checkDuplicate(itemCode : string, detail : InvoiceDetail[]) : boolean{
    var duplicate : boolean = false
    for(var i = 0; i <detail.length; i++){
      if(detail[i].itemCode==itemCode){
        duplicate = true
        alert('Duplicate detected')
      }
      if(duplicate == true){
        //end for, implement later to save time
      }
    }
    return duplicate
  }
  public removeDetail(detailId : any){

  }

  public clearDetail(){
    this.detailId    = '';
    this.barcode     = '';
    this.itemCode    = '';
    this.description = '';
    this.price       = null;
    this.qty         = null;
    this.unlockDetail()
  }
  public validateDetail() : boolean{
    var valid = true
    if(this.itemCode == ''){
      valid = false
    }
    return valid
  }
  clearInvoice(){
    this.id           = '';
    this.invoiceNo           = '';
    this.invoiceDate           = null;
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
  }

  async saveInvoice(){
    this.invoice.id = this.id
    this.invoice.invoiceNo = this.invoiceNo
    this.invoice.invoiceDate=this.invoiceDate
    this.invoice.invoiceDetails=this.invoiceDetails
    this.invoice.custId=this.custId

    await this.httpClient.post(Data.baseUrl + "/customer_invoices" , this.invoice)
			.toPromise()
			.then(
				data => {
					console.log(data)
				}
			)
			.catch(
				error => {
					alert(error['error']);
				}
			)

  }

  
  public postInvoice(){
    //create a new invoice
    var _invoice : Invoice = new Invoice
    _invoice.id = 1
    _invoice.invoiceNo = 'INV123'
    _invoice.invoiceDate = null
    _invoice.custId = '1'
    // create a list of invoice details
    var _invoiceDetails : InvoiceDetail[] = new Array()
    //add details to list
    var _invoiceDetail : InvoiceDetail = new InvoiceDetail
    _invoiceDetail.detailId = 1
    _invoiceDetail.barcode = "4567846647"
    _invoiceDetail.itemCode = '8765678'
    _invoiceDetail.description = 'KILIMANJARO PURE DRINKING WATER 1000 ML'
    _invoiceDetail.price = 1000
    _invoiceDetail.qty = 2
    _invoiceDetails.push(_invoiceDetail)
    _invoiceDetails.push(_invoiceDetail)
    _invoiceDetails.push(_invoiceDetail)
    _invoiceDetails.push(_invoiceDetail)
    _invoiceDetails.push(_invoiceDetail)
    _invoiceDetails.push(_invoiceDetail)
    _invoiceDetails.push(_invoiceDetail)
    _invoiceDetails.push(_invoiceDetail)
    _invoiceDetails.push(_invoiceDetail)
    _invoiceDetails.push(_invoiceDetail)
    _invoiceDetails.push(_invoiceDetail)
    _invoiceDetails.push(_invoiceDetail)

    //add list to invoice
    _invoice.invoiceDetails = _invoiceDetails
    this.invoiceDetails = _invoiceDetails

    this.invoiceNo=_invoice.invoiceNo
    

     

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
    }
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
  }


  async searchItemByBarcode(barcode : string){
		/**Search and display an item */
		var itemId = await (new ItemService(this.httpClient).getItemId(barcode , "", ""))
		if(itemId != '' && itemId !=null){
			var item = await (new ItemService(this.httpClient).getItem(itemId))
      this.lockDetail()
			this.itemCode = item['itemCode']
			this.description = item['longDescription']
			this.price = item['unitRetailPrice']
		}else{
			/** */
		}
	}
	async searchItemByItemCode(itemCode : string){
		/**Search and display an item */
		var itemId = await (new ItemService(this.httpClient).getItemId("" , itemCode, ""))
		if(itemId != '' && itemId !=null){
			var item = await (new ItemService(this.httpClient).getItem(itemId))
      this.lockDetail()
			this.itemCode = item['itemCode']
			this.description = item['longDescription']
			this.price = item['unitRetailPrice']
		}else{
			/** */
		}
	}
	async searchItemByDescription(description : string){
		/**Search and display an item */
		var itemId = await (new ItemService(this.httpClient).getItemId("" , "", description))
		if(itemId != '' && itemId !=null){
			var item = await (new ItemService(this.httpClient).getItem(itemId))
      this.lockDetail()
			this.itemCode = item['itemCode']
			this.description = item['longDescription']
			this.price = item['unitRetailPrice']
		}else{
			/** */
		}
	}


  /**Lock variables */
	lockedInvoice : boolean = true
	lockedCustomer: boolean = true

  lockedBarcode : boolean = false
  lockedItemCode : boolean = false
  lockedDescription : boolean = false
	
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
}

export class Invoice{
  id            : any
  invoiceNo     : string
  invoiceDate   : Date
  custId    : any
  invoiceDetails : InvoiceDetail[]

}

export class InvoiceDetail{
  detailId    : any
  barcode     : string
  itemCode    : string
  description : string
  price       : number
  qty         : number
}
