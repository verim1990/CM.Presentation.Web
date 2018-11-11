import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

// Constants
import { USER_CONSTANTS_MODULE_NAME } from "./user.contants";

// Modules
import { UserSharedModule } from "../user/user.shared.module";

// Store
import { reducers } from "./store";
import { UsersEffects } from "./store/effects";

@NgModule({
    imports: [
      StoreModule.forFeature(USER_CONSTANTS_MODULE_NAME, reducers.reducers),
      EffectsModule.forFeature([
        UsersEffects
      ]),

      UserSharedModule.forRoot()
    ]
})
export class UserStoreModule {
}
