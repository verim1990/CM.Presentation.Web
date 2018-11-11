import { Component, OnInit } from "@angular/core";

// Store
import { AuthStore } from "./../../store/auth.store";

@Component({
    selector: "auth-logout-external",
    template: "<fc-loader overlay='true' text='Logging out...'></fc-loader>"
})
export class AuthLogoutExternalContainer implements OnInit {
    constructor(
      private readonly authStore: AuthStore
    ) {
    }

    ngOnInit() {
        this.authStore.logoutExternal();
    }
}
