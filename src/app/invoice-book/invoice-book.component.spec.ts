import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceBookComponent } from './invoice-book.component';

describe('InvoiceBookComponent', () => {
  let component: InvoiceBookComponent;
  let fixture: ComponentFixture<InvoiceBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
