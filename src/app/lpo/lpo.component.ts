import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

	public lpoDetails : object = {}


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
	createLpo(){
		/**Create a new Lpo */
		var created : boolean =false

		return created
	}
	generateLpoNo(){
		/**Generate a unique LPO No */
		var lpoNo : boolean = null

		return lpoNo
	}
	searchLpo(lpoNo : string){
		/**Searches specified lpo, displays lpo and return true if found,
		 * else return false
		 */
		var found : boolean = false

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
		this.supplierCode   = lpo['supplierCode']
		this.supplierName   = lpo['supplierName']
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
	addLpoDetail(detail : any){
		/**Add a new LPO detail */
		var added : boolean = false
		if(this.validateSupplier(this.itemCode, this.supplierCode, this.supplierName) == true){
			/**Add item */
			added = true
		}else{
			MessageService.showMessage('Error: Could not add item\nItem may not be available for this supplier')
		}
		return added
	}
	updateLpoDetail(detail : any){
		/**Update an existing LPO detail */
		var updated : boolean =false

		return updated
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
	async searchSupplier(supplierCode : string, supplierName : string){
		/**Search a supplier */
		var found : boolean = false
		var supplier = (new SupplierService(this.httpClient)
							.getSupplier((new SupplierService(this.httpClient)
							.getSupplierId(supplierCode,supplierName))))
		this.supplierCode = supplier['supplierCode']
		this.supplierName = supplier['supplierName']
		return found
	}
	refresh(){
		window.location.reload()
	}
}
