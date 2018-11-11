import { createSelector, createFeatureSelector } from '@ngrx/store';

// Root
import { RootState } from '../../root';

// Contants
import { AUTH_CONSTANTS_MODULE_NAME } from '../../auth.contants';

// Redux
import * as loginReducers from "./login.reducer";
import * as logoutReducers from "./logout.reducer";
import * as registerReducers from "./register.reducer";

export {
  loginReducers,
  logoutReducers,
  registerReducers
}

// Store
export interface AuthModuleState {
  login: loginReducers.State;
  logout: logoutReducers.State;
  register: registerReducers.State;
}

export interface State extends RootState {
  [AUTH_CONSTANTS_MODULE_NAME]: AuthModuleState;
}

// State selector
export const getAuthModuleState = createFeatureSelector<AuthModuleState>(AUTH_CONSTANTS_MODULE_NAME);

// Reducers
export const reducers = {
  login: loginReducers.reducer,
  logout: logoutReducers.reducer,
  register: registerReducers.reducer,
};

// Selectors for login
export const getLoginState = createSelector(
    getAuthModuleState,
    (state: AuthModuleState) => state != null ? state.login : {}
);

export const getLoggedIn = createSelector(
  <any>getLoginState,
  loginReducers.getLoggedIn
);

export const getToken = createSelector(
  <any>getLoginState,
  loginReducers.getToken
);

// Selectors for register
export const getRegisterState = createSelector(
    getAuthModuleState,
    (state: AuthModuleState) => state != null ? state.register : {}
);

export const getRegistered = createSelector(
  <any>getRegisterState,
  registerReducers.getRegistered);
