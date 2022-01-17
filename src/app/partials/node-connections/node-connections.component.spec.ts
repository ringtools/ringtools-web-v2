import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeConnectionsComponent } from './node-connections.component';

describe('NodeConnectionsComponent', () => {
  let component: NodeConnectionsComponent;
  let fixture: ComponentFixture<NodeConnectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeConnectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
