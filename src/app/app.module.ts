import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Angulartics2Module } from 'angulartics2';
import { Angulartics2GoogleAnalytics } from 'angulartics2/ga';
import { NgxSpinnerModule } from "ngx-spinner";




import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { StatusbarComponent } from './statusbar/statusbar.component';
import { FooterComponent } from './footer/footer.component';
import { ProductMasterComponent } from './product-master/product-master.component';
import { ProductInquiryComponent } from './product-inquiry/product-inquiry.component';
import { MassManagerComponent } from './mass-manager/mass-manager.component';
import { CorporateCustomersComponent } from './corporate-customers/corporate-customers.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { OrderComponent } from './order/order.component';
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
import { UserLoginComponent } from './user-login/user-login.component';
import { Ng2CompleterModule } from 'ng2-completer';
import { LoginComponent } from './login/login.component';
import { DepartmentComponent } from './department/department.component';
import { ClassComponent } from './class/class.component';
import { SubClassComponent } from './sub-class/sub-class.component';
import { SalesInvoiceComponent } from './sales-invoice/sales-invoice.component';
import { SalesReceiptComponent } from './sales-receipt/sales-receipt.component';
import { EndOfDayComponent } from './end-of-day/end-of-day.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    HeaderComponent,
    SidebarComponent,
    StatusbarComponent,
    FooterComponent,
    ProductMasterComponent,
    ProductInquiryComponent,
    MassManagerComponent,
    CorporateCustomersComponent,
    CompanyProfileComponent,
    SuppliersComponent,
    OrderComponent,
    LPOComponent,
    PrintLPOComponent,
    ListLPOComponent,
    GRNComponent,
    ReturnByCustomerComponent,
    ReturnToVendorComponent,
    ReceiptComponent,
    CustomerCreditNoteComponent,
    SupplierCreditNoteComponent,
    AllocationComponent,
    QuotationComponent,
    InvoiceBookComponent,
    SalesLedgerComponent,
    SalesJournalComponent,
    DailySalesReportComponent,
    ZHistoryComponent,
    CashierVarianceComponent,
    CreditNoteReportComponent,
    PettyCashReportComponent,
    CreditCardSaleComponent,
    GiftVoucherSaleComponent,
    ReturnedBottleComponent,
    ProductListingReportComponent,
    SupplySalesReportComponent,
    StockCardReportComponent,
    SupplierStockStatusComponent,
    FastMovingItemComponent,
    SlowMovingItemComponent,
    NegativeStockReportComponent,
    PrintedLPOComponent,
    PendingLPOComponent,
    GRNReportComponent,
    PriceChangeReportComponent,
    AccessControlComponent,
    UserEnrolmentComponent,
    BiometricEnrolmentComponent,
    PersonaEnrolmentComponent,
    TillAdministrationComponent,
    TillPositionComponent,
    UserLoginComponent,
    LoginComponent,
    DepartmentComponent,
    ClassComponent,
    SubClassComponent,
    SalesInvoiceComponent,
    SalesReceiptComponent,
    EndOfDayComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    Ng2CompleterModule,
    Angulartics2Module.forRoot(),
    NgxSpinnerModule 
  ],
  providers: [
    //{
      //provide: HTTP_INTERCEPTORS,
      //useClass: HttpErrorInterceptor,
      //multi: true
    //}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
