import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { interval } from 'rxjs';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.css']
})
export class ProductMasterComponent implements OnInit {

  private apiurl = "http://localhost:8080/test";
  productForm : FormGroup;
  submitted = false;
  success = false;

  constructor(private httpClient: HttpClient , private formBuilder :FormBuilder) {
    this.productForm = this.formBuilder.group({
      primaryBarcode   : [''],
      itemCode         : [''],
      longDescription  : [''],
      shortDescription : [''],
      packSize         : [''],
      supplier         : [''],
      department       : [''],
      _class           : [''],
      subClass         : [''],
      costPrice        : [''],
      retailPrice      : [''],
      profitMargin     : [''],
      standardUom      : [''],
      vat              : [''],
      discount         : ['']
    })
  }

  getItemData(){
    var itemData = {
      primaryBarcode   : this.productForm.get('primaryBarcode').value,
      itemCode         : this.productForm.get('itemCode').value,
      longDescription  : this.productForm.get('longDescription').value,
      shortDescription : this.productForm.get('shortDescription').value,
      packSize         : this.productForm.get('packSize').value,
      supplier         : this.productForm.get('supplier').value,
      department       : this.productForm.get('department').value,
      _class           : this.productForm.get('_class').value,
      subClass         : this.productForm.get('subClass').value,
      unitCostPrice        : this.productForm.get('costPrice').value,
      unitRetailPrice      : this.productForm.get('retailPrice').value,
      profitMargin     : this.productForm.get('profitMargin').value,
      standardUom      : this.productForm.get('standardUom').value,
      vat              : this.productForm.get('vat').value,
      discount         : this.productForm.get('discount').value
    }
    return itemData;
  }

  onSubmit(){
    if(this.productForm.invalid){
      alert('Invalid input')
      return;
    }
    this.success = true;
    this.httpClient.post(this.apiurl,this.getItemData())
    .toPromise()
    .then((data : any )=>console.log(data))
    .catch((err : HttpErrorResponse)=>console.error(err.error));

  }

  ngOnInit(): void {};


































  //control fields from the product form
  newItem          = new FormControl('');
  searchItem       = new FormControl('');
  saveItem         = new FormControl('');
  reset            = new FormControl('');
  deleteItem       = new FormControl('');

  primaryBarcode   = new FormControl('');
  itemCode         = new FormControl('');
  longDescription  = new FormControl('');
  shortDescription = new FormControl('');
  packSize         = new FormControl('');
  supplier         = new FormControl('');
  department       = new FormControl('');
  _class           = new FormControl('');
  subClass         = new FormControl('');
  costPrice        = new FormControl('');
  retailPrice      = new FormControl('');
  profitMargin     = new FormControl('');
  standardUOM      = new FormControl('');
  vat              = new FormControl('');
  discount         = new FormControl('');
  
  
  

  








/*


  productForm = new FormGroup({
    //itemCode: new FormControl(''),
  });

 
  search() {
    alert(this.itemCode.value)
  };
  
  


  saveProductInfo()  {
    var item = {
      "primaryBarcode"    :this.primaryBarcode.value,
      "itemCode"          :this.itemCode.value,
      "longDescription"   :this.longDescription.value,
      "shortDescription"  :this.shortDescription.value,
      "packSize"          :this.packSize.value,
      "supplier"          :this.supplier.value,
      "department"        :this.department.value,
      "_class"            :this._class.value,
      "subClass"          :this.subClass.value,
      "costPrice"         :this.costPrice.value,
      "retailPrice"       :this.retailPrice.value,
      "profitMargin"      :this.profitMargin.value,
      "standardUOM"       :this.standardUOM.value,
      "vat"               :this.vat.value,
      "discount"          :this.discount.value
    }



    return this.httpClient.post<any>(this.apiurl, item);


    //console.log(JSON.stringify(item))
    //return this.httpClient.post(this.apiurl,item);

  }*/
  
}