import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from './data';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor( private httpClient: HttpClient ) { }

  async getSupplier (id : any) {
    /**
     * gets supplier details with a specified id from datastore
     */
    var supplier = {}
    await this.httpClient.get(Data.baseUrl+"/suppliers/"+id)
    .toPromise()
    .then(
      data=>{
        supplier=data
      }
    )
    .catch(
      error=>{
        console.log(error)
        alert('Error code: '+error['status']+",  "+error['message'])
      }
    )
    return supplier
  }

  public async getSupplierId (supplierCode :string , supplierName :string){
    /**
     * Get the supplier id for supplier with given supplier code or name
     * 
     */
    var id : null 
    if(supplierCode !=''){
      await this.httpClient.get(Data.baseUrl+"/suppliers/supplier_code="+supplierCode)
      .toPromise()
      .then(
        data=>{
          id=data['id']
        }
      )
      .catch(
        error=>{
          id = null
        }
      )
    }else {
      await this.httpClient.get(Data.baseUrl+"/suppliers/supplier_name="+supplierName)
      .toPromise()
      .then(
        data=>{
          id=data['id']
        }
      )
      .catch(
        error=>{
          id = null
        }
      )
    }
    return id
  } 

  public async  getSuppliersNames (){
    /**
     * list suppliers by supplier name attribute
     */
    var values: any= new Array()
    var suppliers: any=[]
    await this.httpClient.get(Data.baseUrl+"/suppliers/supplier_names")
    .toPromise()
    .then(
      data=>{
        values = data
      }
    )
    .catch(
      error=>{}
    )
    Object.values(values).map((data)=>{
      suppliers.push(data)
    })
    return suppliers
  } 


  public async  getSuppliers (){
    /**
     * List all suppliers
     */
    var suppliers = {}
    await this.httpClient.get(Data.baseUrl+"/suppliers")
    .toPromise()
    .then(
      data=>{
        suppliers = data
      }
    )
    .catch(
      error=>{}
    )
    return suppliers
  } 
}
