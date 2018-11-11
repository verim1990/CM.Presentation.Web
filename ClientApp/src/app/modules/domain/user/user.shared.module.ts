import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

// Modules
import { SharedModule } from "./../../feature/shared/shared.module";

// Containers
import { UserContainer } from "./containers/user/user.container";
import { UserListContainer } from "./containers/user-list/user-list.container";

// Components
import { UserSummaryComponent } from "./components/user-summary/user-summary.component";

// Services
import { UserApi } from "./services/user.api";

// Store
import { UserStore } from "./store/user.store";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,

        // Modules
        SharedModule.forRoot(),
    ],
    declarations: [
      // Containers
      UserContainer,
      UserListContainer,
    
      // Components
      UserSummaryComponent
    ]
})
export class UserSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: UserSharedModule,
      providers: [
        // Apis
        UserApi,

        // Store
        UserStore
      ]
    };
  }
}
