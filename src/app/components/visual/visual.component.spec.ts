import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { initialSettingState } from 'src/app/reducers/setting.reducer';

import { VisualComponent } from './visual.component';

describe('VisualComponent', () => {
  let component: VisualComponent;
  let fixture: ComponentFixture<VisualComponent>;
  const initialState = { 
    setting: initialSettingState
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
