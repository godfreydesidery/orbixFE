import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from './data';

@Injectable({
  providedIn: 'root'
})
export class SalesInvoiceService {

  constructor( private httpClient: HttpClient ) { }

  async getInvoice (invoiceNo : any) {
    /**
     * gets 
     */
    var invoice = {}
    await this.httpClient.get(Data.baseUrl+"/sales_invoices/invoice_no="+invoiceNo)
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
