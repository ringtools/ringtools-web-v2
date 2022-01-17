import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { NodeInfo } from '../models/node-info.model';
import * as NodeInfoActions from '../actions/node-info.actions';

export const nodeInfoesFeatureKey = 'nodeInfoes';

export interface State extends EntityState<NodeInfo> {
  // additional entities state properties
}

export const adapter: EntityAdapter<NodeInfo> = createEntityAdapter<NodeInfo>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,
  on(NodeInfoActions.addNodeInfo,
    (state, action) => adapter.addOne(action.nodeInfo, state)
  ),
  on(NodeInfoActions.upsertNodeInfo,
    (state, action) => adapter.upsertOne(action.nodeInfo, state)
  ),
  on(NodeInfoActions.addNodeInfos,
    (state, action) => adapter.addMany(action.nodeInfos, state)
  ),
  on(NodeInfoActions.upsertNodeInfos,
    (state, action) => adapter.upsertMany(action.nodeInfos, state)
  ),
  on(NodeInfoActions.updateNodeInfo,
    (state, action) => adapter.updateOne(action.nodeInfo, state)
  ),
  on(NodeInfoActions.updateNodeInfos,
    (state, action) => adapter.updateMany(action.nodeInfos, state)
  ),
  on(NodeInfoActions.deleteNodeInfo,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(NodeInfoActions.deleteNodeInfos,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(NodeInfoActions.loadNodeInfos,
    (state, action) => adapter.setAll(action.nodeInfos, state)
  ),
  on(NodeInfoActions.clearNodeInfos,
    state => adapter.removeAll(state)
  ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
