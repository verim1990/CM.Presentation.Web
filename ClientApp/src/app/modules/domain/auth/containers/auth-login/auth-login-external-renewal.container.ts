import { Component, OnInit } from "@angular/core";

// Root
import { AuthService } from "../../root";

// Store
import { AuthStore } from "../../store/auth.store";

@Component({
    selector: "auth-login-external-renewal",
    template: "<fc-loader overlay='true' text='Logging in...'></fc-loader>"
})
export class AuthLoginExternalRenewalContainer implements OnInit {
    constructor(
      private readonly authService: AuthService,
      private readonly authStore: AuthStore
    ) {
    }

    ngOnInit() {
      this.authService.loginExternalRenewalComplete()
        .subscribe(user => this.authStore.loginSuccess(user.access_token));
    }
}
