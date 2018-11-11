import { Action } from '@ngrx/store';

export const AUTHORIZED = '[Main] [Auth] Authorized';
export const UNAUTHORIZED = '[Main] [Auth] Unauthorized';
export const ROOT_REDIRECT = '[Main] [Auth] Root Redirect';
export const SESSION_EXPIRED = '[Main] [Auth] Session Expired';

export class Authorized implements Action {
  readonly type = AUTHORIZED;
}

export class Unauthorized implements Action {
  readonly type = UNAUTHORIZED;
}

export class RootRedirect implements Action {
  readonly type = ROOT_REDIRECT;
}

export class SessionExpired implements Action {
  readonly type = SESSION_EXPIRED;
}

export type AuthActions =
    | Authorized
    | Unauthorized
    | RootRedirect
    | SessionExpired;
