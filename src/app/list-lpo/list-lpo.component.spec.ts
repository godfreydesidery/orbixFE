import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLPOComponent } from './list-lpo.component';

describe('ListLPOComponent', () => {
  let component: ListLPOComponent;
  let fixture: ComponentFixture<ListLPOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListLPOComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLPOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
