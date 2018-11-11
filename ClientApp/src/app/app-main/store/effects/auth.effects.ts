import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Effect, Actions } from '@ngrx/effects';

// Imports
import { NotificationsService } from '../../imports';

// Actions
import * as actions from './../actions';

@Injectable()
export class AuthEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly router: Router,
        private readonly notificationsService: NotificationsService
    ) {
    }

    @Effect({ dispatch: false })
    unauthorized$ = this.actions$
        .ofType<actions.authActions.Unauthorized>(actions.authActions.UNAUTHORIZED)
        .pipe(
          tap(() => {
            this.notificationsService.add('error', 'Error', 'Unauthorized');
            this.router.navigate(['/auth/login']);
          })
        );

    @Effect({ dispatch: false })
    rootRedirect$ = this.actions$
        .ofType<actions.authActions.RootRedirect>(actions.authActions.ROOT_REDIRECT)
        .pipe(
          tap(action => this.router.navigate(['/']))
        );

    @Effect({ dispatch: false })
    sessionExpired$ = this.actions$
        .ofType<actions.authActions.SessionExpired>(actions.authActions.SESSION_EXPIRED)
        .pipe(
          tap(() => {
            this.notificationsService.add('error', 'Error', 'Session expired');
            this.router.navigate(['/auth/login']);
          }),
        );
}
