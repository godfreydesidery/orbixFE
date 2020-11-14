import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingLPOComponent } from './pending-lpo.component';

describe('PendingLPOComponent', () => {
  let component: PendingLPOComponent;
  let fixture: ComponentFixture<PendingLPOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingLPOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingLPOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
