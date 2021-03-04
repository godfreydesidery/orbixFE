import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-receipt',
  templateUrl: './sales-receipt.component.html',
  styleUrls: ['./sales-receipt.component.css']
})
export class SalesReceiptComponent implements OnInit {
  @ViewChild('chequePayment', {static:true}) chequePayment: ElementRef;

  chequeVisible : boolean = false
  cashVisible   : boolean = false
  otherVisible  : boolean = false


  constructor() { }

  ngOnInit(): void {
  }
  showChequePayment(){
    this.chequeVisible = true
    this.cashVisible   = false
    this.otherVisible  = false
  }
  showCashPayment(){
    this.chequeVisible = false
    this.cashVisible   = true
    this.otherVisible  = false
  }
  showOtherPayment(){
    this.chequeVisible = false
    this.cashVisible   = false
    this.otherVisible  = true
  }

}
