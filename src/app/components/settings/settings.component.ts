import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { deleteNodeOwner, loadNodeOwners } from 'src/app/actions/node-owner.actions';
import {
  loadRingSetting,
  setRingName,
  setRingSize,
  setShowLogo,
} from 'src/app/actions/setting.actions';
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
import * as LZString from 'lz-string';
import { data } from 'vis-network';
import { deleteRingSetting, upsertRingSetting } from 'src/app/actions/ring-setting.actions';
import { nodeOwnersReducer } from 'src/app/reducers/node-owner.reducer';
import { RingDataService } from 'src/app/services/ring-data.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  ringSettings$ = new Observable<RingSetting[]>();
  ringSettings: RingSetting[] = [];
  nodeOwners$ = new Observable<NodeOwner[]>();
  nodeOwners: NodeOwner[] = [];

  shareUrl: string = '';
  showLogo: boolean = true;

  settings!: SettingState;

  ringForm = new FormGroup({
    name: new FormControl(''),
    size: new FormControl(''),
  });

  nodeForm = new FormGroup({
    pubKey: new FormControl(''),
    tgUsername: new FormControl(''),
  });

  pubkeysText: string = '';
  tempNodename: string = '';

  constructor(
    private file: FileService,
    private notification: NotificationService,
    private route: ActivatedRoute,
    private ringData: RingDataService,
    private store: Store<fromRoot.State>
  ) {
    this.store.select(selectSettings).subscribe((settings: SettingState) => {
      this.settings = settings;
    });

    this.ringSettings$ = this.store.select(selectRingSettings);
    this.nodeOwners$ = this.store.select(selectNodeOwners);

    this.nodeOwners$.subscribe((nodeOwners: NodeOwner[]) => {
      this.nodeOwners = nodeOwners.map((no) => Object.assign(new NodeOwner, no));
    });
  }

  ngOnInit(): void {
    const loadRingNew = this.route.snapshot.queryParamMap.get('l');
    if (loadRingNew) {
      this.parseLoadQueryString(loadRingNew);
    }
  }

  parseLoadQueryString(loadRing: string) {
    const decodedData = LZString.decompressFromEncodedURIComponent(loadRing);

    if (!decodedData) return;

    let importData = JSON.parse(decodedData);
    let segments = this.file.parseNewExportFormat(importData['data']);

    let ringSetting = Object.assign(new RingSetting(), {
      cleanRingName: importData['name'],
      ringName: importData['name'],
      ringSize: importData['size'],
      ringParticipants: segments,
    });

    this.loadSettings(ringSetting);
  }

  loadSettings(item: RingSetting) {
    this.pubkeysText = this.file.convertToCsv(item.ringParticipants);

    this.ringData.loadSettings(item);

    this.ringForm.setValue({
      name: item.ringName,
      size: item.ringSize,
    });
    this.notification.showSuccess(`Ring load ${item.cleanRingName} successful`);
  }

  removeSettings(item: RingSetting) {
    this.ringData.removeSettings(item);

    try {
      this.notification.show(`Ring remove ${item.cleanRingName} successful`, {
        classname: 'bg-success',
      });
    } catch (e) {
      this.notification.show('Error removing ring', {
        classname: 'bg-error',
      });
    }
  }

  addNodeOwner() {
    const pubKey = this.nodeForm.get('pubKey')?.value;
    const tgUsername = this.nodeForm.get('tgUsername')?.value;

    if (!pubKey || !tgUsername) return;

    try {
      this.ringData.addNodeOwner(pubKey, tgUsername)

      this.notification.show(`Added node ${pubKey}`, {
        classname: 'bg-success',
      });
    } catch {
      this.notification.show('Error adding node', {
        classname: 'bg-danger',
      });
    }
  }

  emojiPrefix(item: RingSetting) {
    return `${item.ringName} (${item.ringSize})`;
  }

  parseCapacityName() {
    const ringName = this.ringForm.get('name')?.value;

    if (!ringName) return;

    let capacity: String = ringName.match(/_(\d+[K|M])sats_/)[1];

    capacity = capacity.toString().replace('K', '000');
    capacity = capacity.toString().replace('M', '000000');

    this.ringForm.get('size')?.patchValue(capacity);
  }

  exportJSON() {}

  saveRingSettings() {
    const ringName = this.ringForm.get('name')?.value;
    const ringSize = this.ringForm.get('size')?.value;

    if (!ringSize || !ringName || !this.nodeOwners.length) {
      this.notification.show('Ring name, size or participants missing', {
        classname: 'bg-warning',
      });
      return;
    };

    let ringSettings: RingSetting = {
      ringName: ringName,
      ringParticipants: this.nodeOwners,
      cleanRingName: ringName.replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        ''
      ),
      id: ringName.replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g,
        ''
      ),
      ringSize: ringSize,
    };
    this.store.dispatch(upsertRingSetting({ ringSetting: ringSettings }));
    this.store.dispatch(setRingName(ringName));
  }

  processGroupnodes() {
    const nodeOwners = this.file.parseCsvToType(this.pubkeysText);

    this.ringData.setNodeOwners(nodeOwners);
  }

  removeNodeOwner(nodeOwner: NodeOwner) {
    try {
      this.store.dispatch(deleteNodeOwner({id: nodeOwner.pub_key }));
      this.notification.show(`Removed node ${nodeOwner.nodename}`, {
        classname: 'bg-success',
      });
    } catch (e) {
      this.notification.show('Error removing node', {
        classname: 'bg-danger',
      });
    }
  }

  updateShowLogo(event: any) {
    this.store.dispatch(setShowLogo(event));
  }

  processRingname() {}

  get1MlLink(node: any) {
    let add = environment.networkClass == 'testnet' ? 'testnet/' : '';
    return `https://1ml.com/${add}node/${node.pub_key}`;
  }
}
