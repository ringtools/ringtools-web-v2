import { ChannelEdge } from './channel_edge.model';
import { LightningNode } from './lightning_node.model';
import { RoutingPolicy } from './routing_policy.model';

export class NodeInfo {
  node!: LightningNode;
  channels!: ChannelEdge[];
  total_capacity?: string;

  get id(): string {
    return this.node?.pub_key;
  }

  hasChannelWith(pub_key: string | undefined) {
    let hasChannel: number | null = null;

    for (let edge of this.channels) {
      if (edge.node1_pub == pub_key || edge.node2_pub == pub_key) {
        hasChannel = edge.channel_id;
      }
    }

    return hasChannel;
  }

  getChannelPolicies(pub_key: string, channelId: number) {
    let ret:[RoutingPolicy, RoutingPolicy] | undefined;

    const edge = this.channels.find((c) => c.channel_id == channelId);

    if (!edge) return;

    if (edge.node1_pub == pub_key) {
      ret = [edge.node2_policy, edge.node1_policy];
    } else if (edge.node2_pub == pub_key) {
      ret = [edge.node1_policy, edge.node2_policy];
    }
    return ret;
  }
}
