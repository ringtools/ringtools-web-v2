import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { initialSettingState } from 'src/app/reducers/setting.reducer';

import { ReorderParticipantsComponent } from './reorder-participants.component';

describe('ReorderParticipantsComponent', () => {
  let component: ReorderParticipantsComponent;
  let fixture: ComponentFixture<ReorderParticipantsComponent>;
  const initialState = {
    settings: initialSettingState
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReorderParticipantsComponent ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReorderParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
