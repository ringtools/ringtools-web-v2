import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadNodeOwners } from 'src/app/actions/node-owner.actions';
import { NodeOwner } from 'src/app/models/node-owner.model';
import { RingSetting } from 'src/app/models/ring-setting.model';
import { SettingState } from 'src/app/reducers/setting.reducer';
import { selectNodeOwners } from 'src/app/selectors/node-owner.selectors';
import { selectRingSettings } from 'src/app/selectors/ring-setting.selectors';
import { selectSettings } from 'src/app/selectors/setting.selectors';
import { FileService } from 'src/app/services/file.service';
import { NotificationService } from 'src/app/services/notification.service';
import { environment } from 'src/environments/environment';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  ringSettings$ = new Observable<RingSetting[]>();
  ringSettings: RingSetting[] = [];
  nodeOwners$ = new Observable<any>();

  shareUrl: string = '';
  showLogo: boolean = true;

  settings!: SettingState;

  // TODO: improve
  addPubKey: any;
  addTgUsername: any;
  tempNodename = '';
  pubkeysText: any = '';
  ringName: any = '';
  ringSize!: number;

  constructor(
    private file: FileService,
    private notification: NotificationService,
    private store: Store<fromRoot.State>
    ) {
    this.store.select(selectSettings).subscribe((settings: SettingState) => {
      this.settings = settings;
    });

    this.ringSettings$ = this.store.select(selectRingSettings);
    this.nodeOwners$ = this.store.select(selectNodeOwners);
  }

  loadSettings(item: RingSetting) {
    console.log('load', item);

    this.pubkeysText = this.file.convertToCsv(item.ringParticipants);

    this.store.dispatch(loadNodeOwners({ nodeOwners: item.ringParticipants }));


    this.notification.showSuccess(`Ring load ${item.cleanRingName} successful`);
  }

  removeSettings(item: any) {}

  addNodeOwner() {}

  emojiPrefix(item: any) {
    return `${item.ringName} (${item.ringSize})`;
  }

  parseCapacityName() {}

  exportJSON() {}

  saveRingSettings() {}

 
  processGroupnodes() {}

  removeNodeOwner(item: any) {}

  updateShowLogo(event: any) {}

  setRingSize() {}

  processRingname() {}

  get1MlLink(node: any) {
    let add = environment.networkClass == 'testnet' ? 'testnet/' : '';
    return `https://1ml.com/${add}node/${node.pub_key}`;
  }
}
