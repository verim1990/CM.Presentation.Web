import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

// Models
import { User } from "../models/user.model";

// Store
import * as Reducers from "./reducers";
import * as actions from "./actions";

@Injectable()
export class UserStore {
    private usersLoaded = false;

    users: Observable<User[]>;

    constructor(
        private readonly store: Store<Reducers.State>,
    ) {
      this.users = this.store.select(Reducers.getUsers);
          //.pipe(tap(() => this.loadUsers()));
    }

    private loadUsers() {
        if (!this.usersLoaded) {
          this.store.dispatch(new actions.usersActions.UsersLoad());
            this.usersLoaded = true;
        }
    }
}
