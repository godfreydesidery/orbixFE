import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import * as XLSX from 'xlsx';
import { Data } from '../data';

@Component({
  selector: 'app-mass-manager',
  templateUrl: './mass-manager.component.html',
  styleUrls: ['./mass-manager.component.css']
})
export class MassManagerComponent implements OnInit {

  data : [][]
  progress : boolean = false
  progressStatus : string = ''
  totalRecords   : number = 0
  currentRecord  : number = 0

  constructor(private httpClient: HttpClient) {
   }

  ngOnInit(): void {
  }
  clearProgress(){
    this.progressStatus = ''
    this.totalRecords = 0
    this.currentRecord = 0
  }

  uploadSupplierFile(evt : any){
    var supplierData :[][]
    if(this.progress == true){
      alert('Could not process, a mass operation going on')
      return
    }
    const target : DataTransfer = <DataTransfer> (evt.target)
    if(target.files.length !== 1){
      alert("Cannot use multiple files")
      return
    }
    const reader : FileReader = new FileReader()
    reader.onload = (e : any) => {
      const bstr : string = e.target.result
      const wb : XLSX.WorkBook = XLSX.read(bstr, {type : 'binary'})
      const wsname : string = wb.SheetNames[0]
      const ws : XLSX.WorkSheet = wb.Sheets[wsname]
      supplierData = (XLSX.utils.sheet_to_json(ws, {header : 1}))



      this.progress = true
      if(this.validateSupplier(supplierData) == true){
        this.progressStatus = 'Uploading.. please wait'
        this.uploadSupplier(supplierData)
      }else{
        alert('Invalid supplier file')
      }
      this.progress = false


    }
    
    
    reader.readAsBinaryString(target.files[0])

  }

  updateSupplierFile(evt : any){
    var supplierData :[][]
    if(this.progress == true){
      alert('Could not process, a mass operation going on')
      return
    }
    const target : DataTransfer = <DataTransfer> (evt.target)
    if(target.files.length !== 1){
      alert("Cannot use multiple files")
      return
    }
    const reader : FileReader = new FileReader()
    reader.onload = (e : any) => {
      const bstr : string = e.target.result
      const wb : XLSX.WorkBook = XLSX.read(bstr, {type : 'binary'})
      const wsname : string = wb.SheetNames[0]
      const ws : XLSX.WorkSheet = wb.Sheets[wsname]
      supplierData = (XLSX.utils.sheet_to_json(ws, {header : 1}))



      this.progress = true
      if(this.validateSupplier(supplierData) == true){
        this.progressStatus = 'Uploading.. please wait'
        this.updateSupplier(supplierData)
      }else{
        alert('Invalid supplier file')
      }
      this.progress = false


    }
    
    
    reader.readAsBinaryString(target.files[0])

  }

  validateSupplier(data : any [][]) : boolean{
    var rows = data.length
    var cols = data[0].length
    this.clearProgress()
    this.progressStatus = 'Validating supplier file'
    this.totalRecords = rows
    var valid = true
    

    //validate row header
    if( data[0][0] != 'SUPPLIER_CODE'     ||
        data[0][1] != 'SUPPLIER_NAME'     ||
        data[0][2] != 'CONTACT_NAME'      ||
        data[0][3] != 'TIN'               ||
        data[0][4] != 'VRN'               ||
        data[0][5] != 'TERMS_OF_PAYMENT'  ||
        data[0][6] != 'POST_ADDRESS'      ||
        data[0][7] != 'POST_CODE'         ||
        data[0][8] != 'PHYSICAL_ADDRESS'  ||
        data[0][9] != 'TELEPHONE'         ||
        data[0][10] != 'MOBILE'           ||
        data[0][11] != 'EMAIL'            ||
        data[0][12] != 'FAX'              ||
        data[0][13] != 'BANK_ACC_NAME'    ||
        data[0][14] != 'BANK_POST_ADDRESS'||
        data[0][15] != 'BANK_POST_CODE'   ||
        data[0][16] != 'BANK_NAME'        ||
        data[0][17] != 'BANK_ACC_NO' )
    {
      valid = false
    }
    for(let i = 1; i < data.length; i++) {
      this.currentRecord = i
      //checks for empty supplier code and name
      if( data[i][0] == ''   ||
          data[i][1] == ''     
        )
      {
        valid = false
      }
    }
    this.clearProgress()
    return valid;
  }
  async uploadSupplier(data : any [][]){
    var rows = data.length
    var cols = data[0].length
    this.clearProgress()
    this.progressStatus = 'Uploading supplier file'
    this.totalRecords = rows
    var supplier : Supplier = new Supplier
    for(let i = 1; i < data.length; i++) {


      this.currentRecord = i

      supplier.supplierCode     = data[i][0]
      supplier.supplierName     = data[i][1]
      supplier.contactName      = data[i][2]
      supplier.tin              = data[i][3]
      supplier.vrn              = data[i][4]
      supplier.termsOfPayment   = data[i][5]
      supplier.postAddress      = data[i][6]
      supplier.postCode         = data[i][7]
      supplier.physicalAddress  = data[i][8]
      supplier.telephone        = data[i][9]
      supplier.mobile           = data[i][10]
      supplier.email            = data[i][11]
      supplier.fax              = data[i][12]
      supplier.bankAccountName  = data[i][13]
      supplier.bankPostAddress  = data[i][14]
      supplier.bankPostCode     = data[i][15]
      supplier.bankAccountName  = data[i][16]
      supplier.bankAccountNo    = data[i][17]
      supplier.bankStatus       = 'ACTIVE'

      if(data[i][0] == undefined){
        alert('End of file reached')
        break
      }
      

      //save a new supplier
      await this.httpClient.post(Data.baseUrl + "/suppliers" , supplier)
      .toPromise()
      .then(
        data => {

        },
        error => {

        }
      )
    }
    alert('Upload complete')
    this.clearProgress()
  }
 
  async updateSupplier(data : any [][]){
    var rows = data.length
    var cols = data[0].length
    this.clearProgress()
    this.progressStatus = 'Updating suppliers'
    this.totalRecords = rows
    var supplier : Supplier = new Supplier
    for(let i = 1; i < data.length; i++) {


      this.currentRecord = i

      supplier.supplierCode     = data[i][0]
      supplier.supplierName     = data[i][1]
      supplier.contactName      = data[i][2]
      supplier.tin              = data[i][3]
      supplier.vrn              = data[i][4]
      supplier.termsOfPayment   = data[i][5]
      supplier.postAddress      = data[i][6]
      supplier.postCode         = data[i][7]
      supplier.physicalAddress  = data[i][8]
      supplier.telephone        = data[i][9]
      supplier.mobile           = data[i][10]
      supplier.email            = data[i][11]
      supplier.fax              = data[i][12]
      supplier.bankAccountName  = data[i][13]
      supplier.bankPostAddress  = data[i][14]
      supplier.bankPostCode     = data[i][15]
      supplier.bankAccountName  = data[i][16]
      supplier.bankAccountNo    = data[i][17]
      supplier.bankStatus       = 'ACTIVE'

      if(data[i][0] == undefined){
        alert('End of file reached')
        break
      }

      await this.httpClient.put(Data.baseUrl+"/suppliers/supplier_code="+supplier.supplierCode, supplier)
      .toPromise()
      .then(
        data => {

        }
      )
      .catch(
        error => {

        }
      )
    }
    alert('Upload complete')
    this.clearProgress()
  }

  uploadItemFile(evt : any){
    var itemData :[][]
    if(this.progress == true){
      alert('Could not process, a mass operation going on')
      return
    }
    const target : DataTransfer = <DataTransfer> (evt.target)
    if(target.files.length !== 1){
      alert("Cannot use multiple files")
      return
    }
    const reader : FileReader = new FileReader()
    reader.onload = (e : any) => {
      const bstr : string = e.target.result
      const wb : XLSX.WorkBook = XLSX.read(bstr, {type : 'binary'})
      const wsname : string = wb.SheetNames[0]
      const ws : XLSX.WorkSheet = wb.Sheets[wsname]
      itemData = (XLSX.utils.sheet_to_json(ws, {header : 1}))



      this.progress = true
      if(this.validateItemMaster(itemData) == true){
        this.progressStatus = 'Uploading.. please wait'
        this.uploadItems(itemData)
      }else{
        alert('Invalid item file')
      }
      this.progress = false


    }
    
    
    reader.readAsBinaryString(target.files[0])

  }

  validateItemMaster(data : any [][]) : boolean{
    var rows = data.length
    var cols = data[0].length
    this.clearProgress()
    this.progressStatus = 'Validating product file'
    this.totalRecords = rows
    var valid = true
    

    //validate row header
    if( data[0][0] != 'ITEM_CODE'               ||
        data[0][1] != 'PRIMARY_BARCODE'         ||
        data[0][2] != 'LONG_DESCRIPTION'       ||
        data[0][3] != 'SHORT_DESCRIPTION'       ||
        data[0][4] != 'PACK_SIZE'               ||
        data[0][5] != 'UNIT_COST_PRICE'         ||
        data[0][6] != 'UNIT_RETAIL_PRICE'       ||
        data[0][7] != 'DISCOUNT'                ||
        data[0][8] != 'VAT'                     ||
        data[0][9] != 'PROFIT_MARGIN'           ||
        data[0][10] != 'STANDARD_UOM'            ||
        data[0][11] != 'INGREDIENTS'            ||
        data[0][12] != 'QUANTITY'               ||
        data[0][13] != 'MAXIMUM_INVENTORY'      ||
        data[0][14] != 'MINIMUM_INVENTORY'      ||
        data[0][15] != 'DEFAULT_RE_ORDER_LEVEL' ||
        data[0][16] != 'RE_ORDER_QUANTITY'      ||
        data[0][17] != 'STATUS'                 ||
        data[0][18] != 'SUPPLIER'               ||  
        data[0][19] != 'DEPARTMENT'             ||
        data[0][20] != 'CLASS'                  ||
        data[0][21] != 'SUB_CLASS'  
        )
    {
      valid = false
    }
    for(let i = 1; i < data.length; i++) {
      this.currentRecord = i
      //checks for empty supplier code and name
      if( data[i][0] == ''   ||
          data[i][2] == ''   ||
          data[i][3] == ''      
        )
      {
        alert(i)
        valid = false
      }
    }
    this.clearProgress()
    return valid;
  }
  k = 0
  async uploadItems(dt : any [][]){
    var rows = dt.length
    var cols = dt[0].length
    this.clearProgress()
    this.progressStatus = 'Uploading items file'
    this.totalRecords = rows

    this.k++
    //var i = this.k


    

    for(let i = 1; i < dt.length; i++) {


      this.currentRecord = i

      var itemData = {
      itemCode     : dt[i][0],
      primaryBarcode     : dt[i][1],
      longDescription      : dt[i][2],
      shortDescription             : dt[i][3],
      packSize              : dt[i][4],
      unitCostPrice              : dt[i][5],
      unitRetailPrice   : dt[i][6],
      discount      : dt[i][7],
      vat         : dt[i][8],
      profitMargin  : dt[i][9],
      standardUom        : dt[i][10],
      ingredients           : dt[i][11],
      quantity            : dt[i][12],
      maximumInventory              : dt[i][13],
      minimumInventory  : dt[i][14],
      defaultReOrderLevel  : dt[i][15],
      reOrderQuantity     : dt[i][16],
      status  : dt[i][17],
      supplier:{supplierName: dt[i][18]},
      department:{departmentName:dt[i][19]},
      clas:{clasName:dt[i][20]},
      subClass:{subClassName:dt[i][21]} 
      }

     
      

      if(dt[i][0] == undefined){
        alert('End of file reached')
        return
      }

      await this.httpClient.post(Data.baseUrl+"/items" , itemData)
      .toPromise()
      .catch(error=>{})



      //save a new supplier
      /*this.httpClient.post(Data.baseUrl + "/items" , itemData)
      .toPromise()
      .then(
        data => {
          if(i < dt.length){
            this.uploadItems(dt)
          }
        },
        error => {
          if(i < dt.length){
            this.uploadItems(dt)
          }
        }
      )*/
      }
    this.clearProgress()
  }

  onFileChange(evt : any){
    if(this.progress == true){
      alert('Could not process, a mass operation going on')
      return
    }
    const target : DataTransfer = <DataTransfer> (evt.target)
    if(target.files.length !== 1){
      alert("Cannot use multiple files")
      return
    }
    const reader : FileReader = new FileReader()
    reader.onload = (e : any) => {
      const bstr : string = e.target.result
      const wb : XLSX.WorkBook = XLSX.read(bstr, {type : 'binary'})
      const wsname : string = wb.SheetNames[0]
      const ws : XLSX.WorkSheet = wb.Sheets[wsname]
      this.data = (XLSX.utils.sheet_to_json(ws, {header : 1}))


      this.progress = true
      if(this.validateData(this.data) == true){
        this.uploadData(this.data)
      }
      this.progress = false


    }
    
    
    reader.readAsBinaryString(target.files[0])

  }

  validateData(data :  [][]) : boolean{
    var valid = true
    for(let j = 0; j < data[0].length; j++){
      //validate the row header
    }
    for(let i = 1; i < data.length; i++) {
      for(let j = 0; j < data[i].length; j++) {
        //validate content
        //alert((data[i][j]))

      }
    }
    return valid;
  }
  uploadData(data : [][]){
    var object : any
    var supplier : Supplier
    for(let i = 1; i < data.length; i++) {
      

    }
  }
}
class Supplier{
  id              : any
  supplierCode    : string
  supplierName    : string
  contactName     : string
  tin             : string
  vrn             : string
  termsOfPayment  : string
  postAddress     : string
  postCode        : string
  physicalAddress : string
  telephone       : string
  mobile          : string
  email           : string
  fax             : string
  bankAccountName : string
  bankPostAddress : string
  bankPostCode    : string
  bankName        : string
  bankAccountNo   : string
  bankStatus      : string
}

