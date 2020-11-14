import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintedLPOComponent } from './printed-lpo.component';

describe('PrintedLPOComponent', () => {
  let component: PrintedLPOComponent;
  let fixture: ComponentFixture<PrintedLPOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintedLPOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintedLPOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
