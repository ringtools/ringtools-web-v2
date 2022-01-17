import { NodeOwner } from "./node-owner.model";

export class RingSetting {
  id?: string;
  ringName!: string;
  cleanRingName!: string;
  ringParticipants!: NodeOwner[];
  ringSize!: number;
  ringLeader?: NodeOwner;
}
