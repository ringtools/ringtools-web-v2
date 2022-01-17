import { createAction, props } from '@ngrx/store';
import { NodeOwner } from '../models/node-owner.model';

export const loadSettings = createAction(
  '[Setting] Load Settings'
);

export const setRingName = createAction(
  '[Setting] set Ring Name',
  (ringName: string) => ({ringName})
);

export const setRingSize = createAction(
  '[Setting] set Ring Size',
  (ringSize: number) => ({ringSize})
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
