import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GRNReportComponent } from './grn-report.component';

describe('GRNReportComponent', () => {
  let component: GRNReportComponent;
  let fixture: ComponentFixture<GRNReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GRNReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GRNReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
