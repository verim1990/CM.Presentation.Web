import { ActionReducerMap, MetaReducer, createSelector, createFeatureSelector, combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

// Reducers
import * as authReducers from './auth.reducer';
import * as configReducers from './config.reducer';
import * as startupReducers from './startup.reducer';

export {
  authReducers,
  configReducers,
  startupReducers
};

export interface AppState {
  auth: authReducers.State;
  config: configReducers.State;
}

export interface State {
  startup: startupReducers.State;
  app: AppState;
}

export const reducers: ActionReducerMap<State> = {
  startup: startupReducers.reducer,
  app: combineReducers({
    auth: authReducers.reducer,
    config: configReducers.reducer
  })
};

export const metaReducers: MetaReducer<State>[] = [storeFreeze];
