import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from './data';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor( private httpClient: HttpClient ) { }

  async getSupplier (id) {
    /**
     * gets supplier details with a specified id from datastore
     */
    var supplier = {}
    await this.httpClient.get(Data.baseUrl+"/suppliers/"+id)
    .toPromise()
    .then(
      data=>{
        supplier=data
        console.log(supplier)
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
    return supplier
  }

  public async getSupplierId (supplierCode , supplierName ){
    /**
     * gets supplier id given code or name
     * on preference basis
     */
    var id:number = 0 
    if(supplierCode!='' && supplierCode!=null){
      
      await this.httpClient.get(Data.baseUrl+"/suppliers/supplier_code="+supplierCode)
      .toPromise()
      .then(
        data=>{
          id=data['id']
        }
      )
      .catch(
        error=>{}
      )
    }else if (supplierName!='' && supplierName!=null){
      await this.httpClient.get(Data.baseUrl+"/suppliers/supplier_name="+supplierName)
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
      await this.httpClient.get(Data.baseUrl+"/suppliers/supplier_name="+supplierName)
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
    alert(id)
    return id
  } 

  

}
