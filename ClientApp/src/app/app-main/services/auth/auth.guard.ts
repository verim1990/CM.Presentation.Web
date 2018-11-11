import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

// Services
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService
    ) {
    }

    canActivate(): Observable<boolean> {
      return this.authService
        .isLoggedIn()
        .pipe(take(1));
    }
}
