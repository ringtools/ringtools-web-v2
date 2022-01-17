import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { NodeOwner } from 'src/app/models/node-owner.model';
import { IRing } from 'src/app/models/ring.model';
import { NodeOwnersState } from 'src/app/reducers/node-owner.reducer';
import { SettingState } from 'src/app/reducers/setting.reducer';
import { selectSettings } from 'src/app/selectors/setting.selectors';
import { colorScale } from 'src/app/utils/utils';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'app-participant-table',
  templateUrl: './participant-table.component.html',
  styleUrls: ['./participant-table.component.scss']
})
export class ParticipantTableComponent {
  _participants = new BehaviorSubject<IRing>([]);
  settings!: SettingState;

  @Input()
  set participants(value:any) {
    this._participants.next(value);
  };

  get participants() {
    return this._participants.getValue();
  }


  constructor(
    private store: Store<fromRoot.State>,
  ) { 
    this.store.select(selectSettings).subscribe((settings: SettingState) => {
      this.settings = settings;
    });
  }

  getColor(i: any) {
    return colorScale(i);;
  }

  getUsername(item: NodeOwner) {
    return item.pub_key;
  }
}
