import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { catchError, map, exhaustMap, tap } from 'rxjs/operators';
import { Effect, Actions } from "@ngrx/effects";
import { Action } from "@ngrx/store";

// Root
import { NotificationsService } from "../../root";

// Apis
import { AuthApi } from "../../services/auth.api";

// Actions
import * as actions from "./../actions";

@Injectable()
export class RegisterEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly authApi: AuthApi,
        private readonly notificationService: NotificationsService,
    ) {
    }

    @Effect()
    register$ = this.actions$
        .ofType<actions.registerActions.Register>(actions.registerActions.REGISTER)
        .pipe(
          exhaustMap(action => this.authApi.register(
            action.payload.username,
            action.payload.email,
            action.payload.password,
            action.payload.confirmPassword)),
          map(() => new actions.registerActions.RegisterSuccess()),
          catchError((error: any) => of(new actions.registerActions.RegisterFailure(error)))
        );

    @Effect()
    registerSuccess$ = this.actions$
        .ofType<actions.registerActions.RegisterSuccess>(actions.registerActions.REGISTER_SUCCESS)
        .pipe(
          map(action => new actions.loginActions.LoginRedirect)
        );

    @Effect({ dispatch: false })
    registerFailure$ = this.actions$
      .ofType<actions.registerActions.RegisterFailure>(actions.registerActions.REGISTER_FAILURE)
      .pipe(
        tap(action => this.notificationService.add("error", "Error", action.payload.message))
      );
}
