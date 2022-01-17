import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { DragulaModule, DragulaService } from 'ng2-dragula';

import { EditRingOrderComponent } from './edit-ring-order.component';

describe('EditRingOrderComponent', () => {
  let component: EditRingOrderComponent;
  let fixture: ComponentFixture<EditRingOrderComponent>;
  const initialState = { loggedIn: false };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRingOrderComponent ],
      imports: [ DragulaModule, HttpClientTestingModule ],
      providers: [
        provideMockStore({ initialState }),
        DragulaService
      ]
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
