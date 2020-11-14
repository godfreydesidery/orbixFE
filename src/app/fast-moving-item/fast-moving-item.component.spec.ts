import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastMovingItemComponent } from './fast-moving-item.component';

describe('FastMovingItemComponent', () => {
  let component: FastMovingItemComponent;
  let fixture: ComponentFixture<FastMovingItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FastMovingItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FastMovingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
