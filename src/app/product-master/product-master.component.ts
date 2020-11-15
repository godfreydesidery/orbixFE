import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { interval } from 'rxjs';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.css']
})
export class ProductMasterComponent implements OnInit {

  constructor(private http: HttpClient) { }

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
  
  
  ngOnInit(): void {
  };

  private finaldata = [];
  private apiurl = "127.0.0.1/items";

  productForm = new FormGroup({
    //itemCode: new FormControl(''),
  });

 
  search() {
    alert(this.itemCode.value)
  };
  
  


  saveProductInfo()  {
    var product = {
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


    console.log(JSON.stringify(product))
    return this.http.post(this.apiurl,product);

  }
  
}