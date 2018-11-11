// Models
import { Environment } from '../../models/config/environment.model';

// Actions
import * as actions from '../actions';

export interface State {
  environment: Environment | undefined;
}

export const initialState: State = {
  environment: undefined
};

export function reducer(state = initialState, action: actions.configActions.ConfigActions): State {
    switch (action.type) {
      case actions.configActions.ENVIRONMENT_LOAD_SUCCESS:
        return {
          ...state,
          environment: (action as actions.configActions.EnvironmentLoadSuccess).payload.environment,
        };

    default:
        return state;
    }
}
