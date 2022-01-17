import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { NodeOwner } from '../models/node-owner.model';
import * as NodeOwnerActions from '../actions/node-owner.actions';

export const nodeOwnersFeatureKey = 'nodeOwners';

export interface NodeOwnersState extends EntityState<NodeOwner> {
  // additional entities state properties
}

export const adapter: EntityAdapter<NodeOwner> = createEntityAdapter<NodeOwner>();

export const initialState: NodeOwnersState = adapter.getInitialState({
  // additional entity state properties
});

export const nodeOwnersReducer = createReducer(
  initialState,
  on(NodeOwnerActions.addNodeOwner,
    (state, action) => adapter.addOne(action.nodeOwner, state)
  ),
  on(NodeOwnerActions.upsertNodeOwner,
    (state, action) => adapter.upsertOne(action.nodeOwner, state)
  ),
  on(NodeOwnerActions.addNodeOwners,
    (state, action) => adapter.addMany(action.nodeOwners, state)
  ),
  on(NodeOwnerActions.upsertNodeOwners,
    (state, action) => adapter.upsertMany(action.nodeOwners, state)
  ),
  on(NodeOwnerActions.updateNodeOwner,
    (state, action) => adapter.updateOne(action.nodeOwner, state)
  ),
  on(NodeOwnerActions.updateNodeOwners,
    (state, action) => adapter.updateMany(action.nodeOwners, state)
  ),
  on(NodeOwnerActions.deleteNodeOwner,
    (state, action) => adapter.removeOne(action.id, state)
  ),
  on(NodeOwnerActions.deleteNodeOwners,
    (state, action) => adapter.removeMany(action.ids, state)
  ),
  on(NodeOwnerActions.loadNodeOwners,
    (state, action) => adapter.setAll(action.nodeOwners, state)
  ),
  on(NodeOwnerActions.clearNodeOwners,
    state => adapter.removeAll(state)
  ),
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

export function reducer(state: NodeOwnersState | undefined, action: Action): any {
  return nodeOwnersReducer(state, action);
}

export const selectAllNodeOwners = selectAll;