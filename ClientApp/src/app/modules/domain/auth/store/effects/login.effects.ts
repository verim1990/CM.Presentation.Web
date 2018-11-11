import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { catchError, exhaustMap, map, tap, filter } from 'rxjs/operators';
import { Effect, Actions } from "@ngrx/effects";
import { Action } from "@ngrx/store";

// Root
import { AuthService, AppStore, NotificationsService } from "../../root";

// Apis
import { AuthApi } from "../../services/auth.api";

// Actions
import * as actions from "./../actions";

@Injectable()
export class LoginEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly router: Router,
        private readonly authApi: AuthApi,
        private readonly authService: AuthService,
        private readonly appStore: AppStore,
        private readonly notificationService: NotificationsService,
    ) {
    }
    
    @Effect()
    login$ = this.actions$
        .ofType<actions.loginActions.Login>(actions.loginActions.LOGIN)
        .pipe(
          exhaustMap(action => this.authApi.login(action.payload.username, action.payload.password)),
          map(token => new actions.loginActions.LoginSuccess({ token, redirect: true })),
          catchError(error => of(new actions.loginActions.LoginFailure(error)))
        );

    @Effect()
    loginExternal$ = this.actions$
        .ofType<actions.loginActions.LoginExternal>(actions.loginActions.LOGIN_EXTERNAL)
        .pipe(
        exhaustMap(action => this.authService.loginExternal()),
          catchError(error => of(new actions.loginActions.LoginFailure({ message: "Login failed" })))
        );

    @Effect({ dispatch: false })
    loginSuccess$ = this.actions$
        .ofType<actions.loginActions.LoginSuccess>(actions.loginActions.LOGIN_SUCCESS)
        .pipe(
          tap(action => {
            if (action.payload.redirect) {
              this.router.navigate(["/"]);
            }

            this.appStore.authorized();
          })
        );

    @Effect({ dispatch: false })
    loginFailure$ = this.actions$
        .ofType<actions.loginActions.LoginFailure>(actions.loginActions.LOGIN_FAILURE)
        .pipe(
          tap(action => this.notificationService.add("error", "Error", action.payload.message))
        );

    @Effect({ dispatch: false })
    loginRedirect$ = this.actions$
        .ofType<actions.loginActions.LoginRedirect>(actions.loginActions.LOGIN_REDIRECT)
        .pipe(
          tap(action => this.router.navigate(["/auth/login"]))
        );
}
