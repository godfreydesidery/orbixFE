import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SupplierService } from '../supplier.service';

@Component({
  selector: 'app-invoice-book',
  templateUrl: './invoice-book.component.html',
  styleUrls: ['./invoice-book.component.css']
})
export class InvoiceBookComponent implements OnInit {
  id              : any
  invoiceNo       : string
  invoiceDate     : Date
  bookingDate     : Date
  invoiceTotal    : number
  amountPaid      : number
  invoiceComments : string 

  supplierCode : string
  supplierName : string
  supplierNames : string[] = []

  constructor(private httpClient : HttpClient) { }

  ngOnInit(): void {
    /**Load all supplier names */
		((new SupplierService(this.httpClient)).getSuppliersNames())
		.then(
		res=>{
        Object.values(res).map((supplierName:string)=>{
        this.supplierNames.push(supplierName)
			})
		}
		);
  }

  test(){
    alert("pay?")
  }
  newInvoice(){
    this.clear()
  }
  saveInvoice(){
    if(this.id == null){

    }
  }
  deleteInvoice(){

  }
  payInvoice(){

  }
  clear(){
    this.id              = null
    this.invoiceNo       = ''
    this.invoiceDate     = null
    this.bookingDate     = null
    this.invoiceTotal    = null
    this.amountPaid      = null
    this.invoiceComments = ''

    this.supplierCode = ''
    this.supplierName = ''
  }
  searchBySupplierName(){
		this.supplierCode = ''
		this.searchSupplier()
	}
	async searchSupplier(){
		/**Search a supplier */
		var found : boolean = false
		var supplierId = await (new SupplierService(this.httpClient)).getSupplierId(this.supplierCode, this.supplierName)
		var supplier = await (new SupplierService(this.httpClient)).getSupplier(supplierId)
		this.supplierCode = supplier['supplierCode']
		this.supplierName = supplier['supplierName']
		if(supplier != '' && supplierId != null){
			found = true
		}
		return found
	}

}
export class Invoice{
  id              : any
  invoiceNo       : string
  invoiceDate     : Date
  bookingDate     : Date
  invoiceTotal    : number
  amountPaid      : number
  invoiceComments : string 
}
