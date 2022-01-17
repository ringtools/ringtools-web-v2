import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantTableComponent } from './participant-table.component';

describe('ParticipantTableComponent', () => {
  let component: ParticipantTableComponent;
  let fixture: ComponentFixture<ParticipantTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantTableComponent ]
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
