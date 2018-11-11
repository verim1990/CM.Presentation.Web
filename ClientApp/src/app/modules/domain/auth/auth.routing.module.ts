import { Routes, RouterModule } from "@angular/router";

// Components
import { AuthLoginContainer } from "./containers/auth-login/auth-login.container";
import { AuthLoginExternalContainer } from "./containers/auth-login/auth-login-external.container";
import { AuthLoginExternalCallbackContainer } from "./containers/auth-login/auth-login-external-callback.container";
import { AuthLoginExternalRenewalContainer } from "./containers/auth-login/auth-login-external-renewal.container";
import { AuthLogoutContainer } from "./containers/auth-logout/auth-logout.container";
import { AuthLogoutExternalContainer } from "./containers/auth-logout/auth-logout-external.container";
import { AuthRegisterContainer } from "./containers/auth-register/auth-register.container";

const routes: Routes = [
     { path: "", redirectTo: "login", pathMatch: "full" },

     { path: "login", component: AuthLoginContainer },
     { path: "logout", component: AuthLogoutContainer },
     { path: "register", component: AuthRegisterContainer },

     { path: "loginExt", component: AuthLoginExternalContainer },
     { path: "logoutExt", component: AuthLogoutExternalContainer },
     { path: "callback", component: AuthLoginExternalCallbackContainer },
     { path: "renewal", component: AuthLoginExternalRenewalContainer }
];
 
export const AuthRoutingModule = RouterModule.forChild(routes);
