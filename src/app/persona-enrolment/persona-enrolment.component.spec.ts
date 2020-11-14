import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaEnrolmentComponent } from './persona-enrolment.component';

describe('PersonaEnrolmentComponent', () => {
  let component: PersonaEnrolmentComponent;
  let fixture: ComponentFixture<PersonaEnrolmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonaEnrolmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaEnrolmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
