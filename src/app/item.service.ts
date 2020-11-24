import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from'./app.component'
import { Observable } from 'rxjs';

import { HttpClient, HttpErrorResponse, HttpHandler } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { delay, retry } from 'rxjs/operators';
import { Data } from './data';



@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor( private httpClient: HttpClient ) { }

  async getItem (id) {
    /**
     * gets item details with a specified id from datastore
     */
    //this.clear
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

  public async getItemId (barcode , itemCode , description){
    /**
     * gets item id given barcode, itemcode or description
     * on preference basis
     */
    var id = '' 
    if(barcode!='' && barcode!=null){
      
      await this.httpClient.get(Data.baseUrl+"/items/primary_barcode="+barcode)
      .toPromise()
      .then(
        data=>{
          id=data['id']
        }
      )
      .catch(
        error=>{}
      )
    }else if (itemCode!='' && itemCode!=null){
      await this.httpClient.get(Data.baseUrl+"/items/item_code="+itemCode)
      .toPromise()
      .then(
        data=>{
          id=data['id']
        }
      )
      .catch(
        error=>{}
      )
    }else{
      await this.httpClient.get(Data.baseUrl+"/items/long_description="+description)
      .toPromise()
      .then(
        data=>{
          id=data['id']
        }
      )
      .catch(
        error=>{}
      )
    }
    return id
  } 

  public getCostPrice(id){
    var price = 0
    //logic
    return price
  }

  public getRetailPrice(id){
    var price = 0
    //logic
    return price
  }

}
