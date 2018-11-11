import { createSelector, createFeatureSelector } from '@ngrx/store';

// Root
import { RootState } from '../../../auth/root';

// Contants
import { USER_CONSTANTS_MODULE_NAME } from '../../user.contants';

// Reducers
import * as usersReducers from "./users.reducer";

export {
  usersReducers
}

// State
export interface UserModuleState {
  users: usersReducers.State;
}

export interface State extends RootState {
  [USER_CONSTANTS_MODULE_NAME]: UserModuleState;
}

// State selector
export const getUserModuleState = createFeatureSelector<UserModuleState>(USER_CONSTANTS_MODULE_NAME);

// Reducers
export const reducers = {
    users: usersReducers.reducer,
};

// Selectors for users
export const getUsersState = createSelector(
    getUserModuleState,
    (state: UserModuleState) => state.users
);

export const getUsersLoaded = createSelector(
  getUsersState,
    usersReducers.getLoaded
);
export const getUsersLoading = createSelector(
  getUsersState,
    usersReducers.getLoading
);
export const getUsers = createSelector(
  getUsersState,
  usersReducers.getUsers
);
