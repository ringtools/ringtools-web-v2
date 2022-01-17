import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { NodeOwner } from '../models/node-owner.model';

export const loadNodeOwners = createAction(
  '[NodeOwner/API] Load NodeOwners', 
  props<{ nodeOwners: NodeOwner[] }>()
);

export const addNodeOwner = createAction(
  '[NodeOwner/API] Add NodeOwner',
  props<{ nodeOwner: NodeOwner }>()
);

export const upsertNodeOwner = createAction(
  '[NodeOwner/API] Upsert NodeOwner',
  props<{ nodeOwner: NodeOwner }>()
);

export const addNodeOwners = createAction(
  '[NodeOwner/API] Add NodeOwners',
  props<{ nodeOwners: NodeOwner[] }>()
);

export const upsertNodeOwners = createAction(
  '[NodeOwner/API] Upsert NodeOwners',
  props<{ nodeOwners: NodeOwner[] }>()
);

export const updateNodeOwner = createAction(
  '[NodeOwner/API] Update NodeOwner',
  props<{ nodeOwner: Update<NodeOwner> }>()
);

export const updateNodeOwners = createAction(
  '[NodeOwner/API] Update NodeOwners',
  props<{ nodeOwners: Update<NodeOwner>[] }>()
);

export const deleteNodeOwner = createAction(
  '[NodeOwner/API] Delete NodeOwner',
  props<{ id: string }>()
);

export const deleteNodeOwners = createAction(
  '[NodeOwner/API] Delete NodeOwners',
  props<{ ids: string[] }>()
);

export const clearNodeOwners = createAction(
  '[NodeOwner/API] Clear NodeOwners'
);
