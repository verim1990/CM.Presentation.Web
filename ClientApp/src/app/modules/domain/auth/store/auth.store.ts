import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

// Store
import * as Reducers from "./../store/reducers";
import * as actions from "./../store/actions";

@Injectable()
export class AuthStore {
    token: Observable<string | null>;
    loggedIn: Observable<boolean>;

    constructor(
        private readonly store: Store<Reducers.State>
    ) {
        this.token = this.store.select(Reducers.getToken);
        this.loggedIn = this.store.select(Reducers.getLoggedIn);
    }

    login(username: string, password: string) {
        this.store.dispatch(new actions.loginActions.Login({ username, password }));
    }

    loginExternal() {
      this.store.dispatch(new actions.loginActions.LoginExternal());
    }

    loginSuccess(token: string, redirect: boolean = true) {
      this.store.dispatch(new actions.loginActions.LoginSuccess({ token, redirect }));
    }

    loginRedirect() {
      this.store.dispatch(new actions.loginActions.LoginRedirect());
    }

    logout() {
      this.store.dispatch(new actions.logoutActions.Logout());
    }

    logoutExternal() {
        this.store.dispatch(new actions.logoutActions.LogoutExternal());
    }

    logoutRedirect() {
        this.store.dispatch(new actions.logoutActions.LogoutRedirect());
    }

    register(username: string, email: string, password: string, confirmPassword: string) {
      this.store.dispatch(new actions.registerActions.Register({ username, email, password, confirmPassword }));
    }
}
