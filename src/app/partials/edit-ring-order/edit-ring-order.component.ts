import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DragulaService } from 'ng2-dragula';
import { Observable, Subscription } from 'rxjs';
import { NodeOwner } from 'src/app/models/node-owner.model';
import { RingSetting } from 'src/app/models/ring-setting.model';
import { SettingState } from 'src/app/reducers/setting.reducer';
import { selectNodeOwners } from 'src/app/selectors/node-owner.selectors';
import { selectSettings } from 'src/app/selectors/setting.selectors';
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

  subs = new Subscription();

  constructor(
    private store: Store<fromRoot.State>,
    private dragulaService: DragulaService
  ) {
    this.nodeOwners$ = this.store.select(selectNodeOwners);
    this.settings$ = this.store.select(selectSettings)

    this.nodeOwners$.subscribe((data) => {
      this.nodeOwners = data;
    })
  }

  getCbUsername(nodeOwner: NodeOwner) {
    if (nodeOwner.username == 'None' || nodeOwner.username == 'undefined') {
      return nodeOwner.first_name;
    }
    return `${nodeOwner.first_name} (@${nodeOwner.username})`;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.dragulaService.destroy('PARTICIPANTS');
  }
}
