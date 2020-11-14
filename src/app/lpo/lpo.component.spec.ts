import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LPOComponent } from './lpo.component';

describe('LPOComponent', () => {
  let component: LPOComponent;
  let fixture: ComponentFixture<LPOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LPOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LPOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
