import { Injectable } from '@angular/core';
import * as fromRoot from '../reducers';
import * as LZString from 'lz-string';
import { Store } from '@ngrx/store';
import { RingSetting } from '../models/ring-setting.model';
import { addNodeOwner, loadNodeOwners } from '../actions/node-owner.actions';
import { loadRingSetting } from '../actions/setting.actions';
import { deleteRingSetting } from '../actions/ring-setting.actions';
import { LnDataService } from './ln-data.service';
import { NodeInfo } from '../models/node-info.model';
import { NodeOwner } from '../models/node-owner.model';
import { IRing } from '../models/ring.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { selectNodeOwners } from '../selectors/node-owner.selectors';

@Injectable({
  providedIn: 'root',
})
export class RingDataService {
  nodeOwners$!: Observable<NodeOwner[]>;
  nodeOwners: NodeOwner[] = [];

  private actionSource = new BehaviorSubject('default message');
  currentAction = this.actionSource.asObservable();

  constructor(
    private store: Store<fromRoot.State>,
    private lnData: LnDataService
  ) {
    this.nodeOwners$ = this.store.select(selectNodeOwners);

    this.nodeOwners$.subscribe((nodeOwners: NodeOwner[]) => {
      this.nodeOwners = nodeOwners.map((no) =>
        Object.assign(new NodeOwner(), no)
      );
    });
  }

  loadSettings(item: RingSetting) {
    this.store.dispatch(loadNodeOwners({ nodeOwners: item.ringParticipants }));
    this.store.dispatch(loadRingSetting(item));
  }

  removeSettings(item: RingSetting) {
    this.store.dispatch(deleteRingSetting({ id: item.cleanRingName }));
  }

  setNodeOwners(nodeOwners: any) {
    this.store.dispatch(loadNodeOwners({ nodeOwners: nodeOwners }));
  }

  addNodeOwner(pubKey: string, tgUsername: string) {
    this.lnData.getNodeInfo(pubKey).subscribe((nodeInfo: NodeInfo) => {
      let no: NodeOwner = {
        pub_key: nodeInfo.node.alias,
        nodename: nodeInfo.node.alias,
        first_name: tgUsername,
        username: tgUsername,
        username_or_name: '',
      };

      this.store.dispatch(addNodeOwner({ nodeOwner: no }));
    });
  }

  async getRing(): Promise<IRing> {
    let ring: IRing = [];
    for (const [i, node] of this.nodeOwners.entries()) {
      let nextIndex = (i + 1) % this.nodeOwners.length;
      const nodeInfo = Object.assign(
        new NodeInfo(),
        await this.lnData.getNodeInfoAsync(this.nodeOwners[i].pub_key)
      );
      let channel = nodeInfo.hasChannelWith(this.nodeOwners[nextIndex].pub_key);

      ring.push([
        Object.assign(new NodeOwner(), this.nodeOwners[i]),
        Object.assign(new NodeOwner(), this.nodeOwners[nextIndex]),
        channel,
        channel
          ? nodeInfo.getChannelPolicies(
              this.nodeOwners[nextIndex].pub_key,
              channel
            )
          : undefined,
      ]);
    }

    return ring;
  }

  doAction(action: string) {
    this.actionSource.next(action);
  }
}
