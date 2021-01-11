import { Component, OnInit } from '@angular/core';
import { Data } from '../data';
import { ErrorService } from '../error.service';
import { ItemService } from '../item.service';
import { MessageService } from '../message.service';
import { SupplierService } from '../supplier.service';
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient } from '@angular/common/http';
import { Input } from '@angular/core';

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
  grnDetails = null

  
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
  async receiveGoods(grnDetails){
    console.log(grnDetails)
    if(this.validateGrnDetails(grnDetails) == true) {
      await this.httpClient.put(Data.baseUrl+"/grn_details/"+this.id,grnDetails) //id grn
      .toPromise()
      .then(
        data => {
          grnDetails = data
          alert('Received successifully')
        }
      )
      .catch(
        error => {
          alert(error['error'])
        }
      )
    }
  }
  validateGrnDetails(grnDetails : any){
    var valid : boolean = false
    for(var i = 0; i < grnDetails.length; i++ ){
      var grnDetail = grnDetails[i]
      var itemCode : string = grnDetail['itemCode']
      var description : string = grnDetail['description']
      var supplierCostPrice : any = grnDetail['supplierCostPrice']
      var clientCostPrice : any  = grnDetail['clientCostPrice']
      var qtyOrdered : any = grnDetail['qtyOrdered']
      var qtyReceived : any = grnDetail['qtyReceived']
      var status : any = grnDetail['status']
      var orderNo : any  = grnDetail['orderNo']
      if(isNaN(supplierCostPrice) || isNaN(clientCostPrice) || isNaN(qtyOrdered) || isNaN(qtyReceived)){
        alert('Invalid entries, please check for numerical entries')
        return valid
      }
      if(supplierCostPrice < 0 || clientCostPrice < 0 || qtyOrdered < 0 || qtyReceived < 0){
        alert('Invalid entries, negative values are not allowed')
        return valid
      }
      if(qtyOrdered % 1 > 0 || qtyReceived % 1 > 0){
        alert('Invalid entries, fractional values are not allowed in Quantity')
        return valid
      }
      valid = true
    }
    return valid
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
        alert(error['error'])
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
    this.getGrnDetails(grn['id']) 
  }
  async getGrnDetails(grnId : any){
    var _grnDetails = null
    await this.httpClient.get(Data.baseUrl+"/grn_details/grn_id="+grnId)
    .toPromise()
    .then(
        data => {
          this.grnDetails = data
      }
    )
    .catch(
      error => {
        alert(error['error'])
      }
    )
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
export class GrnDetail{
  itemCode : string
  description : string
  supplierCostPrice : number
  clientCostPrice : number
  qtyOrdered : number
  qtyReceived : number
  expiryDate : Date
  status : string
  lotNo : string
  orderNo : string
}


