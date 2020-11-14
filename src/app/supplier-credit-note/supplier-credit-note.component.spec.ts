import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierCreditNoteComponent } from './supplier-credit-note.component';

describe('SupplierCreditNoteComponent', () => {
  let component: SupplierCreditNoteComponent;
  let fixture: ComponentFixture<SupplierCreditNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierCreditNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierCreditNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
