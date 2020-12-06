import { Component, OnInit } from '@angular/core';
import { AppComponent } from'../app.component'
import { ItemService } from '../item.service'
import { Observable } from 'rxjs';
import { AfterContentInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Data } from '../data';
import * as bootstrap from "bootstrap";

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { CompleterService, CompleterData } from 'ng2-completer';

//import * as $ from 'jquery-ui/external/requirejs/require.js';



@Component({
  selector: 'app-product-inquiry',
  templateUrl: './product-inquiry.component.html',
  styleUrls: ['./product-inquiry.component.css']
})
export class ProductInquiryComponent implements OnInit {

  public items: string [] = []
  public suppliers: string [] = []

  //field variables
  id:any
  primaryBarcode      : string
  itemCode            : string
  longDescription     : string
  shortDescription    : string
  ingredients         : string
  packSize            : number
  supplierName        : string
  departmentName      : string
  _className          : string
  subClassName        : string
  unitCostPrice       : number
  unitRetailPrice     : number
  profitMargin        : number
  standardUom         : string
  vat                 : number       
  discount            : number
  quantity            : number
  maximumInventory    : number
  minimumInventory    : number
  defaultReOrderLevel : number
  reOrderQuantity     : number

  constructor(private httpClient: HttpClient ) {

    this.id                  = '';
    this.primaryBarcode      = '';
    this.itemCode            = '';
    this.longDescription     = '';
    this.shortDescription    = '';
    this.ingredients         = '';
    this.packSize            = null;
    this.supplierName        = '';
    this.departmentName      = '';
    this._className          = '';
    this.subClassName        = '';
    this.unitCostPrice       = null;
    this.unitRetailPrice     = null;
    this.profitMargin        = null;
    this.standardUom         = '';
    this.vat                 = null;
    this.discount            = null;
    this.quantity            = null;
    this.maximumInventory    = null;
    this.minimumInventory    = null;
    this.defaultReOrderLevel = null;
    this.reOrderQuantity     = null;
   }

  ngOnInit(): void {
    /**
     * load items description to enable autocomplete
     */
    ((new ItemService(this.httpClient)).getItemsLongDescriptions())
    .then(
      res=>{
        Object.values(res).map((longDescription:string)=>{
          this.items.push(longDescription)
        })
      }
    );
  }

  ngAfterContentInit() {
   
  }

  async searchItem() { 
    /**
     * search item by id
     * gets id from getItemId
     */
    if(this.primaryBarcode == '' && this.itemCode == '' && this.longDescription == ''){
      alert('Please enter a search key!')
      this.clear()
      return
    }
    var itemId=''
    itemId = await (new ItemService(this.httpClient)).getItemId(this.primaryBarcode,this.itemCode,this.longDescription)
    if(itemId==''||itemId==null){
      alert('No matching record')
    }else{
      var item
      item =await (new ItemService(this.httpClient)).getItem(itemId)
      console.log(item)
      this.showItem(item)
    }
  }
  async getItem (id) {
    /**
     * gets item details with a specified id from datastore
     */
    this.clear
    var item = {}
    await this.httpClient.get(Data.baseUrl+"/items/"+id)
    .toPromise()
    .then(
      data=>{
        item=data
        console.log(item)
      },
      error=>{
        if(error['status']==404){

        }else if (error['status']==400){
          window.alert('Bad request, undefined operation!')
        }
        console.log(error)
      }
    )
    .catch(
      error=>{
        alert('Error code: '+error['status'])
      }
    )
    return item
  }
  showItem(item){
    //render item information for display, these are displayed 
    //automatically using two way data binding
    this.id                   = item['id']
    this.primaryBarcode       = item['primaryBarcode']
    this.itemCode             = item['itemCode']
    this.longDescription      = item['longDescription']
    this.shortDescription     = item['shortDescription']
    this.ingredients          = item['ingredients']
    this.packSize             = item['packSize']
    this.unitCostPrice        = item['unitCostPrice']
    this.unitRetailPrice      = item['unitRetailPrice']
    this.profitMargin         = item['profitMargin']
    this.standardUom          = item['standardUom']
    this.vat                  = item['vat']
    this.discount             = item['discount']
    this.quantity             = item['quantity']
    this.maximumInventory     = item['maximumInventory']
    this.minimumInventory     = item['minimumInventory']
    this.defaultReOrderLevel  = item['defaultReOrderLevel']
    this.reOrderQuantity      = item['reOrderQuantity']
    this.supplierName         = item['supplier'].supplierName
    this.departmentName       = item['department'].departmentName
    this._className           = item['_class']
    this.subClassName         = item['subClass']
  }
  clear(){
    //clear the fields
    this.id                  = '';
    this.primaryBarcode      = '';
    this.itemCode            = '';
    this.longDescription     = '';
    this.shortDescription    = '';
    this.ingredients         = '';
    this.packSize            = null;
    this.supplierName        = '';
    this.departmentName      = '';
    this._className          = '';
    this.subClassName        = '';
    this.unitCostPrice       = null;
    this.unitRetailPrice     = null;
    this.profitMargin        = null;
    this.standardUom         = '';
    this.vat                 = null;
    this.discount            = null;
    this.quantity            = null;
    this.maximumInventory    = null;
    this.minimumInventory    = null;
    this.defaultReOrderLevel = null;
    this.reOrderQuantity     = null;
  }

}

