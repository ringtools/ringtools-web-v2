import { JsonPipe } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { ParticipantTableComponent } from './participant-table.component';

describe('ParticipantTableComponent', () => {
  let component: ParticipantTableComponent;
  let fixture: ComponentFixture<ParticipantTableComponent>;
  const initialState = { loggedIn: false };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantTableComponent ],
      providers: [
        JsonPipe,
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
