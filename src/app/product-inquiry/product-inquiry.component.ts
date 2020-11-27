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

  private baseUrl = AppComponent.baseUrl
  //field variables
  id
  primaryBarcode
  itemCode
  longDescription
  shortDescription
  ingredients
  packSize
  supplier
  department
  _class
  subClass
  unitCostPrice
  unitRetailPrice
  profitMargin
  standardUom
  vat       
  discount
  quantity
  maximumInventory
  minimumInventory
  defaultReOrderLevel
  reOrderQuantity

  constructor(private httpClient: HttpClient,private completerService: CompleterService ) {

    this.dataService = completerService.local(this.searchData, 'color', 'color');


    this.id               ='';
    this.primaryBarcode   ='';
    this.itemCode         ='';
    this.longDescription  ='';
    this.shortDescription ='';
    this.ingredients      ='';
    this.packSize         ='';
    this.supplier         ='';
    this.department       ='';
    this._class           ='';
    this.subClass         ='';
    this.unitCostPrice    ='';
    this.unitRetailPrice  ='';
    this.profitMargin     ='';
    this.standardUom      ='';
    this.vat              ='';
    this.discount         ='';
    this.quantity         ='';
    this.maximumInventory ='';
    this.minimumInventory ='';
    this.defaultReOrderLevel='';
    this.reOrderQuantity  ='';
   }

  ngOnInit(): void {
    
  }

  ngAfterContentInit() {
   
  }

  async searchItem() { 
    /**
     * search item by id
     * gets id from getItemId
     */
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
    this.id                   = item['id'],
    this.primaryBarcode       = item['primaryBarcode'],
    this.itemCode             = item['itemCode'],
    this.longDescription      = item['longDescription'],
    this.shortDescription     = item['shortDescription'],
    this.ingredients          = item['ingredients'],
    this.packSize             = item['packSize'],
    this.supplier             = item['supplier'],
    this.department           = item['department'],
    this._class               = item['_class'],
    this.subClass             = item['subClass'],
    this.unitCostPrice        = item['unitCostPrice'],
    this.unitRetailPrice      = item['unitRetailPrice'],
    this.profitMargin         = item['profitMargin'],
    this.standardUom          = item['standardUom'],
    this.vat                  = item['vat'],
    this.discount             = item['discount']
    this.quantity             = item['quantity'],
    this.maximumInventory     = item['maximumInventory'],
    this.minimumInventory     = item['minimumInventory'],
    this.defaultReOrderLevel  = item['defaultReOrderLevel'],
    this.reOrderQuantity      = item['reOrderQuantity']
  }
  clear(){
    //clear the fields
    this.id               ='';
    this.primaryBarcode   ='';
    this.itemCode         ='';
    this.longDescription  ='';
    this.shortDescription ='';
    this.ingredients      ='';
    this.packSize         ='';
    this.supplier         ='';
    this.department       ='';
    this._class           ='';
    this.subClass         ='';
    this.unitCostPrice    ='';
    this.unitRetailPrice  ='';
    this.profitMargin     ='';
    this.standardUom      ='';
    this.vat              ='';
    this.discount         ='';
    this.quantity         ='';
    this.maximumInventory ='';
    this.minimumInventory ='';
    this.defaultReOrderLevel='';
    this.reOrderQuantity  ='';
  }

  

  public searchStr: string;
  public captain: string;
  public dataService: CompleterData;
  public searchData = [
    { color: 'red', value: '#f00' },
    { color: 'green', value: '#0f0' },
    { color: 'blue', value: '#00f' },
    { color: 'cyan', value: '#0ff' },
    { color: 'magenta', value: '#f0f' },
    { color: 'yellow', value: '#ff0' },
    { color: 'black', value: '#000' }
  ];
  public captains = ['James T. Kirk', 'Benjamin Sisko', 'Jean-Luc Picard', 'Spock', 'Jonathan Archer', 'Hikaru Sulu', 'Christopher Pike', 'Rachel Garrett' ];
 
  


  

  


}

