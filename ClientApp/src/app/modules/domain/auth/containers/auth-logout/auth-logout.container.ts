import { Component, OnInit } from "@angular/core";

// Store
import { AuthStore } from "./../../store/auth.store";

@Component({
    selector: "auth-logout",
    templateUrl: "./auth-logout.container.html",
    styleUrls: ["./auth-logout.container.scss"]
})
export class AuthLogoutContainer implements OnInit {
    constructor(
      private readonly authStore: AuthStore
    ) {
    }

    ngOnInit() {
        this.authStore.logout();
    }
}
