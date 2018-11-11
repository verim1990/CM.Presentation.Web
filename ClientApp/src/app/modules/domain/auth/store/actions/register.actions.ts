import { Action } from "@ngrx/store";

export const REGISTER = "[Auth] Register";
export const REGISTER_SUCCESS = "[Auth] Register Success";
export const REGISTER_FAILURE = "[Auth] Register Failure";

export class Register implements Action {
    readonly type = REGISTER;

    constructor(public payload: { username: string, email: string, password: string, confirmPassword: string }) {}
}

export class RegisterSuccess implements Action {
    readonly type = REGISTER_SUCCESS;
}

export class RegisterFailure implements Action {
    readonly type = REGISTER_FAILURE;

    constructor(public payload: { message: string }) { }
}

export type RegisterActions = 
    | Register
    | RegisterSuccess
    | RegisterFailure;
