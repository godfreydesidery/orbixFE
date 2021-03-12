import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerCreditNoteService {

  id               : any
  creditNoteNo     : string
  creditNoteAmount : number
  creditNoteDate   : Date
  expiryDate       : Date
  creditNoteStatus : string

  constructor(private httpClient : HttpClient) {
    this.id               = null
    this.creditNoteNo     = ''
    this.creditNoteAmount = null
    this.creditNoteDate   = null
    this.expiryDate       = null
    this.creditNoteStatus =''
  
  }

  generateCreditNoteNo(){
    /**Generate a unique Invoice No */

		var anysize = 5;//the size of string 
		var charset1 = "123456789"; //from where to create
		var charset2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

		var result1="";
		var result2=""
		for( var i=0; i < anysize; i++ )
			result1 += charset1[Math.floor(Math.random() * charset1.length)];
		for( var i=0; i < 1; i++ )
			result2 += charset2[Math.floor(Math.random() * charset2.length)];
		return "CCN-"+result1+result2
  }

  createCreditNote(){

  }

  saveCreditNote(){

  }
  
  clearCreditNote(){
    this.id               = null
    this.creditNoteNo     = ''
    this.creditNoteAmount = null
    this.creditNoteDate   = null
    this.expiryDate       = null
    this.creditNoteStatus =''
  }
}
