import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from './data';

@Injectable({
  providedIn: 'root'
})
export class CustomerInvoiceService {

  constructor( private httpClient: HttpClient ) { }

  async getInvoice (invoiceNo : any) {
    /**
     * gets 
     */
    var invoice = {}
    await this.httpClient.get(Data.baseUrl+"/customer_invoices/invoice_no="+invoiceNo)
    .toPromise()
    .then(
      data=>{
        invoice=data
      }
    )
    .catch(
      error=>{
        alert(error['error'])
      }
    )
    return invoice
  }

}
