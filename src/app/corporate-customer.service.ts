import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from './data';

@Injectable({
  providedIn: 'root'
})
export class CorporateCustomerService {

  constructor( private httpClient: HttpClient ) { }

  async getCustomer (id : any) {
    /**
     * gets customer details with a specified id from datastore
     */
    var customer = {}
    await this.httpClient.get(Data.baseUrl+"/corporate_customers/"+id)
    .toPromise()
    .then(
      data=>{
        customer=data
      }
    )
    .catch(
      error=>{
        console.log(error)
        alert('Error code: '+error['status']+",  "+error['message'])
      }
    )
    return customer
  }

  public async getCustomerId (customerNo :string , customerName :string){
    /**
     * Get the customer id for customer with given customer code or name
     * 
     */
    var id : null 
    if(customerNo !=''){
      await this.httpClient.get(Data.baseUrl+"/corporate_customers/customer_no="+customerNo)
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
      await this.httpClient.get(Data.baseUrl+"/corporate_customers/customer_name="+customerName)
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

  public async  getCustomersNames (){
    /**
     * list customers by customer name attribute
     */
    var values: any= new Array()
    var customers: any=[]
    await this.httpClient.get(Data.baseUrl+"/corporate_customers/customer_names")
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
      customers.push(data)
    })
    return customers
  } 


  public async  getCustomers (){
    /**
     * List all customers
     */
    var customers = {}
    await this.httpClient.get(Data.baseUrl+"/corporate_customers")
    .toPromise()
    .then(
      data=>{
        customers = data
      }
    )
    .catch(
      error=>{}
    )
    return customers
  } 
}
