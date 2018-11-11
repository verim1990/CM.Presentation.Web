import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { map, exhaustMap } from "rxjs/operators";

// Models
import { User } from "./../../models/user.model";
import { GetUserListRequest } from "../../models/requests/getUserList.request";

// Apis
import { UserApi } from "../../services/user.api";

// Actions
import * as actions from "./../actions";

@Injectable()
export class UsersEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly userApi: UserApi
    ) {
    }

  @Effect() loadUsers = this.actions$
    .ofType<actions.usersActions.UsersLoad>(actions.usersActions.USERS_LOAD)
    .pipe(
      exhaustMap(action => this.userApi.getAll(new GetUserListRequest())),
      map(result => new actions.usersActions.UsersLoaded(result.items))
    );
}
