import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassManagerComponent } from './mass-manager.component';

describe('MassManagerComponent', () => {
  let component: MassManagerComponent;
  let fixture: ComponentFixture<MassManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MassManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MassManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
