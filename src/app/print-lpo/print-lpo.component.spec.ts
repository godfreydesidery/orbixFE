import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintLPOComponent } from './print-lpo.component';

describe('PrintLPOComponent', () => {
  let component: PrintLPOComponent;
  let fixture: ComponentFixture<PrintLPOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintLPOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintLPOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
