import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Store
import { reducers } from './store';
import { AuthEffects, ConfigEffects, StartupEffects } from './store/effects';

@NgModule({
    imports: [
      StoreModule.forRoot(reducers.reducers, { metaReducers: reducers.metaReducers }),
      StoreRouterConnectingModule,
      StoreDevtoolsModule.instrument(),
      EffectsModule.forRoot([
        AuthEffects,
        ConfigEffects,
        StartupEffects
      ])
    ],
    exports: [
        StoreModule
    ]
})
export class AppMainStoreModule {
}
