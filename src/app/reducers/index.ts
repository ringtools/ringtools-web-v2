import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { localStorageSync, rehydrateApplicationState } from 'ngrx-store-localstorage';

import { environment } from '../../environments/environment';
import { nodeOwnersFeatureKey, nodeOwnersReducer, NodeOwnersState } from './node-owner.reducer';
import { ringSettingsReducer, ringSettingsFeatureKey, RingSettingsState } from './ring-setting.reducer';
import { settingFeatureKey, settingReducer, SettingState } from './setting.reducer';

export interface State {
  setting: SettingState,
  ringSettings: RingSettingsState,
  nodeOwners: NodeOwnersState
}

export const reducers: ActionReducerMap<State> = {
  setting: settingReducer,
  ringSettings: ringSettingsReducer,
  nodeOwners: nodeOwnersReducer
};


export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync(
    {
      keys: [ringSettingsFeatureKey, nodeOwnersFeatureKey, settingFeatureKey],
      rehydrate: true,
      storageKeySerializer: (k) => environment.networkClass ? `${environment.networkClass}.${k}` : k
    })(reducer);
}

export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];