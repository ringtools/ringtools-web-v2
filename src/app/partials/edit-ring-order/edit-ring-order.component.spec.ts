import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRingOrderComponent } from './edit-ring-order.component';

describe('EditRingOrderComponent', () => {
  let component: EditRingOrderComponent;
  let fixture: ComponentFixture<EditRingOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRingOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRingOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
