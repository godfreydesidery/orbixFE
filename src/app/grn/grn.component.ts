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
  public id        : any
  public grnNo     : string
  public orderType : string
  public orderNo   : string
  public invoiceNo : string
  public grnDate   : Date
  public status    : string

	/**Collections */
	public grnDetails = {}
  
  constructor(private httpClient : HttpClient, private spinnerService : NgxSpinnerService) {
    this.id        = ''
    this.grnNo     = ''
    this.orderType = ''
    this.orderNo   = ''
    this.invoiceNo = ''
    this.grnDate   = null
    this.status    = ''
	}

  ngOnInit(): void {
  }

  getGrnData(){
    return {
      id        : this.id,
      grnNo     : this.grnNo,
      orderType : this.orderType,
      orderNo   : this.orderNo,
      invoiceNo : this.invoiceNo,
      grnDate   : this.grnDate,
      status    : this.status
    }
  }
  async createGrn(){
    if(this.orderType == ''){
      alert('Could not create GRN.\nOrder type required. Please select order type')
      return
    }
    if(this.orderNo == ''){
      alert('Could not create GRN.\nOrder number required. Please enter order number')
      return
    }
    /**Now create grn */
    this.grnNo = this.generateGrnNo()
    
    var data = this.getGrnData()
    await this.httpClient.post(Data.baseUrl+"/grns",data)
    .toPromise()
    .then(
      data => {
        this.showGrn(data)
      }
    )
    .catch(
      error => {
        console.log(error)
      }
    )

  }
  showGrn(grn : any){
		/**Renders grn information for display */
		this.id          = grn['id']
		this.grnNo       = grn['grnNo']
		this.orderType   = grn['orderType']
		this.orderNo     = grn['orderNo']
		this.invoiceNo   = grn['invoiceNo']
		this.grnDate     = grn['grnDate']
		this.status      = grn['status']
		
		if(grn['lpo'] != null){
			this.grnDetails = grn['lpo'].lpoDetail
		}else{
			this.grnDetails = {}
		}
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

}
