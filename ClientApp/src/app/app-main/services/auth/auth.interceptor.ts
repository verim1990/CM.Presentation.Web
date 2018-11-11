import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, mergeMap } from 'rxjs/operators';

// Services
import { AuthService } from './auth.service';

// Store
import { AppStore } from '../../store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private appStore: AppStore
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.authUser
      .pipe(
        mergeMap(authUser => {
          if (authUser) {
            request = request.clone({
              setHeaders: {
                Authorization: `${authUser.token_type} ${authUser.access_token}`
              }
            });
          }

          return next.handle(request)
            .pipe(
              tap(event => {
                if (event instanceof HttpResponse) {
                }
              }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                  if (err.status === 401) {
                    this.appStore.sessionExpired();
                  }
                }
              })
            );
        })
      );
  }
}
