import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { FcRowComponent } from './components/fc-row/fc-row.component';
import { FcPageComponent } from './components/fc-page/fc-page.component';
import { FcLoaderComponent } from './components/fc-loader/fc-loader.component';
import { FcNotificationComponent } from './components/fc-notification/fc-notification.component';
import { FcNotificationsComponent } from './components/fc-notifications/fc-notifications.component';
import { FcGridComponent } from './components/fc-grid/fc-grid.component';
import { FcGridPagerComponent } from './components/fc-grid/fc-grid-pager/fc-grid-pager.component';
import { FcGridTextFilterComponent } from './components/fc-grid/fc-grid-filters/fc-grid-text-filter/fc-grid-text-filter.component';

// Directives
import { FcRowFocusDirective } from './directives/fc-row-focus/fc-row-focus.directive';

// Services
import { ArrayHelperService } from './services/helpers/array-helper.service';
import { BusService } from './services/bus/bus.service';
import { MathService } from './services/math/math.service';
import { NotificationsService } from './services/notifications/notifications.service';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule
    ],
  declarations: [
      FcRowFocusDirective,
      FcRowComponent,
      FcPageComponent,
      FcLoaderComponent,
      FcGridComponent,
      FcGridPagerComponent,
      FcGridTextFilterComponent,
      FcNotificationComponent,
      FcNotificationsComponent
    ],
    exports: [
      FcRowFocusDirective,
      FcRowComponent,
      FcPageComponent,
      FcLoaderComponent,
      FcGridComponent,
      FcGridPagerComponent,
      FcGridTextFilterComponent,
      FcNotificationComponent,
      FcNotificationsComponent
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                ArrayHelperService,
                BusService,
                MathService,
                NotificationsService,
            ]
        };
    }
}
