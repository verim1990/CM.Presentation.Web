// Models
import { Environment } from '../../models/config/environment.model';

// Actions
import * as actions from '../actions';

export interface State {
  begin: Date | undefined;
  end: Date | undefined;
  steps: {
    configuration: boolean
  };
}

export const initialState: State = {
  begin: undefined,
  end: undefined,
  steps: {
    configuration: false
  }
};

export function reducer(state = initialState, action: actions.startupActions.StartupActions | actions.configActions.ConfigActions): State {
  switch (action.type) {
    case actions.startupActions.STARTUP_BEGIN:
        return {
          ...state,
          begin: new Date()
        };

    case actions.startupActions.STARTUP_END:
      return {
        ...state,
        end: new Date()
      };

    case actions.configActions.ENVIRONMENT_LOAD_COMPLETED:
      return {
        ...state,
        steps: {
          ...state.steps,
          configuration: (action as actions.configActions.EnvironmentLoadCompleted).payload.isSuccess
        }
      };
    default:
        return state;
    }
}
