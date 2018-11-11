// Actions
import * as actions from "../actions";

export interface State {
}

export const initialState: State = {
};

export function reducer(state = initialState, action: actions.logoutActions.LogoutActions): State {
  switch (action.type) {
    default:
      return initialState;
  }
}
