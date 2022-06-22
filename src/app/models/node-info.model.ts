import { ChannelEdge } from './channel_edge.model';
//import { LightningNode } from './lightning_node.model';
//import { RoutingPolicy } from './routing_policy.model';
import { LightningNode, NodeInfo as NodeInfoLnd } from '@lightninglabs/lnc-web/dist/types/proto/lnrpc';
import { RoutingPolicy, ChannelEdge as ChannelEdgeLnd } from '@lightninglabs/lnc-web/dist/types/proto/lnrpc';

export class NodeInfo implements NodeInfoLnd {
  node!: LightningNode | undefined;
 // node: LightningNode | undefined;
  numChannels!: number;
  totalCapacity!: string;
  channels!: ChannelEdgeLnd[];
  // node!: LightningNode;
  // channels!: ChannelEdge[];
  // total_capacity?: string;

  get id(): string {
    return this.node?.pubKey || '';
  }

  hasChannelWith(pub_key: string | undefined) {
    let hasChannel: string | null = null;

    for (let edge of this.channels) {
      if (edge.node1Pub == pub_key || edge.node2Pub == pub_key) {
        hasChannel = edge.channelId;
      }
    }

    return hasChannel;
  }

  getChannelPolicies(pub_key: string, channelId: string) {
    let ret:[RoutingPolicy | undefined, RoutingPolicy | undefined] | undefined;

    const edge = this.channels.find((c) => c.channelId == channelId);

    if (!edge) return;

    if (edge.node1Pub == pub_key) {
      ret = [edge.node2Policy, edge.node1Policy];
    } else if (edge.node2Pub == pub_key) {
      ret = [edge.node1Policy, edge.node2Policy];
    }
    return ret;
  }
}
