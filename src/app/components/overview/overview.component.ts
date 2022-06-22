import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscriber, Subscription } from 'rxjs';
import * as svg from 'save-svg-as-png';
import { upsertNodeInfo } from 'src/app/actions/node-info.actions';
import { setViewMode } from 'src/app/actions/setting.actions';
import { ChannelEdge } from 'src/app/models/channel_edge.model';
import { NodeInfo } from 'src/app/models/node-info.model';
import { NodeOwner } from 'src/app/models/node-owner.model';
import { IRing } from 'src/app/models/ring.model';
import { SettingState } from 'src/app/reducers/setting.reducer';
import { selectNodeOwners } from 'src/app/selectors/node-owner.selectors';
import { selectSettings } from 'src/app/selectors/setting.selectors';
import { LnDataService } from 'src/app/services/ln-data.service';
import * as fromRoot from '../../reducers';
import { NodeInfo as NodeInfoLnd } from '@lightninglabs/lnc-web/dist/types/proto/lnrpc';
import { ChannelEdge as ChannelEdgeLnd } from '@lightninglabs/lnc-web/dist/types/proto/lnrpc';

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
  sub: Subscription = new Subscription();
  viewModeForm = new FormGroup({
    viewMode: new FormControl(''),
  });

  connected = false
  
  constructor(
    private store: Store<fromRoot.State>,
    private lnData: LnDataService
  ) {
    this.nodeOwners$ = this.store.select(selectNodeOwners);
    this.settings$ = this.store.select(selectSettings);

    this.settings$.subscribe((settings: SettingState) => {
      this.settings = settings;
      this.viewMode = settings.viewMode;

      this.viewModeForm.setValue({ viewMode: this.settings.viewMode });
    });

    lnData.emitter.on('connected', () => {
      this.connected = true
      this.onConnected()
    })


    if (lnData.lncIsConnected) {
      this.connected = true
      this.onConnected()
    } else {
      lnData.emitter.on('connected', () => {
        this.connected = true
        this.onConnected()
      })
    }

    this.viewModeForm.valueChanges.subscribe((e) => {
      this.viewChange(e);
    })


  }

  onConnected(): void {
    this.sub.add(
      this.nodeOwners$.subscribe((nodeOwners: NodeOwner[]) => {
        this.lnData.emitter.emit(
          'subscribe_node',
          nodeOwners.map((no) => no.pub_key)
        );

        this.ring = this.makeRing(nodeOwners);

      })
    );

    this.lnData.emitter.on('node', (data: NodeInfoLnd) => {
      this.store.dispatch(upsertNodeInfo({ nodeInfo: data }));
      if (!data.node) return
      this.nodeData.set(data.node?.pubKey, Object.assign(new NodeInfo(), data));
      this.refreshRing();

      const channelIds = this.ring.map((r) => r[2]).filter((r) => r != null);

      if (channelIds.length) {
        this.lnData.emitter.emit('subscribe_channel', channelIds);
      }
    });

    this.lnData.emitter.on('channel', (data: ChannelEdgeLnd) => {
      let node1 = this.nodeData.get(data.node1Pub)
      let channelIndex1 = node1?.channels.findIndex(c => c.channelId == data.channelId)
      if (node1 && channelIndex1) {
        node1.channels = [...node1.channels];
        node1.channels[channelIndex1] = data;
        this.nodeData.set(data.node1Pub, node1);
      }

      let node2 = this.nodeData.get(data.node2Pub)
      let channelIndex2 = node2?.channels.findIndex(c => c.channelId == data.channelId)
      if (node2 && channelIndex2) {
        node2.channels = [...node2.channels];
        node2.channels[channelIndex2] = data;
        this.nodeData.set(data.node2Pub, node2);
      }

      this.refreshRing();
    });
  }

  ngOnDestroy(): void {
//    this.lnData.nodeSocket?.emit('unsubscribe_all');
//    this.lnData.channelSocket?.emit('unsubscribe_all');
    this.sub.unsubscribe();
  }

  viewChange(event: any) {
    const val = event.viewMode;

    if (this.viewMode != this.viewModeForm.get('viewMode')?.value) {
      this.store.dispatch(setViewMode(val));
    }
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

      let c2 = channel ? this.nodeData.get(ringParticipants[i].pub_key)?.getChannelPolicies(ringParticipants[nextIndex].pub_key, channel) : undefined

      ring.push([
        Object.assign(new NodeOwner(), ringParticipants[i]),
        Object.assign(new NodeOwner(), ringParticipants[nextIndex]),
        channel,
        c2
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
