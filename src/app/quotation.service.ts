import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from './data';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {

  constructor(private httpClient : HttpClient) { }

  async getQuotation (quotationNo : string) {
    /**
     * gets quotation details with a specified id from datastore
     */
    var quotation = {}
    await this.httpClient.get(Data.baseUrl+"/quotations/quotation_no="+quotationNo)
    .toPromise()
    .then(
      data=>{
        quotation = data
      }
    )
    .catch(
      error=>{
        alert(error['error'])
      }
    )
    return quotation
  }
  public async  getQuotations (){
    
    /**
     * List all quotations
     */
    var quotations = {}
    await this.httpClient.get(Data.baseUrl+"/quotations")
    .toPromise()
    .then(
      data=>{
        quotations = data
      }
    )
    .catch(
      error=>{}
    )
    return quotations
  } 
}
