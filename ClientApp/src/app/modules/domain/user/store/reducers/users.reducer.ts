import { ActionReducer } from "@ngrx/store";

// Models
import { User } from "./../../models/user.model";

// Redux
import * as fromUsersActions from "./../actions/users.actions";

// Store
export interface State {
    users: User[];
    loaded: boolean;
    loading: boolean;
}

export const initialState: State = {
    users: [],
    loaded: false,
    loading: false
}

// Reducer
export const reducer: ActionReducer<State> = (state: State = initialState, action: fromUsersActions.UsersActions): State => {
  switch (action.type) {
    case fromUsersActions.USERS_LOAD:
            return {
                ...state,
                loading: true
      };
    case fromUsersActions.USERS_LOADED:
            return {
                ...state,
                loaded: true,
              loading: false,
              users: (action as fromUsersActions.UsersLoaded).payload
            };
        default:
            return state;
    }
}

// Selectors
export const getLoaded = (state: State) => state.loaded;
export const getLoading = (state: State) => state.loading;
export const getUsers = (state: State) => state.users;
