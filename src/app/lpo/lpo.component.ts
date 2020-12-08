import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { Data } from '../data';
import { ErrorService } from '../error.service';
import { HttpErrorService } from '../http-error.service';
import { ItemService } from '../item.service';
import { MessageService } from '../message.service';
import { SupplierService } from '../supplier.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Spinner } from 'ngx-spinner/lib/ngx-spinner.enum';

@Component({
  selector: 'app-lpo',
  templateUrl: './lpo.component.html',
  styleUrls: ['./lpo.component.css']
})
export class LPOComponent implements OnInit {
	/**LPO field variakbles */
	id             : any
	lpoNo          : string
	supplierCode   : string
	supplierName   : string
	createdBy      : string
	approvedBy     : string
	lpoDate        : Date
	validityPeriod : number
	validUntil     : Date
	status         : string
	
	/**Lpo detail field variables */
	lpoDetailId : any
	barcode     : any
	itemCode    : string
	description : string
	qtyOrdered  : number
	costPrice   : number

	/**Collections */
	descriptions  : string[] = []
	supplierNames : string[] = []

	public lpoDetails = {}


	constructor(private httpClient : HttpClient, private spinnerService : NgxSpinnerService) {
		/**Lpo */
		this.id             = ''
		this.barcode        = ''
		this.lpoNo          = ''
		this.supplierCode   = ''
		this.supplierName   = ''
		this.createdBy      = ''
		this.approvedBy     = ''
		this.lpoDate        = null
		this.validityPeriod = null
		this.validUntil 	  = null
		this.status         = ''
		/**Lpo details */
		this.lpoDetailId    = ''
		this.itemCode       = ''
		this.description    = ''
		this.qtyOrdered     = null
		this.costPrice      = null
	}

	ngOnInit(): void {
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
		console.log(this.lpoDetails)
	}
	newLpo(){
		/**Create a new Lpo */
		var created : boolean =false
		this.clear()
		this.lockLpo()
		this.unlockSupplier()
		this.unlockItem()
		this.lockAdd()
		this.lpoNo = this.generateLpoNo()
		return created
	}
	editLpo(){
		/**Prompts user to edit an existing order */
		this.clear()
		this.lockSupplier()
		this.unlockLpo()
		this.lockAdd()
	}
	clear(){
		this.id             = ''
		this.barcode        = ''
		this.lpoNo          = ''
		this.supplierCode   = ''
		this.supplierName   = ''
		this.createdBy      = ''
		this.approvedBy     = ''
		this.lpoDate        = null
		this.validityPeriod = null
		this.validUntil 	  = null
		this.status         = ''
		/**Lpo details */
		this.lpoDetailId    = ''
		this.itemCode       = ''
		this.description    = ''
		this.qtyOrdered     = null
		this.costPrice      = null

		this.lpoDetails     = null
	}
	clearItem(){
		/**Clear item data */
		this.lpoDetailId    = ''
		this.itemCode       = ''
		this.description    = ''
		this.qtyOrdered     = null
		this.costPrice      = null
		this.unlockItem()
		this.lockAdd()
	}
	generateLpoNo(){
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
		return "LPO-"+result1+result2
	}
	async searchLpo(lpoNo : string){
		/**Searches specified lpo, displays lpo and return true if found,
		 * else return false
		 */
		var found : boolean = false
		this.lockLpo()
		this.lockSupplier()
		this.spinnerService.show()
		await this.httpClient.get(Data.baseUrl+"/lpos/lpo_no="+lpoNo)
			.toPromise()
			.then(
				data => {
					this.showLpo(data)
				}
			)
			.catch(
				error => {
					ErrorService.showHttpError(error, 'The requested LPO could not be found')
					return
				}
			)
			this.spinnerService.hide()
		return found
	}
	async searchLpoDetail(id : any){
		/**Search lpo detail by id,
		 * display detail in input fields for further processing */
		this.spinnerService.show()
		await this.httpClient.get(Data.baseUrl+"/lpo_details/"+id)
		.toPromise()
		.then(
			data => {
				this.showLpoDetail(data)
			}
		)
		.catch(
			error => {
				return
			}
		)
		this.spinnerService.hide()
	}
	saveLpo(lpoNo : string){
		/**Save a new or update an existing LPO */
		var saved : boolean = false

		return saved
	}
	showLpo(lpo : any){
		/**Renders lpo information for display */
		this.id             = lpo['id']
		this.lpoNo          = lpo['lpoNo']
		this.createdBy      = lpo['createdBy']
		this.approvedBy     = lpo['approvedBy']
		this.lpoDate        = lpo['lpoDate']
		this.validityPeriod = lpo['validityPeriod']
		this.validUntil     = lpo['validUntil']
		this.status         = lpo['status']
		if(lpo['supplier'] != null){
			this.supplierCode   = lpo['supplier'].supplierCode
			this.supplierName   = lpo['supplier'].supplierName
		}else{
			this.supplierCode = ''
			this.supplierName = ''
		}
		if(lpo['lpoDetail'] != null){
			this.lpoDetails = lpo['lpoDetail']
			
		}else{
			this.lpoDetails = {}
		}
		this.refreshDetails(this.lpoNo)
	}
	getLpoData(){
		/**Return an LPO object for further processing */
		return  {
			id             : this.id,
			lpoNo          : this.lpoNo,
			supplierCode   : this.supplierCode,
			supplierName   : this.supplierName,
			createdBy      : this.createdBy,
			approvedBy     : this.approvedBy,
			lpoDate        : this.lpoDate,
			validityPeriod : this.validityPeriod,
			validUntil     : this.validUntil,
			status         : this.status
		}
	}
	approveLpo(lpoNo : string){
		/**Approve a pending LPO */
		var approved : boolean = false
		if(lpoNo == ''){
			MessageService.showMessage('Error: No LPO selected!\nPlease select an LPO to approve')
		}else{
			if(window.confirm('Confirm approval?\nThe LPO will be approved.\nConfirm?')){
				/**Approve the selected lpo */
				approved = true
			}
		}
		return approved
	}
	printLpo(lpoNo : string){
		/**Print an approved LPO or reprint a printed LPO */
		var printed : boolean = false
		if(lpoNo == ''){
			MessageService.showMessage('Error: No LPO selected!\nPlease select an LPO to print')
		}else{
			if(window.confirm('Confirm printing?\nThe LPO will be printed.\nConfirm?')){
				/**Print the selected lpo */
				printed = true
			}
		}
		return printed
	}
	cancelLpo(lpoNo : string){
		var canceled :boolean = false
		if(lpoNo == ''){
			MessageService.showMessage('Error: No LPO selected!\nPlease select an LPO to cancel')
		}else{
			if(window.confirm('Confirm Canceling?\nThe LPO will be canceled.\nConfirm?')){
				/**Cancel the selected lpo */
				canceled = true
			}
		}
		return canceled
	}

	createLpo(){
		/**Create a new lpo with the specified details
		 * Return back the newly created order details and
		 * assign them to the lpo variables
		*/
		return {
			lpoNo          : this.lpoNo,
			supplier       :{
							supplierCode   : this.supplierCode,
							supplierName   : this.supplierName,
							},
			createdBy      : this.createdBy,
			approvedBy     : '',
			lpoDate        : this.lpoDate,
			validityPeriod : this.validityPeriod,
			validUntil     : this.validUntil,
			status         : 'PENDING'
		}
	}
	saveLpoDetail(){
		if(this.lpoNo == ''){
			MessageService.showMessage('Order number required.\nSelect new for a new order')
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
		if(this.lpoDetailId == ''){
			this.addLpoDetail()
		}else{
			this.updateLpoDetail()
		}
	}

	async addLpoDetail(){
		var added : boolean = false
		this.lockLpo()
		this.lockSupplier()
		this.spinnerService.show()
		if(this.id == ''){
			/**post lpo and return newly created lpo details and
			 * assign it to the field variables
			 */
			
			await this.httpClient.post(Data.baseUrl + "/lpos" , this.createLpo())
			.toPromise()
			.then(
				data => {
					this.id=data['id']
				}
			)
			.catch(
				error => {
					return
				}
			)
			if(this.id == ''){
				return
			}
			await this.httpClient.get(Data.baseUrl+"/lpos/"+this.id)
			.toPromise()
			.then(
				data => {
					this.showLpo(data)
				}
			)
			.catch(
				error => {
					return
				}
			)
			if(this.id == ''){
				return
			}
			
		}
		/**Add a new LPO detail */
		if(this.validateSupplier(this.itemCode, this.supplierCode, this.supplierName) == true){
			/**Add item */
			this.httpClient.post(Data.baseUrl + "/lpo_details" , this.getLpoDetailData())
			.toPromise()
			.then(
				data => {
					added = true
					this.clearItem()
					this.unlockItem()
					this.refreshDetails(this.lpoNo)
					MessageService.showMessage('Item added successifully')
				}
			)
			.catch(
				error => {
					added = false
					ErrorService.showHttpError(error, 'Could not add item')
				}
			)
				
		}else{
			MessageService.showMessage('Error: Could not add item\nItem may not be available for this supplier')
		}
		this.spinnerService.hide()
		return added
	}
	updateLpoDetail(){
		/**Update an existing LPO detail */
		var updated : boolean =false
		this.spinnerService.show()
		this.httpClient.put(Data.baseUrl + "/lpo_details/"+this.lpoDetailId , this.getLpoDetailData())
		.toPromise()
		.then(
			data => {
				updated = true
				this.clearItem()
				this.unlockItem()
				this.refreshDetails(this.lpoNo)
				MessageService.showMessage('Item updated successifully')
			}
		)
		.catch(
			error => {
				updated = false
				ErrorService.showHttpError(error, 'Could not update item')
			}
		)
		this.spinnerService.hide()
		return updated
	}
	
	deleteLpoDetail(id : any){
		/**Delete an LPO detail */
		var deleted : boolean = false
		if(id == ''){
			MessageService.showMessage('Error: No item selected!\nPlease select an item to delete')
		}else{
			/**Delete the selected item */
			this.spinnerService.show()
			this.httpClient.delete(Data.baseUrl+"/lpo_details/"+id)
			.toPromise()
			.then(
				data => {
					this.clearItem()
					this.refreshDetails(this.lpoNo)
				}
			)
			.catch(
				error => {
					MessageService.showMessage('Could not delete')
					console.log(error)
				}
			)
			this.spinnerService.hide()
			deleted = true
		}
		return deleted
	}
	showLpoDetail(lpoDetail : any){
		/**Renders lpo detail information for display */
		this.lockItem()
		this.lpoDetailId = lpoDetail['id']
		this.itemCode    = lpoDetail['itemCode']
		this.description = lpoDetail['description']
		this.qtyOrdered  = lpoDetail['qtyOrdered']
		this.costPrice   = lpoDetail['costPrice']
		if(this.lpoDetailId != ''){
			this.unlockAdd()
		}else{
			this.lockAdd()
		}
	}
	getLpoDetailData(){
		/**Gets the lpo details from inputs for further processing */
		return {
			id          : this.lpoDetailId,
			itemCode    : this.itemCode,
			description : this.description,
			qtyOrdered  : this.qtyOrdered,
			costPrice   : this.costPrice,
			lpo 		: {
							lpoNo : this.lpoNo
						}
		}
	}
	validateSupplier(itemCode : string, supplierCode : string, supplierName : string){
		/**Validate the supplier of a particular item,
		 * checks if the item is supplied by that particular supplier and
		 * returns true if supplier is active and supplies that particular item
		 */
		var valid : boolean = true

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

		}
		
	}
	async refreshDetails(id : string){
		this.spinnerService.show()
		await this.httpClient.get(Data.baseUrl+"/lpos/lpo_no="+id)
		.toPromise()
		.then(
			data => {
				this.lpoDetails = data['lpoDetail']
				console.log(data['lpoDetail'])
			}
		)
		this.spinnerService.hide()
	}
	refresh(){
		window.location.reload()
	}
	lockedSupplier : boolean = true
	lockedLpo : boolean = true
	lockedItem : boolean = false
	lockedAdd : boolean = true
	private lockSupplier(){
		this.lockedSupplier = true
	}
	private lockLpo(){
		this.lockedLpo = true
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
		this.lockedLpo = false
	}
	private unlockItem(){
		this.lockedItem = false
	}
	private unlockAdd(){
		this.lockedAdd = false
	}

}
