import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, filter, take } from "rxjs/operators";

// Root
import { AppStore } from "../root";

// Models
import { ApiResponse } from "../../../feature/shared/models/api/api-response.model";

// Apis
import { Api } from "../../../feature/shared/services/api/api";

@Injectable()
export class AuthApi extends Api {
  url: string;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly appStore: AppStore
    ) {
      super();

    this.appStore.environment
      .subscribe(configuration => this.url = configuration ? configuration.walletUrl : "");
    }

    login(username: string, password: string) : Observable<string> {
        return this.httpClient
          .post<ApiResponse<string>>(`/authorization/login`, { username, password })
          .pipe(map(result => result.Result));
    }

    logout(): Observable<void> {
      return this.httpClient
        .post<ApiResponse<void>>(`/authorization/logout`, {})
        .pipe(map(response => response.Result));
    }

    register(username: string, email: string, password: string, confirmPassword: string): Observable<boolean> {
        return this.httpClient
          .post<ApiResponse<boolean>>(`/authorization/register`, { username, email, password, confirmPassword })
          .pipe(map(response => response.Result));
    }
}
