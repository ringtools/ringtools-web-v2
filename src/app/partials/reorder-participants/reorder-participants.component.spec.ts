import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReorderParticipantsComponent } from './reorder-participants.component';

describe('ReorderParticipantsComponent', () => {
  let component: ReorderParticipantsComponent;
  let fixture: ComponentFixture<ReorderParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReorderParticipantsComponent ]
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
