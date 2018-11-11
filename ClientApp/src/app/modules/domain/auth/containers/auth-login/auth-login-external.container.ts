import { Component, OnInit } from "@angular/core";

// Store
import { AuthStore } from "./../../store/auth.store";

@Component({
    selector: "auth-login-external",
    template: "<fc-loader overlay='true' text='Logging in...'></fc-loader>"
})
export class AuthLoginExternalContainer implements OnInit {
    constructor(
        private readonly authStore: AuthStore
    ) {
    }

    ngOnInit() {
        this.authStore.loginExternal();
    }
}
