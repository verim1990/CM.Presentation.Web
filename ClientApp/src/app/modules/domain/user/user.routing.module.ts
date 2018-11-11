import { Routes, RouterModule } from "@angular/router";

// Root
import { AuthGuard } from "../auth/root";

// Containers
import { UserContainer } from "./containers/user/user.container";
import { UserListContainer } from "./containers/user-list/user-list.container";

const routes: Routes = [
  { path: "", redirectTo: "list", pathMatch: "full" },

  { path: "list", canActivate: [AuthGuard], component: UserListContainer },
  { path: "new", canActivate: [AuthGuard], component: UserContainer },
  { path: ":id", canActivate: [AuthGuard], component: UserContainer }
];
 
export const UserRoutingModule = RouterModule.forChild(routes);
