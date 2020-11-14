import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnByCustomerComponent } from './return-by-customer.component';

describe('ReturnByCustomerComponent', () => {
  let component: ReturnByCustomerComponent;
  let fixture: ComponentFixture<ReturnByCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnByCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnByCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
