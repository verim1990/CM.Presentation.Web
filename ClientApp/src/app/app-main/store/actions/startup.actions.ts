import { Action } from '@ngrx/store';

export const STARTUP_BEGIN = '[Main] [Startup] Begin';
export const STARTUP_END = '[Main] [Startup] End';

export class StartupBegin implements Action {
  readonly type = STARTUP_BEGIN;
}

export class StartupEnd implements Action {
  readonly type = STARTUP_END;
}

export type StartupActions =
  | StartupBegin
  | StartupEnd;
