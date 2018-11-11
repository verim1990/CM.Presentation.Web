import { Component, OnInit, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";

// Models
import { Login, LoginFormModel } from "./../../models/login/login.model";

// Store
import { AuthStore } from "./../../store/auth.store";

// Services
import { NotificationsService } from "../../root";

@Component({
    selector: "auth-login",
    templateUrl: "./auth-login.container.html",
    styleUrls: ["./auth-login.container.scss"]
})
export class AuthLoginContainer implements OnInit {
    usernameFocusTrigger = new EventEmitter<boolean>();
    loginForm: FormGroup;
    submitted = false;

    constructor(
        private readonly formBuilder: FormBuilder,
      private readonly authStore: AuthStore,
      private readonly notificationsService: NotificationsService
    ) {
    }

    ngOnInit() {
        const configuration = LoginFormModel.getConfiguration();

        this.loginForm = this.formBuilder
            .group(configuration.config);
    }

    ngAfterViewInit() {
        this.usernameFocusTrigger.emit(true);
    }

    login(model: Login, isValid: boolean) {
        this.submitted = true;

        if (isValid) {
            this.authStore.login(model.username, model.password);
        }
    }
}
