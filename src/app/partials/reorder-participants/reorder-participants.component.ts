import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadNodeOwners } from 'src/app/actions/node-owner.actions';
import { NodeOwner } from 'src/app/models/node-owner.model';
import { RingSetting } from 'src/app/models/ring-setting.model';
import { SettingState } from 'src/app/reducers/setting.reducer';
import { selectNodeOwners } from 'src/app/selectors/node-owner.selectors';
import { selectSettings } from 'src/app/selectors/setting.selectors';
import { NotificationService } from 'src/app/services/notification.service';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'app-reorder-participants',
  templateUrl: './reorder-participants.component.html',
  styleUrls: ['./reorder-participants.component.scss']
})
export class ReorderParticipantsComponent{
  nodeOwners$: Observable<NodeOwner[]>;
  nodeOwners: NodeOwner[] = [];
  ringSettings$!: Observable<RingSetting[]>;
  settings$: Observable<SettingState>;
  selectedIgniter: any;


  constructor(
    private store: Store<fromRoot.State>,
    private notificiation: NotificationService,
  ) {
    this.nodeOwners$ = this.store.select(selectNodeOwners);
    this.settings$ = this.store.select(selectSettings)

    this.nodeOwners$.subscribe((data) => {
      this.nodeOwners = data;
    })
  }

  reorderIgniter() {
    let idx = this.nodeOwners.indexOf(this.selectedIgniter);
    if (idx == -1) {
      this.notificiation.show('No igniter selected', { classname: 'bg-danger' });
      return;
    }

    let partsUntilIgniter = this.nodeOwners.slice(0, (idx + 1));
    let partsFromIgniter = this.nodeOwners.slice((idx+1));
    let newOrder = partsFromIgniter.concat(partsUntilIgniter);
    try {
      this.store.dispatch(loadNodeOwners({ nodeOwners: newOrder }))
//      this.ringData.saveRingSettings(this.nodeOwners);
      this.notificiation.show('Node reorder persisted', { classname: 'bg-success' });
    } catch (e) {
      this.notificiation.show('Error reordering', { classname: 'bg-danger' });
    }
  }

}
