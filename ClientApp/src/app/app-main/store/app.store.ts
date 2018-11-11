import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

// Models
import { Environment } from '../models/config/environment.model';

// Store
import * as Reducers from './reducers';
import * as actions from './actions';

@Injectable()
export class AppStore {
    environment: Observable<Environment>;
    isAuthorized: Observable<boolean>;

    constructor(
        private readonly store: Store<Reducers.State>
    ) {
      this.isAuthorized = this.store.select(x => x.app.auth.isAuthorized);
      this.environment = this.store.select(x => x.app.config.environment);
  }

  startupBegin() {
    this.store.dispatch(new actions.startupActions.StartupBegin());
  }

  loadConfig() {
    this.store.dispatch(new actions.configActions.EnvironmentLoad());
  }

  authorized() {
    this.store.dispatch(new actions.authActions.Authorized());
  }

  unauthorized() {
    this.store.dispatch(new actions.authActions.Unauthorized());
  }

  sessionExpired() {
    this.store.dispatch(new actions.authActions.SessionExpired());
  }

  rootRedirect(token: string) {
    this.store.dispatch(new actions.authActions.RootRedirect());
  }
}
