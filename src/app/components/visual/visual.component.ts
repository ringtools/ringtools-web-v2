import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SettingState } from 'src/app/reducers/setting.reducer';
import { selectSettings } from 'src/app/selectors/setting.selectors';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'app-visual',
  templateUrl: './visual.component.html',
  styleUrls: ['./visual.component.scss']
})
export class VisualComponent {
  settings$!: Observable<SettingState>;
  settings!: SettingState;

  constructor(
    private store: Store<fromRoot.State>

  ) { 
    this.settings$ = this.store.select(selectSettings);

    this.settings$.subscribe((settings: SettingState) => {
      this.settings = settings;
    })
  }

  viewChange($event: any) {

  }
}
