import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { tap, map, mergeMap, distinct, bufferCount } from 'rxjs/operators';

// Services
import { AuthService } from '../../services/auth/auth.service';

// Actions
import * as actions from './../actions';

@Injectable()
export class StartupEffects {
    constructor(
      private readonly actions$: Actions,
      private readonly authService: AuthService
    ) {
    }

  private steps = [{
    action: new actions.configActions.EnvironmentLoad(),
    confirmation: actions.configActions.ENVIRONMENT_LOAD_COMPLETED
  }];

  @Effect()
  startupBegin$ = this.actions$
      .ofType<actions.startupActions.StartupBegin>(actions.startupActions.STARTUP_BEGIN)
      .pipe(
        mergeMap(action => this.steps.map(step => step.action))
  );

  @Effect()
  waitForActions$ = this.actions$
      .ofType(
        ...this.steps.map(step => step.confirmation)
      )
    .pipe(
      distinct(action => action.type),
      bufferCount(this.steps.length),
      map(action => new actions.startupActions.StartupEnd)
  );

  @Effect({ dispatch: false })
  startupEnd$ = this.actions$
    .ofType<actions.startupActions.StartupEnd>(actions.startupActions.STARTUP_END)
      .pipe(
        tap(() => this.authService.authorize().subscribe(() => { }))
      );
}
