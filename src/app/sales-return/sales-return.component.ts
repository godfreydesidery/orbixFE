import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Data } from '../data';
import { ItemService } from '../item.service';
import { SalesInvoiceService } from '../sales-invoice.service';

@Component({
  selector: 'app-sales-return',
  templateUrl: './sales-return.component.html',
  styleUrls: ['./sales-return.component.css']
})
export class SalesReturnComponent implements OnInit {

  id : any

  descriptions  : any = []

  _new : boolean      = false


  

  invoiceId          : any
  invoiceNo          : any
  invoiceDate        : Date
  invoiceAmount      : number

  salesInvoice : SalesInvoice = new SalesInvoice()

  invoiceDetails : any = []

  salesReturnDetails : SalesReturnDetail [] = []

  salesReturn : SalesReturn = new SalesReturn()
  

  totalAmount        : number = 0


  detailId    : number
  barcode     : string
  itemCode    : string
  description : string
  price       : number
  qty         : number
  reason : string
  returnPeriod : number
  qtyReturned : number
  
  
 

  constructor(private httpClient: HttpClient ) {
    this.invoiceId                 = null;
    this.invoiceNo          = '';
    this.invoiceDate        = null;
    this.invoiceAmount      = null
    
    this.detailId = 0
  }

  async ngOnInit(): Promise<void> {
    

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

  

  //refreshAmount(detail : InvoiceDetail[]){
    //this.totalAmount = 0
    //for(var i = 0; i <detail.length; i++){
      //this.totalAmount = this.totalAmount + (detail[i].qty*detail[i].price)
   // }
  //}

  

  createSalesReturn(){
    this.clearInvoice()
    this.salesReturnDetails = []
    this.clearDetail()
    //this.clearSaleReturn()
    //this.clearDetail()
    this.unlockInvoice()
    //this.unlockCustomer()
    //this.invoiceNo = 'NA'
    //this.invoiceDetails = []
    this._new = true
    //this.refreshAmount(this.invoiceDetails)
    

  }

  public viewInvoice(){
    this.clearInvoice()
    this.clearDetail()
    //this.unlockInvoice()
    //this.unlockCustomer()//
    //this.invoiceDetails = []
    this._new = false
    //this.refreshAmount(this.invoiceDetails)
  }

  public async searchInvoice(invoiceNo : string){
    this._new=false
    var invoice : any =null
    invoice = await (new SalesInvoiceService(this.httpClient)).getInvoice(invoiceNo)
    this.showInvoice(invoice)
    this.lockInvoice()
    //this.refreshAmount(this.invoiceDetails)

  }
  public showInvoice(invoice : any){
    this.invoiceId                 = invoice['id']
    this.invoiceNo          = invoice['invoiceNo']
    this.invoiceDate        = invoice['invoiceDate']
    
    this.invoiceAmount      = invoice['invoiceAmount']
    //this.invoiceAmountPayed = invoice['invoiceAmountPayed']
    //this.invoiceAmountDue   = invoice['invoiceAmountDue']
    this.invoiceDetails     = invoice['invoiceDetails']
    //this.terms              = invoice['terms']
    //this.orderNo            = invoice['orderNo']
    //this.dateShipped        = invoice['dateShipped']
    //this.shippedVia         = invoice['shippedVia']

    
  }

  public addInvoice(){

  }

  clearExpiredDiscountRate(){

  }
  clearExpiredPriceMargin(){

  }

  salesDetaillId : number = 1
  public addDetail(){
    if(isNaN(this.qty)){
      alert('Invalid quantity amount, only numeric whole value is allowed')
      return
    }
    if(this.qty <= 0 || this.qty%1 > 0 ){
      alert("Invalid amount, negative or decimal amounts not allowed")
      return
    }

    
    if(this.validateDetail() == false){
      alert("Could not add item, invalid entries")
      return
    }
    //this.lockCustomer()

    //this.refreshAmount(this.invoiceDetails)
    

    var _salesReturnDetail : SalesReturnDetail = new SalesReturnDetail()
    this.detailId = this.detailId + 1
    _salesReturnDetail.detailId      = this.detailId
    _salesReturnDetail.barcode       = this.barcode
    _salesReturnDetail.itemCode      = this.itemCode
    _salesReturnDetail.description   = this.description
   // _invoiceDetail.price         = this.price
    _salesReturnDetail.qtyReturned           = this.qty
    _salesReturnDetail.reason           = this.reason
    //_invoiceDetail.returnPeriod  = this.returnPeriod
    //_invoiceDetail.returnFirstDate = new Date()
    if(this.checkDuplicate(this.itemCode,this.salesReturnDetails) == false){
      this.salesReturnDetails.push(_salesReturnDetail)
      this.clearDetail()
      
    }else{
      this.detailId = this.detailId - 1
    }
    //alert(this.detailId)
    //this.refreshAmount(this.invoiceDetails)
    

  }
  public checkDuplicate(itemCode : string, detail : SalesReturnDetail[]) : boolean{
    var duplicate : boolean = false
    for(var i = 0; i <detail.length; i++){
      if(detail[i].itemCode==itemCode){
        duplicate = true
        alert('Could not add item, item exists in invoice, consider updating item quantity')
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
    this.barcode     = '';
    this.itemCode    = '';
    this.description = '';
    this.price       = null;
    this.qty         = null;
    this.reason      = ''
    this.returnPeriod= null
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
    this.invoiceId          = null;
    this.invoiceNo   = '';
    this.invoiceDate = null;
    this.invoiceAmount = null
    this.invoiceDetails = null
  }
  clearSalesReturn(){
    this.salesReturnDetails = []
  }
 

  async saveReturn(){
    if(this.invoiceId != null){
      alert('Invoice already saved. Select new to create a new invoice')
      return
    }
    if(window.confirm('Saving invoice. Confirm?') == false){
      return
    }
    //this.invoice.id             = this.id
    //this.invoice.invoiceNo      = this.invoiceNo
    //this.invoice.invoiceDate    = this.invoiceDate
    //this.invoice.invoiceDetails = this.invoiceDetails
    //this.invoice.terms          = this.terms
    //this.invoice.orderNo        = this.orderNo
    //this.invoice.dateShipped    = this.dateShipped
    //this.invoice.shippedVia     = this.shippedVia

    //await this.httpClient.post(Data.baseUrl + "/customer_invoices" , this.invoice)
			//.toPromise()
			//.then(
				//data => {
          //this.invoiceNo = data['invoiceNo']
          //alert('Customer invoice '+data['invoiceNo']+ ' successifully saved.')
				//}
			//)
			//.catch(
				//error => {
					//alert(error['error']);
				//}
			//)

  }

  

  
  
  


  async searchItemByBarcode(barcode : string){
    if(this.invoiceId == null){
      alert("Missing invoice information, please select invoice")
      return
    }
		/**Search and display an item */
		var itemId = await (new ItemService(this.httpClient).getItemId(barcode , "", ""))
		if(itemId != '' && itemId !=null){
			var item = await (new ItemService(this.httpClient).getItem(itemId))
      this.lockDetail()
			this.setItem(item)
		}else{
			/** */
		}
	}
	async searchItemByItemCode(itemCode : string){
    if(this.invoiceId == null){
      alert("Missing invoice information, please select invoice")
      return
    }
		/**Search and display an item */
		var itemId = await (new ItemService(this.httpClient).getItemId("" , itemCode, ""))
		if(itemId != '' && itemId !=null){
			var item = await (new ItemService(this.httpClient).getItem(itemId))
      this.lockDetail()
			this.setItem(item)
		}else{
			/** */
		}
	}
	async searchItemByDescription(description : string){
    if(this.invoiceId == null){
      alert("Missing invoice information, please select invoice")
      return
    }
		/**Search and display an item */
		var itemId = await (new ItemService(this.httpClient).getItemId("" , "", description))
		if(itemId != '' && itemId !=null){
			var item = await (new ItemService(this.httpClient).getItem(itemId))
      this.lockDetail()
      this.setItem(item)
		}else{
			/** */
		}
	}
  setItem(item : any){
    this.itemCode    = item['itemCode']
    this.description = item['longDescription']
    this.price       = item['unitRetailPrice']
    
    this.returnPeriod = item['returnPeriod']
  }
  async confirmReturn(){
    if(this.id != null){
      //alert('Invoice already saved. Select new to create a new invoice')
      //return
    }
    if(window.confirm('Return goods. Confirm?') == false){
      return
    }
    this.salesInvoice.invoiceNo = this.invoiceNo
    this.salesReturn.id                 = this.id
    this.salesReturn.returnDate = null
    this.salesReturn.salesReturnDetails = this.salesReturnDetails
    this.salesReturn.salesInvoice = this.salesInvoice
    
    await this.httpClient.post(Data.baseUrl + "/sales_returns" , this.salesReturn)
			.toPromise()
			.then(
				data => {

          //this.invoiceNo = data['invoiceNo']
          //alert('Customer invoice '+data['invoiceNo']+ ' successifully saved.')
          alert("Returned successively")
				}
			)
			.catch(
				error => {
					alert(error['error']);
				}
			)

  }


  /**Lock variables */
	lockedSaleReturn : boolean     = true
  lockedInvoice : boolean     = true

  lockedBarcode : boolean     = false
  lockedItemCode : boolean    = false
  lockedDescription : boolean = false
	
	private lockInvoice(){
		this.lockedInvoice = true
	}
	
	private unlockInvoice(){
		this.lockedInvoice = false
	}
  private lockSaleReturn(){
		this.lockedSaleReturn = true
	}
	
	private unlockSaleReturn(){
		this.lockedSaleReturn = false
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


export class SalesInvoice{
  invoiceNo : string
}

export class SalesReturn{
  id : any
  salesInvoice : SalesInvoice
  salesReturnNo : string
  returnDate : any
  salesReturnDetails : SalesReturnDetail[]
}
export class SalesReturnDetail{
  detailId    : any
  barcode     : string
  itemCode    : string
  description : string
  qtyReturned : number
  reason      : string
}

