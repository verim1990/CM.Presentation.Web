import { NgModule, ModuleWithProviders } from "@angular/core";

// Modules
import { AuthRoutingModule } from "./auth.routing.module";
import { AuthSharedModule } from "./auth.shared.module";
import { AuthStoreModule } from "./auth.store.module";

@NgModule({
    imports: [
      AuthRoutingModule,
      AuthStoreModule,
      AuthSharedModule.forRoot(),
    ]
})
export class AuthModule {
}
