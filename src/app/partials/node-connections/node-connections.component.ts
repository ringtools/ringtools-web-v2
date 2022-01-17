import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LightningNode } from 'src/app/models/lightning_node.model';
import { NodeInfo } from 'src/app/models/node-info.model';
import { NodeOwner } from 'src/app/models/node-owner.model';
import { selectNodeOwners } from 'src/app/selectors/node-owner.selectors';
import { LnDataService } from 'src/app/services/ln-data.service';
import {
  Data,
  DataSet,
  Edge,
  Node,
  Options,
  VisNetworkService,
} from 'src/app/vis/vis.module';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'app-node-connections',
  templateUrl: './node-connections.component.html',
  styleUrls: ['./node-connections.component.scss'],
})
export class NodeConnectionsComponent implements OnInit {
  public visNetwork: string = 'networkId1';
  public visNetworkData!: Data;
  public nodes!: DataSet<Node>;
  public edges!: DataSet<Edge>;
  public visNetworkOptions!: Options;

  nodeOwners: NodeOwner[] = [];
  nodeOwners$: Observable<NodeOwner[]>;

  constructor(
    private store: Store<fromRoot.State>,
    private lnData: LnDataService,
    private visNetworkService: VisNetworkService
  ) {
    this.nodeOwners$ = this.store.select(selectNodeOwners);

    this.nodeOwners$.subscribe((data) => {
      this.nodeOwners = data;
    });
  }

  ngOnInit(): void {
    this.nodes = new DataSet<Node>();
    this.edges = new DataSet<Edge>([]);
    this.visNetworkData = {
      nodes: this.nodes,
      edges: this.edges,
    };

    this.visNetworkOptions = {
      interaction: { hover: true },
      manipulation: {
        enabled: true,
      },
      layout: {
        randomSeed: 681154853,
      },
      edges: {},
    };

    // if (this.ringData.isLoaded) {
    this.buildNodes();
    // } else {
    // this.ringData.isReady$.subscribe(() => {
    //   this.buildNodes();
    // });
    //}
  }

  public bestFit() {
    this.visNetworkService.bestFit(this.visNetwork, this.nodes);
  }

  buildNodes() {
    for (let node of this.nodeOwners) {
      let data = this.lnData
        .getNodeInfo(node.pub_key)
        .subscribe((data: NodeInfo) => {
          let label;

          //if (this.viewMode == 'node') {
          label = node.nodename;
          //} else {
          //  label = node.username_or_name
          // }

          let nodeInfo: Node = {
            id: data.node.pub_key,
            color: data.node.color,
            label: data.node.alias,
          };

          this.nodes.add(nodeInfo);

          channelloop: for (let edge of data.channels) {
            if (!this.edges.get(edge.channel_id)) {
              let e: any = {
                id: edge.channel_id,
                from: edge.node1_pub,
                to: edge.node2_pub,
                dashes: true,
              };

              if (!edge.node1_policy || !edge.node2_policy) {
                e.label = 'no info';
                e.color = '#ffcc00';
              }

              this.edges.add(e);
              continue channelloop;
            }
          }
        });
    }
  }
}
