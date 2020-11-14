import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardSaleComponent } from './credit-card-sale.component';

describe('CreditCardSaleComponent', () => {
  let component: CreditCardSaleComponent;
  let fixture: ComponentFixture<CreditCardSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditCardSaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
