import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { RingSetting } from '../models/ring-setting.model';
import * as RingSettingActions from '../actions/ring-setting.actions';

export const ringSettingsFeatureKey = 'ringSettings';

export interface RingSettingsState extends EntityState<RingSetting> {
  // additional entities state properties
}

export const ringSettingAdapter: EntityAdapter<RingSetting> = createEntityAdapter<RingSetting>();

export const initialState: RingSettingsState = ringSettingAdapter.getInitialState({
  // additional entity state properties
});

export const ringSettingsReducer = createReducer(
  initialState,
  on(RingSettingActions.addRingSetting,
    (state, action) => ringSettingAdapter.addOne(action.ringSetting, state)
  ),
  on(RingSettingActions.upsertRingSetting,
    (state, action) => ringSettingAdapter.upsertOne(action.ringSetting, state)
  ),
  on(RingSettingActions.addRingSettings,
    (state, action) => ringSettingAdapter.addMany(action.ringSettings, state)
  ),
  on(RingSettingActions.upsertRingSettings,
    (state, action) => ringSettingAdapter.upsertMany(action.ringSettings, state)
  ),
  on(RingSettingActions.updateRingSetting,
    (state, action) => ringSettingAdapter.updateOne(action.ringSetting, state)
  ),
  on(RingSettingActions.updateRingSettings,
    (state, action) => ringSettingAdapter.updateMany(action.ringSettings, state)
  ),
  on(RingSettingActions.deleteRingSetting,
    (state, action) => ringSettingAdapter.removeOne(action.id, state)
  ),
  on(RingSettingActions.deleteRingSettings,
    (state, action) => ringSettingAdapter.removeMany(action.ids, state)
  ),
  on(RingSettingActions.loadRingSettings,
    (state, action) => ringSettingAdapter.setAll(action.ringSettings, state)
  ),
  on(RingSettingActions.clearRingSettings,
    state => ringSettingAdapter.removeAll(state)
  ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = ringSettingAdapter.getSelectors();


export const selectAllRingSettings = selectAll;


export function reducer(state: RingSettingsState | undefined, action: Action): any {
  return ringSettingsReducer(state, action);
}