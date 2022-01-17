import { NodeOwner } from "./node-owner.model";
import { RoutingPolicy } from "./routing_policy.model";

export type IRing = [NodeOwner, NodeOwner, number | null | undefined, ([RoutingPolicy, RoutingPolicy] | undefined)?][];