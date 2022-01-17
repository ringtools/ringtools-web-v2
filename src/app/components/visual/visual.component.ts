import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setViewMode } from 'src/app/actions/setting.actions';
import { NodeOwner } from 'src/app/models/node-owner.model';
import { SettingState } from 'src/app/reducers/setting.reducer';
import { selectNodeOwners } from 'src/app/selectors/node-owner.selectors';
import { selectSettings } from 'src/app/selectors/setting.selectors';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'app-visual',
  templateUrl: './visual.component.html',
  styleUrls: ['./visual.component.scss']
})
export class VisualComponent {
  settings$!: Observable<SettingState>;
  nodeOwners$!: Observable<NodeOwner[]>;

  settings!: SettingState;

  constructor(
    private store: Store<fromRoot.State>

  ) { 
    this.settings$ = this.store.select(selectSettings);
    this.nodeOwners$ = this.store.select(selectNodeOwners);

    this.settings$.subscribe((settings: SettingState) => {
      this.settings = settings;
    })
  }

  viewChange($event: string) {
    this.store.dispatch(setViewMode($event));
  }
}
