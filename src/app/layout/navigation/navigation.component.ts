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

  links = [
    { title: 'Home', route: '' },
    { title: 'Overview', route: 'overview' },
    { title: 'Visual', route: 'visual' },
    { title: 'Settings', route: 'settings' }
  ];

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private store: Store<fromRoot.State>,

  ) { 
    this.store.select(selectSettings).subscribe((settings: SettingState) => {
      this.settings = settings;
    });

    this.ringSettings$ = this.store.select(selectRingSettings);

  }

  getRingName() {
    return this.settings.ringName;
  }

  // TODO: Add type
  loadSettings(item: any) {
    
  }
}
