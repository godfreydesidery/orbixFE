import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiometricEnrolmentComponent } from './biometric-enrolment.component';

describe('BiometricEnrolmentComponent', () => {
  let component: BiometricEnrolmentComponent;
  let fixture: ComponentFixture<BiometricEnrolmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiometricEnrolmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiometricEnrolmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
