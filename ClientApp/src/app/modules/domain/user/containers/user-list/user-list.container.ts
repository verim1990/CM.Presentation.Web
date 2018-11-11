import { Component } from "@angular/core";
import { Observable } from "rxjs";

// Models
import { User } from "../../models/user.model";

// Services
import { UserApi } from "../../services/user.api";

// Stores
import { UserStore } from "../../store/user.store";
import { GetUserListRequest } from "../../models/requests/getUserList.request";

@Component({
    selector: "app-user-list",
    templateUrl: "./user-list.container.html",
    styleUrls: ["./user-list.container.scss"]
})
export class UserListContainer {
    users: Observable<User[]>;

    constructor(
      private readonly userApi: UserApi,
      private readonly userStore: UserStore
    ) {
  }

  getUsers = (getUserListRequest: GetUserListRequest) => {
    return this.userApi.getAll(getUserListRequest);
  }
}
