import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Data } from '../data';
import { ErrorService } from '../error.service';
import { ItemService } from '../item.service';
import { MessageService } from '../message.service';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-return-to-vendor',
  templateUrl: './return-to-vendor.component.html',
  styleUrls: ['./return-to-vendor.component.css']
})
export class ReturnToVendorComponent implements OnInit {

  /**LPO field variakbles */
	id             : any
	rtvNo          : string
	supplierCode   : string
	supplierName   : string
	createdBy      : string
	approvedBy     : string
	rtvDate        : Date
	status         : string
	
	/**Lpo detail field variables */
	rtvDetailId : any
	barcode     : any
	itemCode    : string
	description : string
	qty         : number
	price       : number
	reason      : string

	/**Collections */
	descriptions  : string[] = []
	supplierNames : string[] = []

	public rtvs = {}
	public rtvDetails = {}

  constructor(private httpClient : HttpClient, private spinnerService : NgxSpinnerService) { }

  async ngOnInit(): Promise<void> {
		/**Load rtvs */
		this.rtvs = await this.getRtvs();
		/**Load all supplier names */
		((new SupplierService(this.httpClient)).getSuppliersNames())
		.then(
		res=>{
			Object.values(res).map((supplierName:string)=>{
			this.supplierNames.push(supplierName)
			})
		}
		);
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

  public async  getRtvs (){
		/**
		 * List all lpos
		 */
		var _rtvs = {}
		await this.httpClient.get(Data.baseUrl+"/rtvs")
		.toPromise()
		.then(
		  data=>{
			_rtvs = data
		  }
		)
		.catch(
		  error=>{}
		)
		return _rtvs
    }
    
    generateRtvNo(){
      /**Generate a unique LPO No */
  
      var anysize = 5;//the size of string 
      var charset1 = "123456789"; //from where to create
      var charset2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  
      var result1="";
      var result2=""
      for( var i=0; i < anysize; i++ )
        result1 += charset1[Math.floor(Math.random() * charset1.length)];
      for( var i=0; i < 1; i++ )
        result2 += charset2[Math.floor(Math.random() * charset2.length)];
      return "RTV-"+result1+result2
    }
    createRtv(){
      /**Create a new rtv with the specified details
       * Return back the newly created rtv details and
       * assign them to the rtv variables
      */
      return {
        rtvNo          : this.rtvNo,
        supplier       :{
                supplierCode   : this.supplierCode,
                supplierName   : this.supplierName,
                },
        createdBy      : this.createdBy,
        approvedBy     : '',
        rtvDate        : this.rtvDate
      }
    }



    
    newRtv(){
      /**Create a new Rtv */
      var created : boolean =false
      this.clear()
      this.lockRtv()
      this.unlockSupplier()
      this.unlockItem()
      this.lockAdd()
      this.rtvNo = this.generateRtvNo()
      return created
    }
    editRtv(){
      /**Prompts user to edit an existing rtv */
      this.clear()
      this.lockSupplier()
      this.unlockLpo()
      this.lockAdd()
    }
    clear(){
      this.id             = ''
      this.barcode        = ''
      this.rtvNo          = ''
      this.supplierCode   = ''
      this.supplierName   = ''
      this.createdBy      = ''
      this.approvedBy     = ''
      this.rtvDate        = null
      this.status         = ''
      /**Lpo details */
      this.rtvDetailId  = ''
      this.itemCode     = ''
      this.description  = ''
      this.qty          = null
      this.price        = null
      this.reason       = ''
  
  
  
      this.rtvDetails   = null
    }
    clearItem(){
      /**Clear item data */
      this.rtvDetailId      = ''
      this.itemCode         = ''
      this.description      = ''
      this.qty              = null
      this.price            = null
      this.reason           =''
      this.unlockItem()
      this.lockAdd()
    }
    
    async searchRtv(rtvNo : string){
      /**Searches specified rtv, displays rtv and return true if found,
       * else return false
       */
      if(rtvNo == ''){
        MessageService.showMessage('Please enter RTV No!')
        return
      }
      var found : boolean = false
      this.lockRtv()
      this.lockSupplier()
      this.spinnerService.show()
      await this.httpClient.get(Data.baseUrl+"/rtvs/rtv_no="+rtvNo)
        .toPromise()
        .then(
          data => {
            this.showRtv(data)
          }
        )
        .catch(
          error => {
            ErrorService.showHttpError(error, 'The requested RTV could not be found')
            return
          }
        )
        this.spinnerService.hide()
      return found
    }
    async searchRtvDetail(id : any){
      /**Search rtv detail by id,
       * display detail in input fields for further processing */
      this.spinnerService.show()
      await this.httpClient.get(Data.baseUrl+"/rtv_details/"+id)
      .toPromise()
      .then(
        data => {
          this.showRtvDetail(data)
        }
      )
      .catch(
        () => {
          return
        }
      )
      this.spinnerService.hide()
    }
    saveRtv(){
      /**Save a new or update an existing RTV */
      var saved : boolean = false
  
      return saved
    }
    showRtv(rtv : any){
      /**Renders rtv information for display */
      this.id             = rtv['id']
      this.rtvNo          = rtv['rtvNo']
      this.createdBy      = rtv['createdBy']
      this.approvedBy     = rtv['approvedBy']
      this.rtvDate        = rtv['rtvDate']
      this.status         = rtv['status']
      if(rtv['supplier'] != null){
        this.supplierCode   = rtv['supplier'].supplierCode
        this.supplierName   = rtv['supplier'].supplierName
      }else{
        this.supplierCode = ''
        this.supplierName = ''
      }
      if(rtv['rtvDetail'] != null){
        this.rtvDetails = rtv['rtvDetail']
      }else{
        this.rtvDetails = {}
      }
      this.refreshDetails(this.id)
    }
    getRtvData(){
      /**Return an LPO object for further processing */
      return  {
        id             : this.id,
        rtvNo          : this.rtvNo,
        supplierCode   : this.supplierCode,
        supplierName   : this.supplierName,
        createdBy      : this.createdBy,
        approvedBy     : this.approvedBy,
        rtvDate        : this.rtvDate,
        status         : this.status
      }
    }
    async approveRtv(rtvNo : string){
      /**Approve a pending RTV */
      if(rtvNo == ''){
        MessageService.showMessage('Error: No RTV selected!\nPlease select an RTV to approve')
      }else{
        if(window.confirm('Confirm approval?\nThe RTV will be approved.\nConfirm?')){
          /**Approve the selected rtv */
          await this.httpClient.put(Data.baseUrl + "/rtvs/approve/"+this.id, null,{responseType:'text'})
          .toPromise()
          .then(
            data => {
              MessageService.showMessage(data)
            },
            error => {
              MessageService.showMessage(error['error'])
            }
          )
        }
      }
    }
    async confirmRtv(rtvNo : string){
      /**Approve a pending RTV */
      if(rtvNo == ''){
        MessageService.showMessage('Error: No RTV selected!\nPlease select an RTV to approve')
      }else{
        if(window.confirm('Confirm return?\nGoods will be returned to vendor.\nConfirm?')){
          /**Approve the selected rtv */
          await this.httpClient.put(Data.baseUrl + "/rtvs/complete/"+this.id, null,{responseType:'text'})
          .toPromise()
          .then(
            data => {
              MessageService.showMessage(data)
            },
            error => {
              MessageService.showMessage(error['error'])
            }
          )
        }
      }
    }
    async printRtv(rtvNo : string){
      /**Print an approved RTV or reprint a printed RTV */
      if(rtvNo == ''){
        MessageService.showMessage('Error: No RTV selected!\nPlease select an RTV to print')
      }else{
        if(window.confirm('Confirm printing?\nThe RTV will be printed.\nConfirm?')){
          /**Print the selected rtv */
          await this.httpClient.put(Data.baseUrl+"/rtvs/print/"+this.id, null, {responseType:'text'})
          .toPromise()
          .then(
            data => {
              MessageService.showMessage(data)
              
            },
            error => {
              MessageService.showMessage(error['error'])
            }
          )
        }
      }
    }
    async cancelRtv(rtvNo : string){
      var canceled :boolean = false
      if(rtvNo == ''){
        MessageService.showMessage('Error: No RTV selected!\nPlease select an RTV to cancel')
      }else{
        if(window.confirm('Confirm Canceling?\nThe RTV will be canceled.\nConfirm?')){
          /**Cancel the selected rtv */
          await this.httpClient.put(Data.baseUrl+"/rtvs/cancel/"+this.id, null, {responseType:'text'})
          .toPromise()
          .then(
            data => {
              MessageService.showMessage(data)
              
            },
            error => {
              MessageService.showMessage(error['error'])
            }
          )
        }
      }
      return canceled
    }
  
    
    saveRtvDetail(){
      if(this.rtvNo == ''){
        MessageService.showMessage('RTV number required.\nSelect new for a new RTV')
        return
      }
      if(this.supplierCode == ''){
        MessageService.showMessage('Please select a supplier')
        return
      }
      if(this.itemCode == ''){
        MessageService.showMessage('Please select an item')
        return
      }
      if(this.qty <= 0 || isNaN(this.qty)){
        MessageService.showMessage('Error: Invalid quantity!\nQuantity must be numeric and more than zero')
        return
      }
      if(this.reason==''){
        MessageService.showMessage('Please enter reason for return')
        return
      }
      if(this.rtvDetailId == ''){
        this.addRtvDetail()
      }else{
        this.updateRtvDetail()
      }
    }
  
    async addRtvDetail(){
      var added : boolean = false
      this.lockRtv()
      this.lockSupplier()
      this.spinnerService.show()
      if(this.id == ''){
        /**post rtv and return newly created rtv details and
         * assign it to the field variables
         */
        
        await this.httpClient.post(Data.baseUrl + "/rtvs" , this.createRtv())
        .toPromise()
        .then(
          data => {
            this.id=data['id']
          }
        )
        .catch(
          error => {
            alert(error['error']);
          }
        )
        if(this.id == ''){
          return
        }
        await this.httpClient.get(Data.baseUrl+"/rtvs/"+this.id)
        .toPromise()
        .then(
          data => {
            this.showRtv(data)
          }
        )
        .catch(
          () => {
            return
          }
        )
        if(this.id == ''){
          return
        }
      }
      /**Add a new RTV detail */
      if(this.validateSupplier() == true){
        /**Add item */
        this.httpClient.post(Data.baseUrl + "/rtv_details" , this.getRtvDetailData())
        .toPromise()
        .then(
          () => {
            added = true
            this.clearItem()
            this.unlockItem()
            this.refreshDetails(this.id)
          }
        )
        .catch(
          error => {
            added = false
            ErrorService.showHttpError(error, '')
          }
        )
      }else{
        MessageService.showMessage('Error: Could not add item\nItem may not be available for this supplier')
      }
      this.spinnerService.hide()
      return added
    }
    updateRtvDetail(){
      /**Update an existing RTV detail */
      var updated : boolean =false
      this.spinnerService.show()
      this.httpClient.put(Data.baseUrl + "/rtv_details/"+this.rtvDetailId , this.getRtvDetailData(),{responseType : 'text'})
      .toPromise()
      .then(
        () => {
          updated = true
          this.clearItem()
          this.unlockItem()
          this.refreshDetails(this.id)
          //MessageService.showMessage('Item updated successifully')
        }
      )
      .catch(
        error => {
          updated = false
          ErrorService.showHttpError(error, '')
        }
      )
      this.spinnerService.hide()
      return updated
    }
    
    deleteRtvDetail(id : any){
      /**Delete an RTV detail */
      var deleted : boolean = false
      if(id == ''){
        MessageService.showMessage('Error: No item selected!\nPlease select an item to delete')
      }else{
        /**Delete the selected item */
        this.spinnerService.show()
        this.httpClient.delete(Data.baseUrl+"/rtv_details/"+id, {responseType : 'text'})
        .toPromise()
        .then(
          () => {
            this.clearItem()
            this.refreshDetails(this.id)
          }
        )
        .catch(
          (error) => {
            console.log(error)
            alert(error['error'])
            //MessageService.showMessage('Could not delete')
          }
        )
        this.spinnerService.hide()
        deleted = true
      }
      return deleted
    }
    showRtvDetail(rtvDetail : any){
      /**Renders rtv detail information for display */
      this.lockItem()
      this.rtvDetailId = rtvDetail['id']
      this.itemCode    = rtvDetail['itemCode']
      this.description = rtvDetail['description']
      this.qty         = rtvDetail['qty']
      this.price       = rtvDetail['price']
      this.reason      = rtvDetail['reason']
      if(this.rtvDetailId != ''){
        this.unlockAdd()
      }else{
        this.lockAdd()
      }
    }
    getRtvDetailData(){
      /**Gets the rtv details from inputs for further processing */
      return {
        id          : this.rtvDetailId,
        itemCode    : this.itemCode,
        description : this.description,
        qty         : this.qty,
        price       : this.price,
        reason      : this.reason,
        rtv 		    : {
                       id    : this.id,
                       rtvNo : this.rtvNo
                      }
      }
    }
    validateSupplier(){
      /**Validate the supplier of a particular item,
       * checks if the item is supplied by that particular supplier and
       * returns true if supplier is active and supplies that particular item
       */
      var valid : boolean = true  //change to false!
  
      return valid
    }
    clearSupplier(){
      this.supplierCode = ''
      this.supplierName = ''
    }
    searchBySupplierName(){
      this.supplierCode = ''
      this.searchSupplier()
    }
    async searchSupplier(){
      /**Search a supplier */
      var found : boolean = false
      var supplierId = await (new SupplierService(this.httpClient)).getSupplierId(this.supplierCode, this.supplierName)
      var supplier = await (new SupplierService(this.httpClient)).getSupplier(supplierId)
      this.supplierCode = supplier['supplierCode']
      this.supplierName = supplier['supplierName']
      if(supplier != '' && supplierId != null){
        found = true
      }
      return found
    }
    async searchItem(barcode : string, itemCode : string, description : string){
      /**Search and display an item */
      var itemId = await (new ItemService(this.httpClient).getItemId(barcode , itemCode, description))
      if(itemId != '' && itemId !=null){
        var item = await (new ItemService(this.httpClient).getItem(itemId))
        this.itemCode = item['itemCode']
        this.description = item['longDescription']
        this.price = item['unitCostPrice']
        this.lockItem()
        this.unlockAdd()
        this.lockSupplier()
      }else{
        /** */
      }
    }
    async refreshDetails(id : string){
      await this.httpClient.get(Data.baseUrl+"/rtvs/"+id)
      .toPromise()
      .then(
        data => {
          this.rtvDetails = data['rtvDetail']
        }
      )
    }
    refresh(){
      window.location.reload()
    }
    pasteFromClipboard(){
      if(this.lockedRtv == false){
        this.rtvNo = window.getSelection().toString()
      }
    }
    /**Lock variables */
    lockedSupplier : boolean = true
    lockedRtv      : boolean = true
    lockedItem     : boolean = false
    lockedAdd      : boolean = true
    private lockSupplier(){
      this.lockedSupplier = true
    }
    private lockRtv(){
      this.lockedRtv = true
    }
    private lockItem(){
      this.lockedItem = true
    }
    private lockAdd(){
      this.lockedAdd = true
    }
    private unlockSupplier(){
      this.lockedSupplier = false
    }
    private unlockLpo(){
      this.lockedRtv = false
    }
    private unlockItem(){
      this.lockedItem = false
    }
    private unlockAdd(){
      this.lockedAdd = false
    }
    





}
