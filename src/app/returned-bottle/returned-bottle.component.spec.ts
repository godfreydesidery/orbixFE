import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnedBottleComponent } from './returned-bottle.component';

describe('ReturnedBottleComponent', () => {
  let component: ReturnedBottleComponent;
  let fixture: ComponentFixture<ReturnedBottleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnedBottleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnedBottleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
