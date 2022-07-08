import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { AngularDeviceInformationService } from 'angular-device-information';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { GyomuShellEffects } from './state/effects/gyomu-shell.effects';
import { HomeEffects } from './state/effects/home.effects';
import { GyomuReducer } from './state/reducers/gyomu-shell.reducer';
import { HomeReducer } from './state/reducers/home.reducer';
import { SharingModule } from './sharing/sharing.module';
import { UiContainersModule } from './ui-containers/ui-containers.module';
import { GyomuShellComponent } from './shells/gyomu-shell/gyomu-shell.component';
import { HomeShellComponent } from './shells/home-shell/home-shell.component';
import { ProjectsShellComponent } from './shells/projects-shell/projects-shell.component';
import { rootReducer } from './state/reducers/root.reducer';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AccessShellComponent } from './shells/access-shell/access-shell.component';
import { AuthenticationService } from './authentication.service';
import { RootEffects } from './state/effects/root.effects';

@NgModule({
    declarations: [
        AppComponent,
        AccessShellComponent,
        GyomuShellComponent,
        HomeShellComponent,
        ProjectsShellComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        SharingModule,
        UiContainersModule,
        IonicModule.forRoot(),
        StoreModule.forRoot(
            {
                rootState: rootReducer,
                gyomuState: GyomuReducer,
                homeState: HomeReducer,
            },
            {}
        ),
        EffectsModule.forRoot([GyomuShellEffects, HomeEffects, RootEffects]),
        EntityDataModule.forRoot(entityConfig),
        StoreDevtoolsModule.instrument({
            maxAge: 25,
            logOnly: environment.production,
        }),
        JwtModule,
    ],
    providers: [
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        AngularDeviceInformationService,
        AuthenticationService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
