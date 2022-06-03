import { Action, createReducer, on } from '@ngrx/store';
import { NodeOwner } from '../models/node-owner.model';
import * as SettingActions from '../actions/setting.actions';

export const settingFeatureKey = 'setting';

export interface SettingState {
  ringName: string
  ringSize: number
  viewMode: string
  showLogo: boolean
  useShortChannelIds: boolean
  advancedView: boolean
  locale: string
  ringLeader?: NodeOwner
}

export const initialSettingState: SettingState = {
  ringName: 'Unconfigured',
  viewMode: 'tg',
  showLogo: false,
  useShortChannelIds: false,
  advancedView: false,
  locale: 'en-US',
  ringSize: 0
};

export const settingReducer = createReducer(
  initialSettingState,
  on(SettingActions.setRingName, 
    (state: SettingState, {ringName}) => {
      return {...state, ringName }
  }),
  on(SettingActions.setRingLeader, 
    (state: SettingState, {ringLeader}) => {
      return {...state, ringLeader }
  }),
  on(SettingActions.setRingSize, 
    (state: SettingState, {ringSize}) => {
      return {...state, ringSize: Number(ringSize) }
  }),
  on(SettingActions.setViewMode, 
    (state: SettingState, {viewMode}) => {
      return {...state, viewMode }
  }),
  on(SettingActions.setShowLogo, 
    (state: SettingState, {showLogo}) => {
      return {...state, showLogo }
  }),
  on(SettingActions.setUseShortChannelIds, 
    (state: SettingState, {useShortChannelIds}) => {
      return {...state, useShortChannelIds }
  }),
  on(SettingActions.setAdvancedView, 
    (state: SettingState, {advancedView}) => {
      return {...state, advancedView }
  }),
  on(SettingActions.setLocale, 
    (state: SettingState, {locale}) => {
      return {...state, locale }
  }),
);

export function reducer(state: SettingState | undefined, action: Action): any {
  return settingReducer(state, action);
}