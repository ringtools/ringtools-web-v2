import { createAction, props } from '@ngrx/store';
import { NodeOwner } from '../models/node-owner.model';
import { RingSetting } from '../models/ring-setting.model';

export const loadSettings = createAction(
  '[Setting] Load Settings'
);

export const setRingName = createAction(
  '[Setting] set Ring Name',
  (ringName: string) => ({ringName})
);

export const loadRingSetting = createAction(
  '[Setting] Load Ring Setting',
  (ringSetting: RingSetting) => ({ringSetting})
);

export const setRingSize = createAction(
  '[Setting] set Ring Size',
  (ringSize: number | undefined) => ({ringSize})
);

export const setRingLeader = createAction(
  '[Setting] set Ring Leader',
  (ringLeader: NodeOwner) => ({ringLeader})
);

export const setViewMode = createAction(
  '[Setting] set View Mode',
  (viewMode: string) => ({viewMode})
);

export const setShowLogo = createAction(
  '[Setting] set Show Logo',
  (showLogo: boolean) => ({showLogo})
);

export const setUseShortChannelIds = createAction(
  '[Setting] set Use Short Channel IDs',
  (useShortChannelIds: boolean) => ({useShortChannelIds})
);