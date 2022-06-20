import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GyomuShellComponent } from './shells/gyomu-shell/gyomu-shell.component';
import { HomeShellComponent } from './shells/home-shell/home-shell.component';
import { UiContainersModule } from './ui-containers/ui-containers.module';
import { SharingModule } from './sharing/sharing.module';
import { GyomuReducer } from './state/reducers/gyomu-shell.reducer';
import { HomeReducer } from './state/reducers/home.reducer';
import { GyomuShellEffects } from './state/effects/gyomu-shell.effects';
import { HomeEffects } from './state/effects/home.effects';

@NgModule({
    declarations: [AppComponent, GyomuShellComponent, HomeShellComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        StoreModule.forRoot(
            {
                gyomuState: GyomuReducer,
                homeState: HomeReducer,
            },
            {}
        ),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
        }),
        EffectsModule.forRoot([GyomuShellEffects, HomeEffects]),
        StoreRouterConnectingModule.forRoot(),
        SharingModule,
        UiContainersModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
