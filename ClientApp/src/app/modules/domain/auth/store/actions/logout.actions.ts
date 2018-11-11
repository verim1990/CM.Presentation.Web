import { Action } from "@ngrx/store";

export const LOGOUT = "[Auth] Logout";
export const LOGOUT_EXTERNAL = "[Auth] Logout External";
export const LOGOUT_SUCCESS = "[Auth] Logout Success";
export const LOGOUT_FAILURE = "[Auth] Logout Failure";
export const LOGOUT_REDIRECT = "[Auth] Logout Redirect";

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class LogoutExternal implements Action {
    readonly type = LOGOUT_EXTERNAL;
}

export class LogoutSuccess implements Action {
    readonly type = LOGOUT_SUCCESS;

    constructor(public payload: { redirect: boolean }) {}
}

export class LogoutFailure implements Action {
    readonly type = LOGOUT_FAILURE;

  constructor(public payload: { message: string }) {}
}

export class LogoutRedirect implements Action {
    readonly type = LOGOUT_REDIRECT;
}

export type LogoutActions =
    | Logout
    | LogoutExternal
    | LogoutSuccess
    | LogoutFailure
    | LogoutRedirect;
