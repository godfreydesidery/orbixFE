import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiftVoucherSaleComponent } from './gift-voucher-sale.component';

describe('GiftVoucherSaleComponent', () => {
  let component: GiftVoucherSaleComponent;
  let fixture: ComponentFixture<GiftVoucherSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiftVoucherSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiftVoucherSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
