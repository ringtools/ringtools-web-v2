import { Action, createReducer, on } from '@ngrx/store';
import { NodeOwner } from '../models/node-owner.model';
import * as SettingActions from '../actions/setting.actions';

export const settingFeatureKey = 'setting';

export interface SettingState {
  ringName: string
  ringSize: number;
  viewMode: string
  showLogo: boolean
  ringLeader?: NodeOwner;
}

export const initialState: SettingState = {
  ringName: 'Unconfigured',
  viewMode: 'tg',
  showLogo: false,
  ringSize: 0
};

export const settingReducer = createReducer(
  initialState,
  on(SettingActions.setRingName, 
    (state: SettingState, {ringName}) => {
      return {...state, ringName: ringName }
  }),
  on(SettingActions.setRingLeader, 
    (state: SettingState, {ringLeader}) => {
      return {...state, ringLeader: ringLeader }
  }),
  on(SettingActions.setRingSize, 
    (state: SettingState, {ringSize}) => {
      return {...state, ringSize: ringSize }
  }),
  on(SettingActions.setViewMode, 
    (state: SettingState, {viewMode}) => {
      return {...state, viewMode: viewMode }
  }),
  on(SettingActions.setShowLogo, 
    (state: SettingState, {showLogo}) => {
      return {...state, showLogo: showLogo }
  }),
);

export function reducer(state: SettingState | undefined, action: Action): any {
  return settingReducer(state, action);
}