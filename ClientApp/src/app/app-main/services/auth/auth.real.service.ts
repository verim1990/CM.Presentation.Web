import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, exhaustMap, switchMap, tap, timeout, shareReplay, filter, take } from 'rxjs/operators';

// Models
import { AuthUser } from '../../models/auth/auth-user.model';

// Services
import { AuthManager } from './auth.manager';
import { AuthService } from './auth.service';

// Store
import { AppStore } from '../../store/app.store';

@Injectable()
export class AuthRealService implements AuthService {
  private authManager: Observable<AuthManager>;
  public authUser: Observable<AuthUser>;

  constructor(
    private readonly appStore: AppStore
  ) {
    this.authManager = this.appStore.environment
      .pipe(
        filter(environment => !!environment),
        take(1),
        map(environment => {
          return new AuthManager(environment);
        }),
        shareReplay(),
    );
    this.authUser = this.authManager
        .pipe(
          exhaustMap(authManager => from(authManager.getUser())),
        );
  }

  authorize(): Observable<void> {
    return this.authUser
      .pipe(
      map(user => {
          if (user && user.access_token) {
            this.appStore.authorized();
          }
        })
      );
  }

  isLoggedIn(): Observable<boolean> {
    return this.appStore.isAuthorized
      .pipe(
        switchMap(isAuthorized => this.authUser
          .pipe(
            tap(user => {
              if (user && user.expired) {
                this.appStore.sessionExpired();
              }

              if (!isAuthorized) {
                if (user && user.access_token) {
                  this.appStore.authorized();
                } else {
                  this.appStore.unauthorized();
                }
              }
            }),
            map(user => isAuthorized || (user && user.access_token.length > 0))
          ))
      );
  }

  loginExternal(): Observable<boolean> {
    return this.authManager
      .pipe(
        timeout(3000),
        exhaustMap(authManager => from(authManager.signinRedirect()))
      );
  }

  loginExternalComplete() {
    return this.authManager
      .pipe(
        timeout(3000),
        exhaustMap(authManager => from(authManager.signinRedirectCallback())),
      );
  }

  loginExternalRenewal() {
    return this.authManager
      .pipe(
        timeout(3000),
        exhaustMap(authManager => from(authManager.signinSilent()))
      );
  }

  loginExternalRenewalComplete() {
    return this.authManager
      .pipe(
        timeout(3000),
        exhaustMap(authManager => from(authManager.signinSilentCallback()))
      );
  }

  logoutExternal(): Observable<void> {
    return this.authManager
      .pipe(
        timeout(3000),
        exhaustMap(authManager => from(authManager.signoutRedirect()))
      );
  }
}
