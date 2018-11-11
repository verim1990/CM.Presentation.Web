import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { AppMainHomeComponent } from './app-main/containers/app-main-home/app-main-home.component';

const routes: Routes = [
  { path: '', component: AppMainHomeComponent },
  { path: 'auth', loadChildren: './modules/domain/auth/auth.module#AuthModule' },
  { path: 'user', loadChildren: './modules/domain/user/user.module#UserModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
