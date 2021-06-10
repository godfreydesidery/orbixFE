import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductMasterComponent } from './product-master/product-master.component';
import { ProductInquiryComponent } from './product-inquiry/product-inquiry.component';
import { MassManagerComponent } from './mass-manager/mass-manager.component';
import { CorporateCustomersComponent } from './corporate-customers/corporate-customers.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { LPOComponent } from './lpo/lpo.component';
import { PrintLPOComponent } from './print-lpo/print-lpo.component';
import { ListLPOComponent } from './list-lpo/list-lpo.component';
import { GRNComponent } from './grn/grn.component';
import { ReturnByCustomerComponent } from './return-by-customer/return-by-customer.component';
import { ReturnToVendorComponent } from './return-to-vendor/return-to-vendor.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { CustomerCreditNoteComponent } from './customer-credit-note/customer-credit-note.component';
import { SupplierCreditNoteComponent } from './supplier-credit-note/supplier-credit-note.component';
import { AllocationComponent } from './allocation/allocation.component';
import { QuotationComponent } from './quotation/quotation.component';
import { InvoiceBookComponent } from './invoice-book/invoice-book.component';
import { SalesLedgerComponent } from './sales-ledger/sales-ledger.component';
import { SalesJournalComponent } from './sales-journal/sales-journal.component';
import { DailySalesReportComponent } from './daily-sales-report/daily-sales-report.component';
import { ZHistoryComponent } from './z-history/z-history.component';
import { CashierVarianceComponent } from './cashier-variance/cashier-variance.component';
import { CreditNoteReportComponent } from './credit-note-report/credit-note-report.component';
import { PettyCashReportComponent } from './petty-cash-report/petty-cash-report.component';
import { CreditCardSaleComponent } from './credit-card-sale/credit-card-sale.component';
import { GiftVoucherSaleComponent } from './gift-voucher-sale/gift-voucher-sale.component';
import { ReturnedBottleComponent } from './returned-bottle/returned-bottle.component';
import { ProductListingReportComponent } from './product-listing-report/product-listing-report.component';
import { SupplySalesReportComponent } from './supply-sales-report/supply-sales-report.component';
import { StockCardReportComponent } from './stock-card-report/stock-card-report.component';
import { SupplierStockStatusComponent } from './supplier-stock-status/supplier-stock-status.component';
import { FastMovingItemComponent } from './fast-moving-item/fast-moving-item.component';
import { SlowMovingItemComponent } from './slow-moving-item/slow-moving-item.component';
import { NegativeStockReportComponent } from './negative-stock-report/negative-stock-report.component';
import { PrintedLPOComponent } from './printed-lpo/printed-lpo.component';
import { PendingLPOComponent } from './pending-lpo/pending-lpo.component';
import { GRNReportComponent } from './grn-report/grn-report.component';
import { PriceChangeReportComponent } from './price-change-report/price-change-report.component';
import { AccessControlComponent } from './access-control/access-control.component';
import { UserEnrolmentComponent } from './user-enrolment/user-enrolment.component';
import { BiometricEnrolmentComponent } from './biometric-enrolment/biometric-enrolment.component';
import { PersonaEnrolmentComponent } from './persona-enrolment/persona-enrolment.component';
import { TillAdministrationComponent } from './till-administration/till-administration.component';
import { TillPositionComponent } from './till-position/till-position.component';
import { SalesInvoiceComponent } from './sales-invoice/sales-invoice.component';
import { SalesReceiptComponent } from './sales-receipt/sales-receipt.component';

import { DepartmentComponent } from './department/department.component';
import { ClassComponent } from './class/class.component';
import { SubClassComponent } from './sub-class/sub-class.component';
import { EndOfDayComponent } from './end-of-day/end-of-day.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { AuthGuardService } from './quards/auth-guard.service';
import { SalesReturnComponent } from './sales-return/sales-return.component';


const routes: Routes = [
  { path :'product_master',component : ProductMasterComponent, canActivate: [AuthGuardService]},
  { path :'product_inquiry',component : ProductInquiryComponent, canActivate: [AuthGuardService] },
  { path :'mass_manager',component : MassManagerComponent, canActivate: [AuthGuardService] },
  { path :'corporate_customers',component : CorporateCustomersComponent, canActivate: [AuthGuardService] },
  { path :'company_profile',component : CompanyProfileComponent, canActivate: [AuthGuardService] },
  { path :'suppliers',component : SuppliersComponent, canActivate: [AuthGuardService] },
  { path :'lpo',component : LPOComponent, canActivate: [AuthGuardService] },
  { path :'print-lpo',component : PrintLPOComponent, canActivate: [AuthGuardService] },
  { path :'list-lpo',component : ListLPOComponent, canActivate: [AuthGuardService] },
  { path :'grn',component : GRNComponent, canActivate: [AuthGuardService] },
  { path :'return-by-customer',component : ReturnByCustomerComponent, canActivate: [AuthGuardService] },
  { path :'return-to-vendor',component : ReturnToVendorComponent, canActivate: [AuthGuardService] },
  { path :'receipt',component : ReceiptComponent, canActivate: [AuthGuardService] },
  { path :'customer-credit-note',component : CustomerCreditNoteComponent, canActivate: [AuthGuardService] },
  { path :'supplier-credit-note',component : SupplierCreditNoteComponent, canActivate: [AuthGuardService] },
  { path :'allocation',component : AllocationComponent, canActivate: [AuthGuardService] },
  { path :'quotation',component : QuotationComponent, canActivate: [AuthGuardService] },
  { path :'invoice-book',component : InvoiceBookComponent, canActivate: [AuthGuardService] },
  { path :'sales-ledger',component : SalesLedgerComponent, canActivate: [AuthGuardService] },
  { path :'sales-journal',component : SalesJournalComponent, canActivate: [AuthGuardService] },
  { path :'daily-sales-report',component : DailySalesReportComponent, canActivate: [AuthGuardService] },
  { path :'z-history',component : ZHistoryComponent, canActivate: [AuthGuardService] },
  { path :'cashier-variance',component : CashierVarianceComponent, canActivate: [AuthGuardService] },
  { path :'credit-note-report',component : CreditNoteReportComponent, canActivate: [AuthGuardService] },
  { path :'petty-cash-report',component : PettyCashReportComponent, canActivate: [AuthGuardService] },
  { path :'credit-card-sale',component : CreditCardSaleComponent, canActivate: [AuthGuardService] },
  { path :'gift-voucher-sale',component : GiftVoucherSaleComponent, canActivate: [AuthGuardService] },
  { path :'returned-bottle',component : ReturnedBottleComponent, canActivate: [AuthGuardService] },
  { path :'product-listing-report',component : ProductListingReportComponent, canActivate: [AuthGuardService] },
  { path :'supply-sales-report',component : SupplySalesReportComponent, canActivate: [AuthGuardService] },
  { path :'stock-card-report',component : StockCardReportComponent, canActivate: [AuthGuardService] },
  { path :'supplier-stock-status',component : SupplierStockStatusComponent, canActivate: [AuthGuardService] },
  { path :'fast-moving-item',component : FastMovingItemComponent, canActivate: [AuthGuardService] },
  { path :'slow-moving-item',component : SlowMovingItemComponent, canActivate: [AuthGuardService] },
  { path :'negative-stock-report',component : NegativeStockReportComponent, canActivate: [AuthGuardService] },
  { path :'printed-lpo',component : PrintedLPOComponent, canActivate: [AuthGuardService] },
  { path :'pending-lpo',component : PendingLPOComponent, canActivate: [AuthGuardService] },
  { path :'grn-report',component : GRNReportComponent, canActivate: [AuthGuardService] },
  { path :'price-change-report',component : PriceChangeReportComponent, canActivate: [AuthGuardService] },
  { path :'access-control',component : AccessControlComponent, canActivate: [AuthGuardService] },
  { path :'user-enrolment',component : UserEnrolmentComponent, canActivate: [AuthGuardService] },
  { path :'biometric-enrolment',component : BiometricEnrolmentComponent, canActivate: [AuthGuardService] },
  { path :'persona-enrolment',component : PersonaEnrolmentComponent, canActivate: [AuthGuardService] },
  { path :'till-administration',component : TillAdministrationComponent, canActivate: [AuthGuardService] },
  { path :'till-position',component : TillPositionComponent, canActivate: [AuthGuardService] },
  { path :'department',component : DepartmentComponent, canActivate: [AuthGuardService] },
  { path :'class',component : ClassComponent, canActivate: [AuthGuardService] },
  { path :'sub-class',component : SubClassComponent, canActivate: [AuthGuardService] },
  { path :'sales-invoice',component : SalesInvoiceComponent, canActivate: [AuthGuardService] },
  { path :'sales-receipt',component : SalesReceiptComponent, canActivate: [AuthGuardService] },
  { path :'end-of-day',component : EndOfDayComponent, canActivate: [AuthGuardService] },
  { path :'sales-return',component : SalesReturnComponent, canActivate: [AuthGuardService] },
  { path :'',component : HomeComponent}

];



@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
