import { Action } from '@ngrx/store';

// Models
import { User } from "./../../models/user.model";

export const USERS_LOAD = "[Users] Load users";
export const USERS_LOADED = "[Users] Loaded users";

export class UsersLoad implements Action {
    readonly type = USERS_LOAD;
}

export class UsersLoaded implements Action {
  readonly type = USERS_LOADED;
    
  constructor(public payload: User[]) { }
}

export type UsersActions =
    | UsersLoad
    | UsersLoaded
