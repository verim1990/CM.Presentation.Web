import { Injectable } from '@angular/core';
import { Observable, empty, of } from 'rxjs';

// Models
import { AuthUser } from '../../models/auth/auth-user.model';

// Services
import { AuthService } from './auth.service';

@Injectable()
export class AuthMockService implements AuthService {
  public authUser: Observable<AuthUser>;

  authorize(): Observable<void> {
    return empty();
  }
  isLoggedIn(): Observable<boolean> {
    return of(false);
  }
  loginExternal(): Observable<boolean> {
    return of(false);
  }
  loginExternalComplete(): Observable<any> {
    return of({});
  }
  loginExternalRenewal(): Observable<any> {
    return of({});
  }
  loginExternalRenewalComplete(): Observable<any> {
    return of({});
  }
  logoutExternal(): Observable<void> {
    return empty();
  }
}
