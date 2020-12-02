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
import { CompleterService, CompleterData } from 'ng2-completer';
import { Crud } from '../crud';
import { UnitService } from '../unit.service';

@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.css'],


})


export class ProductMasterComponent implements OnInit  {
  /**
   * field variables
   */
  id:any
  primaryBarcode:string
  itemCode:string
  longDescription:string
  shortDescription:string
  ingredients:string
  packSize:number
  supplierName:string
  departmentName:string
  _className:string
  subClassName:string
  unitCostPrice:number
  unitRetailPrice:number
  profitMargin:number
  standardUom:string
  vat:number       
  discount:number
  quantity:number
  maximumInventory:number
  minimumInventory:number
  defaultReOrderLevel:number
  reOrderQuantity:number

  public items: string [] = []
  public suppliers: string [] = []

  public classNames: string [] = []
  public departmentNames: string [] = []

  constructor(private httpClient: HttpClient ) {
    this.id               ='';
    this.primaryBarcode   ='';
    this.itemCode         ='';
    this.longDescription  ='';
    this.shortDescription ='';
    this.ingredients      ='';
    this.packSize         =null;
    this.supplierName     ='';
    this.departmentName       ='';
    this._className           ='';
    this.subClassName         ='';
    this.unitCostPrice    =null;
    this.unitRetailPrice  =null;
    this.profitMargin     =null;
    this.standardUom      ='';
    this.vat              =null;
    this.discount         =null;
    this.quantity         =null;
    this.maximumInventory =null;
    this.minimumInventory =null;
    this.defaultReOrderLevel=null;
    this.reOrderQuantity  =null;

    
  }
  async ngOnInit(): Promise<void> { 
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

    /**
     * load supplier names to enable autocomplete
     */
    ((new SupplierService(this.httpClient)).getSuppliersNames())
    .then(
      res=>{
        Object.values(res).map((supplierName:string)=>{
          this.suppliers.push(supplierName)
        })
      }
    );

    this.departmentNames = await (new UnitService(this.httpClient)).getDepartmentNames()

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
      supplier            :{supplierName:this.supplierName},
      department          :{departmentName:this.departmentName},
      _class              : this._className,
      subClass            : this.subClassName,
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
    this.packSize            =null;
    this.supplierName            ='';
    this.departmentName          ='';
    this._className              ='';
    this.subClassName            ='';
    this.unitCostPrice       =null;
    this.unitRetailPrice     =null;
    this.profitMargin        =null;
    this.standardUom         ='';
    this.vat                 =null;
    this.discount            =null;
    this.quantity            =null;
    this.maximumInventory    =null;
    this.minimumInventory    =null;
    this.defaultReOrderLevel =null;
    this.reOrderQuantity     =null;
  }

  showItem(item: object){
    
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

  validateData(){
    /**
     * validates user inputs
     * return false if validation fails
     */
    var valid : boolean = true
    var message : string = ''
    if(this.primaryBarcode == ''){
      valid = false
      message = message+'\nPrimary barcode is a required field!'
    }
    if(this.itemCode == ''){
      valid = false
      message = message+'\nItem code is a required field!'
    }
    if(this.longDescription == ''){
      valid = false
      message = message+'\nLong description is a required field!'
    }
    if(this.shortDescription == ''){
      valid = false
      message = message+'\nShort description is a required field!'
    }
    if(isNaN(this.packSize)){
      valid = false
      message = message+'\nPack size is a required field!'
    }
    
    if (message != ''){
      alert('Error:'+message)
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

}