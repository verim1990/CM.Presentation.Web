import { Component, OnInit, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { map } from "rxjs/operators";

// Root
import { BusService, NotificationsService } from "../../root";

// Models
import { User, UserFormModel } from "./../../models/user.model";
import { UserUpdatedMessage } from "./../../models/messages/user.message";
import { GetUserRequest } from "../../models/requests/getUser.request";

// Services
import { UserApi } from "../../services/user.api";

@Component({
    selector: "app-user",
    templateUrl: "./user.container.html",
    styleUrls: ["./user.container.scss"]
})
export class UserContainer implements OnInit {
    private usernameFocusTrigger = new EventEmitter<boolean>();

    submitted: boolean | null = null;
    loading: boolean | null = null;
    user = new User();
    userForm: FormGroup;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly formBuilder: FormBuilder,
        private readonly busService: BusService,
        private readonly notificationsService: NotificationsService,
        private readonly userApi: UserApi
    ) {
    }

    ngOnInit() {
        this.userForm = UserFormModel.getConfiguration(this.formBuilder);
        this.route.params.subscribe(params => this.load(params["id"]));
    }

    ngAfterViewInit() {
      if (this.loading == null) {
        this.usernameFocusTrigger.emit(true);
      }
    }

    load(userId: string) {
        if (userId) {
            this.loading = true;

            this.userApi
                .get(new GetUserRequest(userId))
                .pipe(map(result => result.user))
                .subscribe(this.loadCallback, this.errorCallback);
        } else {
            this.loadCallback();
        }
    }

    save() {
        this.submitted = true;

        if (this.userForm.valid) {
            this.loading = true;
            this.user = UserFormModel.toModel(this.userForm.value as UserFormModel, this.user);

          if (this.user.id) {
            this.userApi
              .save(this.user)
              .subscribe(this.saveCallback, this.errorCallback);
          } else {
            this.userApi
              .create(this.user)
              .subscribe(this.createCallback, this.errorCallback);
          }
        }
    }

    delete() {
        if (this.user.id) {
            this.userApi
                .delete(this.user.id)
                .subscribe(this.deleteCallback, this.errorCallback);
        }
    }

    private loadCallback = (user: User | null = null) => {
        if (user) {
            this.user = user;
            this.loading = false;
        }

        this.userForm.setValue(UserFormModel.fromModel(this.user), { onlySelf: true });
    };

    private createCallback = (id: number) => {
      this.loading = false;
      this.router.navigate([`user/${id}`], {});
    }

    private saveCallback = () => {
        this.busService.publish(new UserUpdatedMessage(this.user));
        this.loading = false;
    }

    private deleteCallback = () => {
        this.router.navigate([`user/list`]);
    }

    private errorCallback = (error: any) => {
        this.loading = false;
        this.notificationsService.add("error", "error", error);
    };
}
