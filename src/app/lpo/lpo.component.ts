import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
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

		return approved
	}
	printLpo(){
		/**Print an approved LPO or reprint a printed LPO */
		var printed : boolean = false

		return printed
	}
	deleteLpo(lpoNo : string){
		var deleted :boolean = false

		return deleted
	}
	addLpoDetail(detail : any){
		/**Add a new LPO detail */
		var added : boolean = false

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
}
