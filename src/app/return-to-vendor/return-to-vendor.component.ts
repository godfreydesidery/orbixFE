import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Data } from '../data';
import { ItemService } from '../item.service';
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

}
