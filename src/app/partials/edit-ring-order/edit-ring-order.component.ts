import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DragulaService } from 'ng2-dragula';
import { Observable, Subscription } from 'rxjs';
import { loadNodeOwners } from 'src/app/actions/node-owner.actions';
import { NodeOwner } from 'src/app/models/node-owner.model';
import { RingSetting } from 'src/app/models/ring-setting.model';
import { SettingState } from 'src/app/reducers/setting.reducer';
import { selectNodeOwners } from 'src/app/selectors/node-owner.selectors';
import { selectSettings } from 'src/app/selectors/setting.selectors';
import { NotificationService } from 'src/app/services/notification.service';
import { RingDataService } from 'src/app/services/ring-data.service';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'app-edit-ring-order',
  templateUrl: './edit-ring-order.component.html',
  styleUrls: ['./edit-ring-order.component.scss'],
})
export class EditRingOrderComponent implements OnDestroy {
  nodeOwners$: Observable<NodeOwner[]>;
  nodeOwners: NodeOwner[] = [];
  ringSettings$!: Observable<RingSetting[]>;
  settings$: Observable<SettingState>;
  isDirty = false;

  subs = new Subscription();

  constructor(
    private store: Store<fromRoot.State>,
    private dragulaService: DragulaService,
    private notification: NotificationService,
    private ringData: RingDataService
  ) {
    this.nodeOwners$ = this.store.select(selectNodeOwners);
    this.settings$ = this.store.select(selectSettings)

    this.nodeOwners$.subscribe((data) => {
      this.nodeOwners = data;
    })

    dragulaService.createGroup("PARTICIPANTS", {
      removeOnSpill: true
    });

    const sub = this.ringData.currentAction.subscribe(action => {
      if (action == 'persistOrder') {
        this.persistOrder();
        this.isDirty = false;
        this.ringData.doAction('');
      }
    })

    this.subs.add(sub);
  }

  getCbUsername(nodeOwner: NodeOwner) {
    if (nodeOwner.username == 'None' || nodeOwner.username == 'undefined') {
      return nodeOwner.first_name;
    }
    return `${nodeOwner.first_name} (@${nodeOwner.username})`;
  }

  persistOrder() {
    try {
      this.store.dispatch(loadNodeOwners({ nodeOwners: this.nodeOwners }))
      this.notification.show('Node order persisted', { classname: 'bg-success' });
    } catch (e) {
      this.notification.show('Error persisting order', { classname: 'bg-danger' });
    }
  }

  onModelChange($event: NodeOwner[]) {
    this.nodeOwners = $event;
    this.isDirty = true;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.dragulaService.destroy('PARTICIPANTS');
  }
}
