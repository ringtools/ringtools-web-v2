import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { initialSettingState } from 'src/app/reducers/setting.reducer';

import { RingOnlyComponent } from './ring-only.component';

describe('RingOnlyComponent', () => {
  let component: RingOnlyComponent;
  let fixture: ComponentFixture<RingOnlyComponent>;
  const initialState = { setting: initialSettingState };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RingOnlyComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RingOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
