import { NodeOwner } from "./node-owner.model";
//import { RoutingPolicy } from "./routing_policy.model";
import { RoutingPolicy, ChannelEdge as ChannelEdgeLnd } from '@lightninglabs/lnc-web/dist/types/proto/lnrpc';

export type IRing = [NodeOwner, NodeOwner, string | null | undefined, ([RoutingPolicy | undefined, RoutingPolicy | undefined] | undefined)?][];