import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlowMovingItemComponent } from './slow-moving-item.component';

describe('SlowMovingItemComponent', () => {
  let component: SlowMovingItemComponent;
  let fixture: ComponentFixture<SlowMovingItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlowMovingItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlowMovingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
