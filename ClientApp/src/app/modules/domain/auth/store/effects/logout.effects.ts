import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { catchError, map, exhaustMap, tap, switchMap, filter } from 'rxjs/operators';
import { Effect, Actions } from "@ngrx/effects";
import { Action } from "@ngrx/store";

// Root
import { AuthService, NotificationsService } from "../../root";

// Apis
import { AuthApi } from "../../services/auth.api";

// Actions
import * as actions from "./../actions";

@Injectable()
export class LogoutEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly router: Router,
        private readonly authApi: AuthApi,
        private readonly authService: AuthService,
        private readonly notificationService: NotificationsService,
    ) {
    }
    
    @Effect()
    logout$ = this.actions$
      .ofType<actions.logoutActions.Logout>(actions.logoutActions.LOGOUT)
        .pipe(
          exhaustMap(action => this.authApi.logout()),
          map(() => new actions.logoutActions.LogoutSuccess({ redirect: true })),
          catchError(error => of(new actions.logoutActions.LogoutFailure({ message: "Logout failed" })))
      );

    @Effect()
    logoutExternal$ = this.actions$
      .ofType<actions.logoutActions.LogoutExternal>(actions.logoutActions.LOGOUT_EXTERNAL)
      .pipe(
        exhaustMap(action => this.authService.logoutExternal()),
        catchError(error => of(new actions.logoutActions.LogoutFailure({ message: "Logout failed" })))
      );

    @Effect()
    logoutSuccess$ = this.actions$
        .ofType<actions.logoutActions.LogoutSuccess>(actions.logoutActions.LOGOUT_SUCCESS)
        .pipe(
          filter(action => action.payload.redirect),
          map(action => this.router.navigate(["/"]))
        );

    @Effect({ dispatch: false })
    logoutFailure$ = this.actions$
      .ofType<actions.logoutActions.LogoutFailure>(actions.logoutActions.LOGOUT_FAILURE)
      .pipe(
        tap(action => {
        console.log("tests");
        this.notificationService.add("error", "Error", action.payload.message)
        })
      );

    @Effect({ dispatch: false })
    logoutRedirect$ = this.actions$
        .ofType<actions.logoutActions.LogoutRedirect>(actions.logoutActions.LOGOUT_REDIRECT)
        .pipe(
          tap(() => this.router.navigate(["/auth/logout"]))
        );
}
