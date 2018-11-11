import { Action } from "@ngrx/store";

export const LOGIN = "[Auth] Login";
export const LOGIN_EXTERNAL = "[Auth] Login External";
export const LOGIN_SUCCESS = "[Auth] Login Success";
export const LOGIN_FAILURE = "[Auth] Login Failure";
export const LOGIN_REDIRECT = "[Auth] Login Redirect";

export class Login implements Action {
    readonly type = LOGIN;

    constructor(public payload: { username: string, password: string }) {}
}

export class LoginExternal implements Action {
    readonly type = LOGIN_EXTERNAL;
}

export class LoginSuccess implements Action {
    readonly type = LOGIN_SUCCESS;

    constructor(public payload: { token: string, redirect: boolean }) {}
}

export class LoginFailure implements Action {
    readonly type = LOGIN_FAILURE;

    constructor(public payload: { message: string }) {}
}

export class LoginRedirect implements Action {
    readonly type = LOGIN_REDIRECT;
}

export type LoginActions =
    | Login
    | LoginExternal
    | LoginSuccess
    | LoginFailure
    | LoginRedirect;
