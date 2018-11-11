// Actions
import * as actions from "../actions";

export interface State {
    registered: boolean;
}

export const initialState: State = {
    registered: false
};

export function reducer(state = initialState, action: actions.registerActions.RegisterActions): State {
    switch (action.type) {
      case actions.registerActions.REGISTER_SUCCESS:
        return {
            ...state,
            registered: true
        };

    default:
        return state;
    }
}

export const getRegistered = (state: State) => state.registered;
