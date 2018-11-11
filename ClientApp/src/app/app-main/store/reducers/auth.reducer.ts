// Actions
import * as actions from '../actions';

export interface State {
  isAuthorized: boolean;
}

export const initialState: State = {
  isAuthorized: false
};

export function reducer(state = initialState, action: actions.authActions.AuthActions): State {
  switch (action.type) {
    case actions.authActions.AUTHORIZED:
        return {
          ...state,
          isAuthorized: true
        };

    default:
        return state;
    }
}
