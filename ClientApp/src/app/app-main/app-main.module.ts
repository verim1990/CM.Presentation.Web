import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Modules
import { SharedModule } from './imports';
import { AppMainStoreModule } from './app-main.store.module';

// Services
import { ConfigApi } from './services/config/config.api';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './services/auth/auth.guard';
import { AuthInterceptor } from './services/auth/auth.interceptor';

// Containers
import { AppMainHomeComponent } from './containers/app-main-home/app-main-home.component';

// Components
import { AppMainComponent } from './app-main.component';
import { AppMainMenuComponent } from './components/app-main-menu/app-main-menu.component';

// Store
import { AppStore } from './store';
import { AuthMockService } from './services/auth/auth.mock.service';
import { AuthRealService } from './services/auth/auth.real.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    HttpClientModule,
    RouterModule,

    // Local modules
    AppMainStoreModule,

    // Edger modules
    SharedModule.forRoot()
  ],
  declarations: [
    // Containers
    AppMainHomeComponent,

    // Components
    AppMainComponent,
    AppMainMenuComponent,
  ],
  exports: [
    AppMainComponent,
    AppMainMenuComponent
  ],
  providers: [
    // Services
    ConfigApi,
    AuthGuard,
    // AuthService,

    // Store
    AppStore,

    // Others
    {
      provide: AuthService,
      //useClass: window ? AuthRealService : AuthMockService
      useClass: AuthRealService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AppMainModule {
}
