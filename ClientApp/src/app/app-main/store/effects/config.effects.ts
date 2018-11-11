import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap, timeout } from 'rxjs/operators';
import { Effect, Actions } from '@ngrx/effects';

// Imports
import { NotificationsService } from '../../imports';

// Apis
import { ConfigApi } from '../../services/config/config.api';

// Actions
import * as actions from './../actions';

@Injectable()
export class ConfigEffects {
    constructor(
      private readonly actions$: Actions,
        private readonly configApi: ConfigApi,
        private readonly notificationsService: NotificationsService
    ) {
    }

    @Effect()
    environmentLoad$ = this.actions$
        .ofType<actions.configActions.EnvironmentLoad>(actions.configActions.ENVIRONMENT_LOAD)
        .pipe(
          exhaustMap(action => this.configApi.getEnvironment()),
          map(environment => new actions.configActions.EnvironmentLoadSuccess({ environment })),
          catchError(error => of(new actions.configActions.EnvironmentLoadFailure()))
        );

  @Effect()
    environmentLoadSuccess$ = this.actions$
        .ofType<actions.configActions.EnvironmentLoadSuccess>(actions.configActions.ENVIRONMENT_LOAD_SUCCESS)
        .pipe(
          tap(() => this.notificationsService.add('success', 'Success', 'Environment load success')),
          map(action => new actions.configActions.EnvironmentLoadCompleted({ isSuccess: true }))
        );

  @Effect()
    environmentLoadFailure$ = this.actions$
      .ofType<actions.configActions.EnvironmentLoadFailure>(actions.configActions.ENVIRONMENT_LOAD_FAILURE)
      .pipe(
        tap(() => this.notificationsService.add('error', 'Error', 'Environment load failure')),
        map(action => new actions.configActions.EnvironmentLoadCompleted({ isSuccess: false }))
      );
}
