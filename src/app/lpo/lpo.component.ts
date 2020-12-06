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
	id : any
	lpoNo : string
	supplierCode : string
	supplierName :string
	createdBy :string
	approvedBy : string
	lpoDate :Date
	validityPeriod : number
	validUntil : Date
	status : string
	
	/**Lpo detail field variables */
	lpoDetailId : any
	itemCode : string
	description : string
	qtyOrdered : number
	costPrice : number

	/**Collections */
	descriptions  :string[] = []
	supplierNames :string[] = []


  constructor(private httpClient : HttpClient) {
	  this.id = ''
	  this.lpoNo = ''
	  this.supplierCode = ''
	  this.supplierName = ''
	  this.createdBy = ''
	  this.approvedBy = ''
	  this.lpoDate = null
	  this.validityPeriod = null
	  this.validUntil = null
	  this.status = ''

	  this.lpoDetailId = ''
	  this.itemCode = ''
	  this.description = ''
	  this.qtyOrdered = null
	  this.costPrice = null
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
}
