import { Component, OnInit, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";

// Models
import { Register, RegisterFormModel } from "./../../models/register/register.model";

// Store
import { AuthStore } from "../../store/auth.store";

@Component({
    selector: "auth-register",
    templateUrl: "./auth-register.container.html",
    styleUrls: ["./auth-register.container.scss"]
})
export class AuthRegisterContainer implements OnInit {
    usernameFocusTrigger = new EventEmitter<boolean>();
    registerForm: FormGroup;
    submitted = false;

    constructor(
        private readonly router: Router,
        private readonly formBuilder: FormBuilder,
        private readonly authStore: AuthStore
    ) {
    }

    ngOnInit() {
        const configuration = RegisterFormModel.getConfiguration();

        this.registerForm = this.formBuilder
            .group(configuration.config, configuration.extra);
    }

    ngAfterViewInit() {
        this.usernameFocusTrigger.emit(true);
    }

    register(model: Register, isValid: boolean) {
        this.submitted = true;

        if (isValid) {
             this.authStore.register(model.username, model.email, model.password, model.confirmPassword);
        }
    }
}
