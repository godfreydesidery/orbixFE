import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lpo',
  templateUrl: './lpo.component.html',
  styleUrls: ['./lpo.component.css']
})
export class ListLPOComponent implements OnInit {
	/**LPO field variakbles */
	id
	lpoNo
	supplierCode
	supplierName
	createdBy
	approvedBy
	lpoDate
	validityPeriod
	validUntil
	status
	
	/**Lpo detail field variables */
	lpoDetailId
	itemCode
	description
	qtyOrdered
	costPrice


  constructor() { }

  ngOnInit(): void {
  }

}
