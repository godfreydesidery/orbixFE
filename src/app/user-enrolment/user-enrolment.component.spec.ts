import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEnrolmentComponent } from './user-enrolment.component';

describe('UserEnrolmentComponent', () => {
  let component: UserEnrolmentComponent;
  let fixture: ComponentFixture<UserEnrolmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEnrolmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEnrolmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
