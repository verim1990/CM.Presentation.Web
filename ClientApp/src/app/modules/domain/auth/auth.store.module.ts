import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

// Contants
import { AUTH_CONSTANTS_MODULE_NAME } from "./auth.contants";

// Modules
import { AuthSharedModule } from "./auth.shared.module";

// Store
import { reducers } from "./store";
import { LoginEffects, LogoutEffects, RegisterEffects } from "./store/effects";

@NgModule({
  imports: [
    StoreModule.forFeature(AUTH_CONSTANTS_MODULE_NAME, reducers.reducers),
    EffectsModule.forFeature([
      LoginEffects,
      LogoutEffects,
      RegisterEffects
    ]),
    ]
})
export class AuthStoreModule {
}
