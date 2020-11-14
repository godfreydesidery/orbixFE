import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierVarianceComponent } from './cashier-variance.component';

describe('CashierVarianceComponent', () => {
  let component: CashierVarianceComponent;
  let fixture: ComponentFixture<CashierVarianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashierVarianceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashierVarianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
