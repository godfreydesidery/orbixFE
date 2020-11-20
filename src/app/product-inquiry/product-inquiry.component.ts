import { Component, OnInit } from '@angular/core';
import { AppComponent } from'../app.component'
import { ItemService } from '../item.service'
import { Observable } from 'rxjs';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';


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

  constructor(private httpClient: HttpClient ) {
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

  searchItem() { 
    //search item
    this.id = '' //clear the field id
    var itemId = this.getItemId(this.primaryBarcode,this.longDescription) //gets the field id from specified record
    this.getItem(itemId) //search the record by id
  }
  getItem (id) {
    //gets item details with the specified id from datastore
    this.httpClient.get(this.baseUrl+"/items/"+id)
    .subscribe(
      data=>{
        this.showItem(data)
      },
      error=>{
        if(error['status']==404){
          window.alert('No matching record')
        }else if (error['status']==400){
          window.alert('Bad request, undefined operation!')
        }
        console.log(error)
      }
    )
  }
  getItemId(barcode,description){
    var id=this.primaryBarcode //just for testing, replace by ''
    //find corresponding item id

    return id;
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

}
