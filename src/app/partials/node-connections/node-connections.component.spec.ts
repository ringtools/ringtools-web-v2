import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { initialSettingState } from 'src/app/reducers/setting.reducer';
import { VisModule } from 'src/app/vis/vis.module';

import { NodeConnectionsComponent } from './node-connections.component';

describe('NodeConnectionsComponent', () => {
  let component: NodeConnectionsComponent;
  let fixture: ComponentFixture<NodeConnectionsComponent>;
  const initialState = { setting: initialSettingState };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeConnectionsComponent ],
      imports: [ HttpClientTestingModule, VisModule ],
      providers: [
        provideMockStore({ initialState }),
      ]
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
