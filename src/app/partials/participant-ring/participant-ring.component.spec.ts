import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantRingComponent } from './participant-ring.component';

describe('ParticipantRingComponent', () => {
  let component: ParticipantRingComponent;
  let fixture: ComponentFixture<ParticipantRingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantRingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantRingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
