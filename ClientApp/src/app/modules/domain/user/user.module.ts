import { NgModule, ModuleWithProviders } from "@angular/core";

// Modules
import { AuthSharedModule } from "../auth/auth.shared.module";
import { UserRoutingModule } from "./user.routing.module";
import { UserStoreModule } from "./user.store.module";
import { UserSharedModule } from "./user.shared.module";

@NgModule({
    imports: [
      UserRoutingModule,
      UserStoreModule,
      AuthSharedModule.forRoot(),
      UserSharedModule.forRoot()
    ]
})
export class UserModule {
}
