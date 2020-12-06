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

}
