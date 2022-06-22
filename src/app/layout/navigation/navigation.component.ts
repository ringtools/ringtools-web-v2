import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { select, Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { SettingState } from 'src/app/reducers/setting.reducer';
import { selectSettings } from 'src/app/selectors/setting.selectors';
import { selectRingSettings } from 'src/app/selectors/ring-setting.selectors';
import { RingSettingsState } from 'src/app/reducers/ring-setting.reducer';
import { RingSetting } from 'src/app/models/ring-setting.model';
import { loadNodeOwners } from 'src/app/actions/node-owner.actions';
import { loadRingSetting } from 'src/app/actions/setting.actions';
import { TranslateService } from '@ngx-translate/core';
import { LnDataService } from 'src/app/services/ln-data.service';
import { GetInfoResponse } from '@lightninglabs/lnc-web/dist/types/proto/lnrpc';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  public isMenuCollapsed = false;
  testnet = environment.networkClass == 'testnet';

  ringSettings$ = new Observable<RingSetting[]>();
  settings!: SettingState;
  lncIsConnected!: boolean;
  lncNodeInfo!: GetInfoResponse;

  links = [
    { title: `Pages.HOME`, route: '' },
    { title: `Pages.OVERVIEW`, route: 'overview' },
    { title: `Pages.VISUAL`, route: 'visual' },
    { title: `Pages.SETTINGS`, route: 'settings' }
  ];

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private store: Store<fromRoot.State>,
    private translate: TranslateService,
    private lnData: LnDataService
  ) { 
    this.store.select(selectSettings).subscribe((settings: SettingState) => {
      this.settings = settings;
      this.translate.use(this.settings.locale)
    });

    this.lnData.emitter.on('connected', (data) => {
      this.lncIsConnected = lnData.lncIsConnected
      this.lncNodeInfo = data
    })
    this.ringSettings$ = this.store.select(selectRingSettings);

  }

  getRingName() {
    return this.settings.ringName;
  }

  loadSettings(item: RingSetting) {
    this.store.dispatch(loadNodeOwners({ nodeOwners: item.ringParticipants }));
    this.store.dispatch(loadRingSetting(item));
  }
}
