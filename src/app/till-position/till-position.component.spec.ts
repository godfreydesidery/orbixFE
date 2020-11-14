import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TillPositionComponent } from './till-position.component';

describe('TillPositionComponent', () => {
  let component: TillPositionComponent;
  let fixture: ComponentFixture<TillPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TillPositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TillPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
