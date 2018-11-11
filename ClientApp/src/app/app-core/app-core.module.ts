import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { AppMainModule } from '../app-main/app-main.module';

// Components
import { AppCoreComponent } from './app-core.component';
import { AppCoreBodyComponent } from './components/app-core-body/app-core-body.component';
import { AppCoreFooterComponent } from './components/app-core-footer/app-core-footer.component';
import { AppCoreHeaderComponent } from './components/app-core-header/app-core-header.component';

@NgModule({
  imports: [
    CommonModule,

    // Edger modules
    AppMainModule
  ],
  declarations: [
    AppCoreComponent,
    AppCoreBodyComponent,
    AppCoreFooterComponent,
    AppCoreHeaderComponent
  ],
  exports: [
    AppCoreComponent
  ],
  providers: [
  ]
})
export class AppCoreModule {
}
