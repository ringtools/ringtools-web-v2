import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromNodeOwner from '../reducers/node-owner.reducer';

export const selectNodeOwnersState = createFeatureSelector<fromNodeOwner.NodeOwnersState>(
    fromNodeOwner.nodeOwnersFeatureKey,
);

export const selectNodeOwners = createSelector(
    selectNodeOwnersState,
    fromNodeOwner.selectAllNodeOwners
)