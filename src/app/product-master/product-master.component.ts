import { Component, OnInit } from '@angular/core';
import { AppComponent } from'../app.component'
import { ItemService } from '../item.service'
import { Observable } from 'rxjs';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { StatusbarComponent } from '../statusbar/statusbar.component';
import { delay, retry } from 'rxjs/operators';
import { Data } from '../data';
import { SupplierService } from '../supplier.service';
import { Ng2CompleterModule } from 'ng2-completer';

@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.css'],


})


export class ProductMasterComponent implements OnInit {





  

  userData: any[] = ["1","2"];
  /**
   * field variables
   */
  id
  primaryBarcode
  itemCode
  longDescription
  shortDescription
  ingredients
  packSize
  supplierName
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
    this.supplierName         ='';
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

  getItemData(){
    /**
     * gets item data from inputs
     */
    var itemData = {
      id                  : this.id,
      primaryBarcode      : this.primaryBarcode,
      itemCode            : this.itemCode,
      longDescription     : this.longDescription,
      shortDescription    : this.shortDescription,
      ingredients         : this.ingredients,
      packSize            : this.packSize,
      supplier            :{
                            supplierName:this.supplierName
                          },
      department          : this.department,
      _class              : this._class,
      subClass            : this.subClass,
      unitCostPrice       : this.unitCostPrice,
      unitRetailPrice     : this.unitRetailPrice,
      profitMargin        : this.profitMargin,
      standardUom         : this.standardUom,
      vat                 : this.vat,
      discount            : this.discount,
      quantity            : this.quantity,
      maximumInventory    : this.maximumInventory,
      minimumInventory    : this.minimumInventory,
      defaultReOrderLevel : this.defaultReOrderLevel,
      reOrderQuantity     : this.reOrderQuantity
    }
    return itemData;
  }

  clear(){
    /**
     * clear the fields
     */
    this.id                  ='';
    this.primaryBarcode      ='';
    this.itemCode            ='';
    this.longDescription     ='';
    this.shortDescription    ='';
    this.ingredients         ='';
    this.packSize            ='';
    this.supplierName            ='';
    this.department          ='';
    this._class              ='';
    this.subClass            ='';
    this.unitCostPrice       ='';
    this.unitRetailPrice     ='';
    this.profitMargin        ='';
    this.standardUom         ='';
    this.vat                 ='';
    this.discount            ='';
    this.quantity            ='';
    this.maximumInventory    ='';
    this.minimumInventory    ='';
    this.defaultReOrderLevel ='';
    this.reOrderQuantity     ='';
  }

  showItem(item){
    
    /**
     * render item information for display, these are displayed 
     * automatically using two way data binding
     */
    this.id                   = item['id']
    this.primaryBarcode       = item['primaryBarcode']
    this.itemCode             = item['itemCode']
    this.longDescription      = item['longDescription']
    this.shortDescription     = item['shortDescription']
    this.ingredients          = item['ingredients']
    this.packSize             = item['packSize']
    this.supplierName             = item['supplierName']
    this.department           = item['department']
    this._class               = item['_class']
    this.subClass             = item['subClass']
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
  }

  validateData(){
    /**
     * validates user inputs
     * return false if validation fails
     */
    var valid : boolean = true
    if(this.primaryBarcode == ''){
      valid = false
      window.alert('Barcode required')
      return valid
    }
    if(this.itemCode == ''){
      valid = false
      window.alert('Item code required')
      return valid
    }
    if(this.longDescription == ''){
      valid = false
      window.alert('Long Description required')
      return valid
    }
    if(this.shortDescription == ''){
      valid = false
      window.alert('Short Description required')
      return valid
    }
    if(isNaN(this.packSize)){
      valid = false
      window.alert('Invalid pack size\nPack size should be a whole number')
      return valid
    }
    
    return valid
  }

  saveItem() { 
    /**
     * create or update an item
     * first, check validation
     */
    if(this.validateData()==true){
      var item = this.getItemData()
      //item['supplier_id'] = (new SupplierService(this.httpClient)).getSupplierId(null,this.supplier)
      if( this.id == '' || this.id == null || this.id == 0 ) {
        //save a new item
        this.httpClient.post(Data.baseUrl + "/items" , item)
        .subscribe(
          data=>{
            window.alert('Item created successifully')
            console.log(data)
            this.id=data['id']
          },
          error=>{
            console.log(error)
          }
        )
      } else {
        //update an existing item
        this.httpClient.put(Data.baseUrl + "/items/" + this.id , item)
        .subscribe(
          data=>{
            window.alert('Item updated successifully')
            console.log(data)
            this.id=data['id']
          },
          error=>{
            console.log(error)
          }
        )
      }  
    }
  }
  async searchItem() { 
    /**
     * search item by id
     * gets id from getItemId
     */
    var itemId=''
    this.clear
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
  deleteItem() { 
    /**
     * delete an item given its id
     */
    var id = this.id
    this.httpClient.delete(Data.baseUrl+"/items/"+id)
    .subscribe(
      data=>{
        console.log(data)
        if(data==null){
          this.clear()
          alert('Item successifully deleted')
        }
      },
      error=>{
        console.log(error)
      }
    )
  }



  ngOnInit(): void {  };

}