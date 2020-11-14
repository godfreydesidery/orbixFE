import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceChangeReportComponent } from './price-change-report.component';

describe('PriceChangeReportComponent', () => {
  let component: PriceChangeReportComponent;
  let fixture: ComponentFixture<PriceChangeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PriceChangeReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PriceChangeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
