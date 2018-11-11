import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

// Modules
import { SharedModule } from "../../feature/shared/shared.module";

// Containers
import { AuthLoginContainer } from "./containers/auth-login/auth-login.container";
import { AuthLoginExternalContainer } from "./containers/auth-login/auth-login-external.container";
import { AuthLoginExternalCallbackContainer } from "./containers/auth-login/auth-login-external-callback.container";
import { AuthLoginExternalRenewalContainer } from "./containers/auth-login/auth-login-external-renewal.container";
import { AuthLogoutContainer } from "./containers/auth-logout/auth-logout.container";
import { AuthLogoutExternalContainer } from "./containers/auth-logout/auth-logout-external.container";
import { AuthRegisterContainer } from "./containers/auth-register/auth-register.container";

// Services
import { AuthApi } from "./services/auth.api";

// Store
import { AuthStore } from "./store/auth.store";

@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      FormsModule,
      ReactiveFormsModule,

      SharedModule,
    ],
    declarations: [
      // Containers
      AuthLoginContainer,
      AuthLoginExternalContainer,
      AuthLoginExternalCallbackContainer,
      AuthLoginExternalRenewalContainer, 
      AuthLogoutContainer,
      AuthLogoutExternalContainer,
      AuthRegisterContainer
    ]
})
export class AuthSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthSharedModule,
      providers: [
        // Apis
        AuthApi,

        // Store
        AuthStore
      ]
    };
  }
}
