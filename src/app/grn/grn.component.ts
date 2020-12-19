import { Component, OnInit } from '@angular/core';
import { Data } from '../data';
import { ErrorService } from '../error.service';
import { ItemService } from '../item.service';
import { MessageService } from '../message.service';
import { SupplierService } from '../supplier.service';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-grn',
  templateUrl: './grn.component.html',
  styleUrls: ['./grn.component.css']
})
export class GRNComponent implements OnInit {

  /**GRN field variables */
	id             : any
	grnNo          : string
	supplierCode   : string
	supplierName   : string
	createdBy      : string
	approvedBy     : string
	grnDate        : Date
	status         : string
	
	/**GRN detail field variables */
	grnDetailId       : any
	itemCode          : string
	description       : string
  qtyOrdered        : number
  qtyReceived       : number
  supplierCostPrice : number
  clientCostPrice   : number

	/**Collections */
	public grnDetails = {}
  
  constructor(private httpClient : HttpClient, private spinnerService : NgxSpinnerService) {
		/**Lpo */
		this.id             = ''
		this.grnNo          = ''
		this.supplierCode   = ''
		this.supplierName   = ''
		this.createdBy      = ''
		this.approvedBy     = ''
		this.grnDate        = null
		this.status         = ''
	}

  ngOnInit(): void {
  }

  newGrn(){
		/**Create a new GRN */
		this.clear()
		this.lockGrn()
		this.unlockSupplier()
		this.grnNo = this.generateGrnNo()
	}
	editGrn(){
		/**Prompts user to edit an existing Grn */
		this.clear()
		this.unlockGrn()
		this.lockAdd()
	}
	clear(){
		this.id             = ''
		this.grnNo          = ''
		this.supplierCode   = ''
		this.supplierName   = ''
		this.createdBy      = ''
		this.approvedBy     = ''
		this.grnDate        = null
		this.status         = ''
		/**Grn details */
		this.grnDetailId    = ''
		this.itemCode       = ''
		this.description    = ''
		this.qtyOrdered     = null
    this.supplierCostPrice      = null
    this.clientCostPrice      = null

		this.grnDetails     = null
	}
	
	generateGrnNo(){
		/**Generate a unique GRN No */

		var anysize = 5;//the size of string 
		var charset1 = "123456789"; //from where to create
		var charset2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

		var result1="";
		var result2=""
		for( var i=0; i < anysize; i++ )
			result1 += charset1[Math.floor(Math.random() * charset1.length)];
		for( var i=0; i < 1; i++ )
			result2 += charset2[Math.floor(Math.random() * charset2.length)];
		return "GRN-"+result1+result2
	}
	async searchGrn(grnNo : string){
		/**Searches specified grn, displays grn and return true if found,
		 * else return false
		 */
		if(grnNo == ''){
			MessageService.showMessage('Please enter GRN No!')
			return
		}
		var found : boolean = false
		this.lockGrn()
		this.lockSupplier()
		this.spinnerService.show()
		await this.httpClient.get(Data.baseUrl+"/grns/grn_no="+grnNo)
			.toPromise()
			.then(
				data => {
					this.showGrn(data)
				}
			)
			.catch(
				error => {
					ErrorService.showHttpError(error, 'The requested GRN could not be found')
					return
				}
			)
			this.spinnerService.hide()
		return found
	}
	async searchGrnDetail(id : any){
		/**Search grn detail by id,
		 * display detail in input fields for further processing */
		this.spinnerService.show()
		await this.httpClient.get(Data.baseUrl+"/grn_details/"+id)
		.toPromise()
		.then(
			data => {
				this.showGrnDetail(data)
			}
		)
		.catch(
			() => {
				return
			}
		)
		this.spinnerService.hide()
	}
	saveGrn(){
		/**Save a new or update an existing GRN */
		var saved : boolean = false

		return saved
	}
	showGrn(grn : any){
		/**Renders grn information for display */
		this.id             = grn['id']
		this.grnNo          = grn['grnNo']
		this.createdBy      = grn['createdBy']
		this.approvedBy     = grn['approvedBy']
		this.grnDate        = grn['grnDate']
		this.status         = grn['status']
		if(grn['supplier'] != null){
			this.supplierCode   = grn['supplier'].supplierCode
			this.supplierName   = grn['supplier'].supplierName
		}else{
			this.supplierCode = ''
			this.supplierName = ''
		}
		if(grn['grnDetail'] != null){
			this.grnDetails = grn['grnDetail']
		}else{
			this.grnDetails = {}
		}
		this.refreshDetails(this.grnNo)
	}
	getGrnData(){
		/**Return an GRN object for further processing */
		return  {
			id             : this.id,
			grnNo          : this.grnNo,
			supplierCode   : this.supplierCode,
			supplierName   : this.supplierName,
			createdBy      : this.createdBy,
			approvedBy     : this.approvedBy,
			grnDate        : this.grnDate,
			status         : this.status
		}
	}
	async approveGrn(GrnNo : string){
		/**Approve a pending Grn */
		if(GrnNo == ''){
			MessageService.showMessage('Error: No GRN selected!\nPlease select an GRN to approve')
		}else{
			if(window.confirm('Confirm approval?\nThe GRN will be approved.\nConfirm?')){
				/**Approve the selected grn */
				await this.httpClient.put(Data.baseUrl + "/grns/approve/"+this.id, null,{responseType:'text'})
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
	async printGrn(grnNo : string){
		/**Print an approved GRN or reprint a printed GRN */
		if(grnNo == ''){
			MessageService.showMessage('Error: No GRN selected!\nPlease select an GRN to print')
		}else{
			if(window.confirm('Confirm printing?\nThe GRN will be printed.\nConfirm?')){
				/**Print the selected grn */
				await this.httpClient.put(Data.baseUrl+"/grns/print/"+this.id, null, {responseType:'text'})
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
	async cancelGrn(grnNo : string){
		var canceled :boolean = false
		if(grnNo == ''){
			MessageService.showMessage('Error: No GRN selected!\nPlease select an GRN to cancel')
		}else{
			if(window.confirm('Confirm Canceling?\nThe GRN will be canceled.\nConfirm?')){
				/**Cancel the selected grn */
				await this.httpClient.put(Data.baseUrl+"/grns/cancel/"+this.id, null, {responseType:'text'})
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

	createGrn(){
		/**Create a new grn with the specified details
		 * Return back the newly created Grn details and
		 * assign them to the grn variables
		*/
		return {
			grnNo          : this.grnNo,
			supplier       :{
							supplierCode   : this.supplierCode,
							supplierName   : this.supplierName,
							},
			createdBy      : this.createdBy,
			approvedBy     : '',
			grnDate        : this.grnDate
		}
	}
	dele
	saveGrnDetail(){
		if(this.grnNo == ''){
			MessageService.showMessage('Order number required.\nSelect new for a new Grn')
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
		if(this.qtyOrdered <= 0 || isNaN(this.qtyOrdered)){
			MessageService.showMessage('Error: Invalid quantity!\nQuantity must be numeric and more than zero')
			return
		}
		if(this.grnDetailId == ''){
			this.addGrnDetail()
		}else{
			this.updateGrnDetail()
		}
	}

	async addGrnDetail(){
		var added : boolean = false
		this.lockGrn()
		this.lockSupplier()
		this.spinnerService.show()
		if(this.id == ''){
			/**post grn and return newly created grn details and
			 * assign it to the field variables
			 */
			
			await this.httpClient.post(Data.baseUrl + "/grns" , this.createGrn())
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
			await this.httpClient.get(Data.baseUrl+"/grns/"+this.id)
			.toPromise()
			.then(
				data => {
					this.showGrn(data)
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
		/**Add a new GRN detail */
		if(this.validateSupplier() == true){
			/**Add item */
			this.httpClient.post(Data.baseUrl + "/grn_details" , this.getGrnDetailData())
			.toPromise()
			.then(
				() => {
					added = true
					this.clearItem()
					this.unlockItem()
					this.refreshDetails(this.grnNo)
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
  clearItem() {
    throw new Error('Method not implemented.');
  }
	updateGrnDetail(){
		/**Update an existing GRN detail */
		var updated : boolean =false
		this.spinnerService.show()
		this.httpClient.put(Data.baseUrl + "/grn_details/"+this.grnDetailId , this.getGrnDetailData(),{responseType : 'text'})
		.toPromise()
		.then(
			() => {
				updated = true
				this.clearItem()
				this.unlockItem()
				this.refreshDetails(this.grnNo)
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
	
	deleteGrnDetail(id : any){
		/**Delete an GRN detail */
		var deleted : boolean = false
		if(id == ''){
			MessageService.showMessage('Error: No item selected!\nPlease select an item to delete')
		}else{
			/**Delete the selected item */
			this.spinnerService.show()
			this.httpClient.delete(Data.baseUrl+"/grn_details/"+id, {responseType : 'text'})
			.toPromise()
			.then(
				() => {
					this.clearItem()
					this.refreshDetails(this.grnNo)
				}
			)
			.catch(
				() => {
					MessageService.showMessage('Could not delete')
				}
			)
			this.spinnerService.hide()
			deleted = true
		}
		return deleted
	}
	showGrnDetail(grnDetail : any){
		/**Renders grn detail information for display */
		this.lockItem()
		this.grnDetailId = grnDetail['id']
		this.itemCode    = grnDetail['itemCode']
		this.description = grnDetail['description']
		this.qtyOrdered  = grnDetail['qtyOrdered']
		if(this.grnDetailId != ''){
			this.unlockAdd()
		}else{
			this.lockAdd()
		}
	}
	getGrnDetailData(){
		/**Gets the grn details from inputs for further processing */
		return {
			id          : this.grnDetailId,
			itemCode    : this.itemCode,
			description : this.description,
			qtyOrdered  : this.qtyOrdered,
			grn 		: {
							grnNo : this.grnNo
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
			this.lockItem()
			this.unlockAdd()
			this.lockSupplier()
		}else{
			/** */
		}
	}
	async refreshDetails(grnNo : string){
		await this.httpClient.get(Data.baseUrl+"/grns/grn_no="+grnNo)
		.toPromise()
		.then(
			data => {
				this.grnDetails = data['grnDetail']
			}
		)
	}
	refresh(){
		window.location.reload()
	}
	pasteFromClipboard(){
		if(this.lockedGrn == false){
			this.grnNo = window.getSelection().toString()
		}
	}
	/**Lock variables */
	lockedSupplier : boolean = true
	lockedGrn      : boolean = true
	lockedItem     : boolean = false
	lockedAdd      : boolean = true
	private lockSupplier(){
		this.lockedSupplier = true
	}
	private lockGrn(){
		this.lockedGrn = true
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
	private unlockGrn(){
		this.lockedGrn = false
	}
	private unlockItem(){
		this.lockedItem = false
	}
	private unlockAdd(){
		this.lockedAdd = false
	}

}
