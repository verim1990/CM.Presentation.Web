// Actions
import * as actions from "../actions";

export interface State {
    loggedIn: boolean;
    token: string | null;
}

export const initialState: State = {
    loggedIn: false,
    token: null,
};

export function reducer(state = initialState, action: actions.loginActions.LoginActions | actions.logoutActions.LogoutActions): State {
    switch (action.type) {
      case actions.loginActions.LOGIN_SUCCESS:
        return {
            ...state,
            loggedIn: true,
          token: (action as actions.loginActions.LoginSuccess).payload.token,
        };

      case actions.logoutActions.LOGOUT_SUCCESS:
        return initialState;

    default:
        return state;
    }
}

export const getLoggedIn = (state: State) => state.loggedIn;
export const getToken = (state: State) => state.token;
