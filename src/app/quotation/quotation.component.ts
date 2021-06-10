import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Data } from '../data';
import { ErrorService } from '../error.service';
import { ItemService } from '../item.service';
import { QuotationService } from '../quotation.service';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css']
})
export class QuotationComponent implements OnInit {

  quotation : Quotation

  quotations : any = {}

  /**Quotation inf */
  id                : any
  quotationNo       : string
  issueDate         : Date
  expiryDate        : Date
  customerName      : string
  customerAddress   : string
  customerTelephone : string
  customerEmail     : string
  customerFax       : string

  totalAmount : number = 0

  /**Detail */
  detailId : any
  barcode     : string
  itemCode    : string
  description : string
  qty         : number
  tax         : number
  price       : number


  quotationDetails : QuotationDetail [] = []

  /**Collections */
	descriptions  : any = []

  constructor(private httpClient : HttpClient) { }

  async ngOnInit(): Promise<void> {
    this.clearDetails();
    /**Load all item descriptions */
		((new ItemService(this.httpClient)).getItemsLongDescriptions())
		.then(
		res=>{
			Object.values(res).map((longDescription:string)=>{
			this.descriptions.push(longDescription)
			})
		}
		);
    this.quotations = await (new QuotationService(this.httpClient)).getQuotations()
  }

  async refresh(){
    this.quotations = await (new QuotationService(this.httpClient)).getQuotations()
  }

  async searchQuotation(quotationNo : any) { 
    /**
     * search item by id, gets id from getItemId
     */
    if(quotationNo == '' && quotationNo == null){
      alert('Please enter a search key!')
      this.clear()
      return
    }
    this.clear
    
    var quotation : any
    quotation = await (new QuotationService(this.httpClient)).getQuotation(this.quotationNo)
    this.showQuotation(quotation)

    this.lockQuotationNo()
    this.lockIssueDate()
    this.lockExpiryDate()
    this.lockCustomer()

    
  }
  showQuotation(quotation: object){
    
    /**
     * render item information for display, these are displayed automatically using two way data binding
     */
    this.id                   = quotation['id']
    this.quotationNo = quotation['quotationNo']
    this.issueDate = quotation['issueDate']
    this.expiryDate = quotation['expiryDate']
    this.customerName = quotation['customerName']
    this.customerAddress = quotation['customerAddress']
    this.customerTelephone = quotation['customerTelephone']
    this.customerEmail = quotation['customerEmail']
    this.customerFax = quotation['customerFax']

    this.quotationDetails         = quotation['quotationDetails']
    
  }

  newQuotation(){
    this.clearDetails()
    this.quotationDetails = []
    this.lockQuotationNo()
    this.unlockIssueDate()
    this.unlockExpiryDate()
    this.unlockDetail()
    
  }
  editQuotation(){
    this.clearDetails()
    this.quotationDetails = []
    this.unlockQuotationNo()
    this.unlockIssueDate()
    this.unlockExpiryDate()
    this.unlockDetail()
  }
  viewQuotation(){
    this.clearDetails()
    this.quotationDetails = []
    this.lockDetail()
    this.unlockQuotationNo()
    this.lockIssueDate()
    this.lockExpiryDate()
  }
  deleteQuotation(){
    /**
     * delete an item given its id
     */
     var id = this.id
     if(id == null){
       alert('Please select a quotation to delete!')
       return
     }
     if(window.confirm('Delete the selected quotation?\nQuotation will be removed and this action can not be undone.\nConfirm?')){
       this.httpClient.delete(Data.baseUrl+"/quotations/"+id)
       .subscribe(
         data=>{
           if(data==null){
             this.clear()
             alert('Quotation deleted')
           }
         },
         error=>{
           ErrorService.showHttpError(error, 'Could not delete item')
         }
       )
     }
  }
  async saveQuotation(){
    if(this.id == null){
      //create a new quotation
      this.quotation = new Quotation()
      this.quotation.id = null
      this.quotation.quotationNo = 'NA'
      this.quotation.issueDate = this.issueDate
      this.quotation.expiryDate = this.expiryDate
      this.quotation.customerName = this.customerName
      this.quotation.customerAddress = this.customerAddress
      this.quotation.customerTelephone = this.customerTelephone
      this.quotation.customerEmail = this.customerEmail
      this.quotation.customerFax = this.customerFax
      this.quotation.quotationDetails = this.quotationDetails

      await this.httpClient.post(Data.baseUrl + "/quotations/create" , this.quotation)
      .toPromise()
      .then(
        data => {
          this.id = data['id']
          this.quotationNo = data['quotationNo']
          alert('Quotation '+data['quotationNo']+ ' successifully saved.')
        }
      )
      .catch(
				error => {
					alert(error['error']);
				}
			)
    }
    this.refresh()

  }
  printQuotation(){

  }
  editQuotationDetail(detailId : any){
    
  }
  deleteQuotationDetail(detailId : any){

  }

  clearDetails(){
    this.id                = null
    this.quotationNo       = ''
    this.issueDate         = null
    this.expiryDate        = null
    this.customerName      = ''
    this.customerAddress   = ''
    this.customerTelephone = ''
    this.customerEmail     = ''
    this.customerFax       = ''
  }
  clear(){
    this.barcode = ''
    this.itemCode = ''
    this.description = ''
    this.qty = null
    this.tax = null
    this.price = null
  }
  addDetail(){
    if(isNaN(this.qty)){
      alert('Invalid quantity amount, only numeric whole value is allowed')
      return
    }
    if(this.qty <= 0 || this.qty%1 > 0 ){
      alert("Invalid amount, negative or decimal amounts not allowed")
      return
    }

    //if(this.custId == ''){
      //alert("Missing customer information, please select a customer")
      //return
    //}
    if(this.validateDetail() == false){
      alert("Could not add item, invalid entries")
      return
    }

    var _quotationDetail : QuotationDetail = new QuotationDetail()
    _quotationDetail.detailId      = this.detailId
    _quotationDetail.barcode       = this.barcode
    _quotationDetail.itemCode      = this.itemCode
    _quotationDetail.description   = this.description
    _quotationDetail.price         = this.price
    _quotationDetail.qty           = this.qty
   
    if(this.checkDuplicate(this.itemCode,this.quotationDetails) == false){
      this.quotationDetails.push(_quotationDetail)
      this.clear()
    }
    this.refreshAmount(this.quotationDetails)
  }
  public validateDetail() : boolean{
    var valid = true
    if(this.itemCode == '' || this.itemCode == null){
      valid = false
    }
    return valid
  }
  refreshAmount(detail : QuotationDetail[]){
    this.totalAmount = 0
    for(var i = 0; i <detail.length; i++){
      this.totalAmount = this.totalAmount + (detail[i].qty*detail[i].price)
    }
  }
  public checkDuplicate(itemCode : string, detail : QuotationDetail[]) : boolean{
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

  async searchItemByBarcode(barcode : string){
    
		/**Search and display an item */
		var itemId = await (new ItemService(this.httpClient).getItemId(barcode , "", ""))
		if(itemId != '' && itemId !=null){
			var item = await (new ItemService(this.httpClient).getItem(itemId))
			this.setItem(item)
		}else{
			/** */
		}
	}
	async searchItemByItemCode(itemCode : string){
    
		/**Search and display an item */
		var itemId = await (new ItemService(this.httpClient).getItemId("" , itemCode, ""))
		if(itemId != '' && itemId !=null){
			var item = await (new ItemService(this.httpClient).getItem(itemId))
			this.setItem(item)
		}else{
			/** */
		}
	}
	async searchItemByDescription(description : string){
    
		/**Search and display an item */
		var itemId = await (new ItemService(this.httpClient).getItemId("" , "", description))
		if(itemId != '' && itemId !=null){
			var item = await (new ItemService(this.httpClient).getItem(itemId))
      this.setItem(item)
		}else{
			/** */
		}
	}
  setItem(item : any){
    this.itemCode    = item['itemCode']
    this.description = item['longDescription']
    this.price       = item['unitRetailPrice']
    
  }


  /**Lock attributes */
  quotationNoLocked : boolean = true
  detailLocked : boolean = true
  issueDateLocked : boolean = true
  expiryDateLocked : boolean = true
  customerLocked : boolean

  lockQuotationNo(){
    this.quotationNoLocked = true
  }
  unlockQuotationNo(){
    this.quotationNoLocked = false
  }
  lockDetail(){
    this.detailLocked = true
  }
  unlockDetail(){
    this.detailLocked = false
  }
  lockIssueDate(){
    this.issueDateLocked = true
  }
  unlockIssueDate(){
    this.issueDateLocked = false
  }
  lockExpiryDate(){
    this.expiryDateLocked = true
  }
  unlockExpiryDate(){
    this.expiryDateLocked = false
  }
  lockCustomer(){
    this.customerLocked = true
  }
  unlockCustomer(){
    this.customerLocked = false
  }

}
export class Quotation{
  id                : any
  quotationNo       : string
  issueDate         : Date
  expiryDate        : Date
  customerName      : string
  customerAddress   : string
  customerTelephone : string
  customerEmail     : string
  customerFax       : string
  quotationDetails  : QuotationDetail[]
}
export class QuotationDetail{
  detailId : any
  barcode     : string
  itemCode    : string
  description : string
  qty         : number
  tax         : number
  price : number
}
