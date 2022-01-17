import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { initialSettingState } from 'src/app/reducers/setting.reducer';

import { OverviewComponent } from './overview.component';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;
  const initialState = { setting: initialSettingState };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();

    let store: MockStore;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
