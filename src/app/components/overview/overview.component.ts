import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as svg from 'save-svg-as-png';
import { upsertNodeInfo } from 'src/app/actions/node-info.actions';
import { setViewMode } from 'src/app/actions/setting.actions';
import { NodeInfo } from 'src/app/models/node-info.model';
import { NodeOwner } from 'src/app/models/node-owner.model';
import { IRing } from 'src/app/models/ring.model';
import { SettingState } from 'src/app/reducers/setting.reducer';
import { selectNodeOwners } from 'src/app/selectors/node-owner.selectors';
import { selectSettings } from 'src/app/selectors/setting.selectors';
import { LnDataService } from 'src/app/services/ln-data.service';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnDestroy {
  viewMode!: string;
  nodeOwners$!: Observable<NodeOwner[]>;
  settings$!: Observable<SettingState>;
  settings!: SettingState;
  ring: IRing = [];
  nodeData: Map<string, NodeInfo> = new Map<string, NodeInfo>();

  constructor(
    private store: Store<fromRoot.State>,
    private lnData: LnDataService,
  ) {
    this.nodeOwners$ = this.store.select(selectNodeOwners);
    this.settings$ = this.store.select(selectSettings);

    this.settings$.subscribe((settings: SettingState) => {
      this.settings = settings;
    });

    this.nodeOwners$.subscribe((nodeOwners: NodeOwner[]) => {
      this.lnData.nodeSocket.emit(
        'subscribe',
        nodeOwners.map((no) => no.pub_key)
      );

      this.ring = this.makeRing(nodeOwners);
    });

    this.lnData.nodeSocket.on('node', (data: NodeInfo) => {
      this.store.dispatch(upsertNodeInfo({ nodeInfo: data }));

      this.nodeData.set(data.node.pub_key, Object.assign(new NodeInfo(), data));
      this.refreshRing();
    });
  }

  ngOnDestroy(): void {
    this.lnData.channelSocket.emit('unsubscribe_all');
  }

  viewChange(event: any) {
    this.store.dispatch(setViewMode(event));
  }

  downloadAsPng() {
    const ringName = this.settings.ringName;
    const container = document.getElementById('rofvisual');

    if (!container) return;

    svg.saveSvgAsPng(container.children[0], `${ringName}.png`, {
      backgroundColor: '#000',
      scale: 1.5,
    });
  }

  makeRing(ringParticipants: NodeOwner[]) {
    let ring: IRing = [];
    for (const [i, node] of ringParticipants.entries()) {
      let nextIndex = (i + 1) % ringParticipants.length;

      let channel = this.nodeData
        .get(ringParticipants[i].pub_key)
        ?.hasChannelWith(ringParticipants[nextIndex].pub_key);

      ring.push([
        Object.assign(new NodeOwner(), ringParticipants[i]),
        Object.assign(new NodeOwner(), ringParticipants[nextIndex]),
        channel,
        channel
          ? this.nodeData
              .get(ringParticipants[i].pub_key)
              ?.getChannelPolicies(ringParticipants[nextIndex].pub_key, channel)
          : undefined,
      ]);
    }

    return ring;
  }

  refreshRing() {
    const ring = this.ring;
    for (const rp of ring) {
      let channel = this.nodeData
        .get(rp[0].pub_key)
        ?.hasChannelWith(rp[1].pub_key);

      if (channel) {
        rp[2] = channel;
        rp[3] = this.nodeData
          .get(rp[0].pub_key)
          ?.getChannelPolicies(rp[1].pub_key, channel);
      }
    }
    this.ring = [...ring];
  }
}
