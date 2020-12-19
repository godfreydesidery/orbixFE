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
  public id : any
  public lpoNo : string
  public grnNo : string
  

  

	/**Collections */
	public grnDetails = {}
  
  constructor(private httpClient : HttpClient, private spinnerService : NgxSpinnerService) {
		
	}

  ngOnInit(): void {
  }

  createNewGrn(){

  }

  
	

}
