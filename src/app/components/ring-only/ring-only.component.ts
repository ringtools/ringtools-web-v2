import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { upsertNodeInfo } from 'src/app/actions/node-info.actions';
import { NodeInfo } from 'src/app/models/node-info.model';
import { NodeOwner } from 'src/app/models/node-owner.model';
import { IRing } from 'src/app/models/ring.model';
import { SettingState } from 'src/app/reducers/setting.reducer';
import { LnDataService } from 'src/app/services/ln-data.service';
import { RingDataService } from 'src/app/services/ring-data.service';
import { stringToBoolean } from 'src/app/utils/utils';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'app-ring-only',
  templateUrl: './ring-only.component.html',
  styleUrls: ['./ring-only.component.scss'],
})
export class RingOnlyComponent {
  ring: IRing = [];
  onFire: boolean = true;
  withArrow: boolean = false;
  isReady = false;

  constructor(
    private route: ActivatedRoute,
    private ringData: RingDataService
  ) {
    const onFire = this.route.snapshot.queryParamMap.get('onFire');
    const withArrow = this.route.snapshot.queryParamMap.get('withArrow');

    if (onFire) {
      this.onFire = stringToBoolean(onFire);
    }

    if (withArrow) {
      this.withArrow = stringToBoolean(withArrow);
    }
    this.ringData.getRing().then((ring) => {
      this.ring = ring;
      this.isReady = true;
    });
  }
}
