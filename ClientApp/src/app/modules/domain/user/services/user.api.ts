import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, switchMap, tap, filter, take } from "rxjs/operators";

// Root
import { AppStore } from "../root";

// Models
import { ApiResponse } from "../../../feature/shared/models/api/api-response.model";
import { ApiResult } from "../../../feature/shared/models/api/results/api-result.model";
import { ApiPaginatedResult } from "../../../feature/shared/models/api/results/api-paginated-result.model";
import { User } from "./../models/user.model";
import { GetUserListRequest } from "../models/requests/getUserList.request";
import { GetUserRequest } from "../models/requests/getUser.request";
import { CreateUserResult } from "../models/results/createUser.result";
import { GetUserListResult } from "../models/results/getUserList.result";
import { GetUserResult } from "../models/results/getUser.result";

// Apis
import { Api } from "../../../feature/shared/services/api/api";

@Injectable()
export class UserApi extends Api {
    userUrl: string;
    userViewsUrl: string;

    constructor(
      private readonly httpClient: HttpClient,
      private readonly appStore: AppStore
    ) {
      super();

      this.appStore.environment
        .subscribe(configuration => {
          this.userUrl = configuration ? configuration.walletUrl : "";
          this.userViewsUrl = configuration ? configuration.walletViewsUrl : "";
        });
    }

    getAll(request: GetUserListRequest): Observable<GetUserListResult> {
      return this.httpClient.post<ApiResponse<GetUserListResult>>(`${this.userViewsUrl}/user/all`, request)
        .pipe(map(response => response.Result));
    }

    get(request: GetUserRequest): Observable<GetUserResult> {
      return this.httpClient.get<ApiResponse<GetUserResult>>(`${this.userViewsUrl}/user/${request.id}`)
        .pipe(map(response => response.Result));
    }

    create(user: User): Observable<number> {
      return this.httpClient.post<ApiResponse<CreateUserResult>>(`${this.userUrl}/user`, user)
        .pipe(map(response => response.Result.id));
    }

    save(user: User): Observable<void> {
      return this.httpClient.put<ApiResponse<void>>(`${this.userUrl}/user/${user.id}`, user)
        .pipe(map(response => response.Result));
    }

    delete(id: string): Observable<void> {
      return this.httpClient.delete<ApiResponse<void>>(`${this.userUrl}/user/${id}`)
        .pipe(map(response => response.Result));
    }
}
