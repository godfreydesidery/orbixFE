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


const routes: Routes = [
  { path :'product_master',component : ProductMasterComponent },
  { path :'product_inquiry',component : ProductInquiryComponent },
  { path :'mass_manager',component : MassManagerComponent },
  { path :'corporate_customers',component : CorporateCustomersComponent },
  { path :'company_profile',component : CompanyProfileComponent },
  { path :'suppliers',component : SuppliersComponent },
  { path :'lpo',component : LPOComponent },
  { path :'print-lpo',component : PrintLPOComponent },
  { path :'list-lpo',component : ListLPOComponent },
  { path :'grn',component : GRNComponent },
  { path :'return-by-customer',component : ReturnByCustomerComponent },
  { path :'return-to-vendor',component : ReturnToVendorComponent },
  { path :'receipt',component : ReceiptComponent },
  { path :'customer-credit-note',component : CustomerCreditNoteComponent },
  { path :'supplier-credit-note',component : SupplierCreditNoteComponent },
  { path :'allocation',component : AllocationComponent },
  { path :'quotation',component : QuotationComponent },
  { path :'invoice-book',component : InvoiceBookComponent },
  { path :'sales-ledger',component : SalesLedgerComponent },
  { path :'sales-journal',component : SalesJournalComponent },
  { path :'daily-sales-report',component : DailySalesReportComponent },
  { path :'z-history',component : ZHistoryComponent },
  { path :'cashier-variance',component : CashierVarianceComponent },
  { path :'credit-note-report',component : CreditNoteReportComponent },
  { path :'petty-cash-report',component : PettyCashReportComponent },
  { path :'credit-card-sale',component : CreditCardSaleComponent },
  { path :'gift-voucher-sale',component : GiftVoucherSaleComponent },
  { path :'returned-bottle',component : ReturnedBottleComponent },
  { path :'product-listing-report',component : ProductListingReportComponent },
  { path :'supply-sales-report',component : SupplySalesReportComponent },
  { path :'stock-card-report',component : StockCardReportComponent },
  { path :'supplier-stock-status',component : SupplierStockStatusComponent },
  { path :'fast-moving-item',component : FastMovingItemComponent },
  { path :'slow-moving-item',component : SlowMovingItemComponent },
  { path :'negative-stock-report',component : NegativeStockReportComponent },
  { path :'printed-lpo',component : PrintedLPOComponent },
  { path :'pending-lpo',component : PendingLPOComponent },
  { path :'grn-report',component : GRNReportComponent },
  { path :'price-change-report',component : PriceChangeReportComponent },
  { path :'access-control',component : AccessControlComponent },
  { path :'user-enrolment',component : UserEnrolmentComponent },
  { path :'biometric-enrolment',component : BiometricEnrolmentComponent },
  { path :'persona-enrolment',component : PersonaEnrolmentComponent },
  { path :'till-administration',component : TillAdministrationComponent },
  { path :'till-position',component : TillPositionComponent }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
