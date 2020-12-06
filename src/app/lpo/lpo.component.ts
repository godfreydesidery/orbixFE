import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Data } from '../data';
import { ItemService } from '../item.service';
import { MessageService } from '../message.service';
import { SupplierService } from '../supplier.service';

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

	public lpoDetails : object = {"itemCode":"1"}


	constructor(private httpClient : HttpClient) {
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
	}
	newLpo(){
		/**Create a new Lpo */
		var created : boolean =false
		this.clear()
		this.lockLpo()
		this.unlockSupplier()
		this.lpoNo = this.generateLpoNo()
		return created
	}
	editLpo(){
		/**Prompts user to edit an existing order */
		this.clear()
		this.lockSupplier()
		this.unlockLpo()
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
	searchLpo(lpoNo : string){
		/**Searches specified lpo, displays lpo and return true if found,
		 * else return false
		 */
		var found : boolean = false
		this.lockLpo()
		this.lockSupplier()

		return found
	}
	searchLpoDetail(id : any){
		/**Search lpo detail by id,
		 * display detail in input fields for further processing */

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
		this.supplierCode   = lpo['supplier'].supplierCode
		this.supplierName   = lpo['supplier'].supplierName
		this.createdBy      = lpo['createdBy']
		this.approvedBy     = lpo['approvedBy']
		this.lpoDate        = lpo['lpoDate']
		this.validityPeriod = lpo['validityPeriod']
		this.validUntil     = lpo['validUntil']
		this.status         = lpo['status']
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
			supplierCode   : this.supplierCode,
			supplierName   : this.supplierName,
			createdBy      : this.createdBy,
			approvedBy     : '',
			lpoDate        : this.lpoDate,
			validityPeriod : this.validityPeriod,
			validUntil     : this.validUntil,
			status         : 'PENDING'
		}
	}

	async addLpoDetail(){
		var added : boolean = false
		if(this.supplierCode == ''){
			MessageService.showMessage('Please select a supplier')
			return
		}else{
			this.lockLpo()
			this.lockSupplier()
			if(this.id == ''){
				/**post lpo and return newly created lpo details and
				 * assign it to the field variables
				 */
				this.httpClient.post(Data.baseUrl + "/lpos" , this.createLpo())
				.subscribe(
				  data=>{
					this.id=data['id']
				  },
				  error=>{
					return
				  }
				)
				var lpo = {}
				await this.httpClient.get(Data.baseUrl+"/lpos/"+this.id)
				.toPromise()
				.then(
					data=>{
						lpo=data
					}
				)
				.catch(
					error=>{
						return
					}
				)
				this.showLpo(lpo)
			}
		}
		/**Add a new LPO detail */
		if(this.validateSupplier(this.itemCode, this.supplierCode, this.supplierName) == true){
			/**Add item */
			this.httpClient.post(Data.baseUrl + "/lpo_details" , this.getLpoDetailData)
				.subscribe(
				  data=>{
					added = true
				  },
				  error=>{
					added = false
				  }
				)
		}else{
			MessageService.showMessage('Error: Could not add item\nItem may not be available for this supplier')
		}
		return added
	}
	updateLpoDetail(){
		/**Update an existing LPO detail */
		var updated : boolean =false

		return updated
	}
	async refreshLpoDetails(id : any){
		this.lpoDetails = {}
		await this.httpClient.get(Data.baseUrl+"/lpos/"+id)
		.toPromise()
		.then(
			data=>{
				/**return an object with all the details of the specific lpo */
				this.lpoDetails=data
			}
		)
		.catch(
			error=>{
				return
			}
		)
	}
	deleteLpoDetail(id : any){
		/**Delete an LPO detail */
		var deleted : boolean = false
		if(id == ''){
			MessageService.showMessage('Error: No item selected!\nPlease select an item to delete')
		}else{
			if(window.confirm('Confirm delete?\nThe item will be removed from order details.\nConfirm?')){
				/**Delete the selected item */
				deleted = true
			}
		}
		return deleted
	}
	showLpoDetail(lpoDetail : any){
		/**Renders lpo detail information for display */
		this.lpoDetailId = lpoDetail['id']
		this.itemCode    = lpoDetail['itemCode']
		this.description = lpoDetail['description']
		this.qtyOrdered  = lpoDetail['qtyOrdered']
		this.costPrice   = lpoDetail['costPrice']
	}
	getLpoDetailData(){
		/**Gets the lpo details from inputs for further processing */
		return {
			id          : this.lpoDetailId,
			itemCode    : this.itemCode,
			description : this.description,
			qtyOrdered  : this.qtyOrdered,
			costPrice   : this.qtyOrdered 
		}
	}
	validateSupplier(itemCode : string, supplierCode : string, supplierName : string){
		/**Validate the supplier of a particular item,
		 * checks if the item is supplied by that particular supplier and
		 * returns true if supplier is active and supplies that particular item
		 */
		var valid : boolean = false

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
	refresh(){
		window.location.reload()
	}
	lockedSupplier : boolean = false
	lockedLpo : boolean = false
	lockedItem : boolean = false
	private lockSupplier(){
		this.lockedSupplier = true
	}
	private lockLpo(){
		this.lockedLpo = true
	}
	private lockItem(){
		this.lockedItem = true
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

}
