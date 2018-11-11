import { Action } from '@ngrx/store';

// Models
import { Environment } from '../../models/config/environment.model';

export const ENVIRONMENT_LOAD = '[Main] [Config] Environment Load';
export const ENVIRONMENT_LOAD_SUCCESS = '[Main] [Config] Environment Load Success';
export const ENVIRONMENT_LOAD_FAILURE = '[Main] [Config] Environment Load Failure';
export const ENVIRONMENT_LOAD_COMPLETED = '[Main] [Config] Environment Load Completed';

export class EnvironmentLoad implements Action {
  readonly type = ENVIRONMENT_LOAD;
}

export class EnvironmentLoadSuccess implements Action {
  readonly type = ENVIRONMENT_LOAD_SUCCESS;

  constructor(public payload: { environment: Environment }) { }
}

export class EnvironmentLoadFailure implements Action {
  readonly type = ENVIRONMENT_LOAD_FAILURE;
}

export class EnvironmentLoadCompleted implements Action {
  readonly type = ENVIRONMENT_LOAD_COMPLETED;

  constructor(public payload: { isSuccess: boolean }) { }
}

export type ConfigActions =
  | EnvironmentLoad
  | EnvironmentLoadSuccess
  | EnvironmentLoadFailure
  | EnvironmentLoadCompleted;
