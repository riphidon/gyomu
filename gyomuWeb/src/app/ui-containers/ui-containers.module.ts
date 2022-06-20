import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ErrorComponent } from './event-notifiers/error/error.component';
import { SuccessComponent } from './event-notifiers/success/success.component';
import { SharingModule } from '../sharing/sharing.module';
import { TagsBoxComponent } from './tags-box/tags-box.component';
import { LoginComponent } from './access-forms/login/login.component';
import { LogoutComponent } from './access-forms/logout/logout.component';
import { RegisterComponent } from './access-forms/register/register.component';
import { BaseRegistrationComponent } from './access-forms/base-registration/base-registration.component';
import { BaseRegistrationBtnComponent } from './access-forms/base-registration/base-registration-btn/base-registration-btn.component';
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { HomeLogScreenComponent } from './home-log-screen/home-log-screen.component';

@NgModule({
    declarations: [
        BaseRegistrationComponent,
        BaseRegistrationBtnComponent,
        ErrorComponent,
        HomeLogScreenComponent,
        HomeScreenComponent,
        LoginComponent,
        LogoutComponent,
        MenuComponent,
        NavBarComponent,
        RegisterComponent,
        SuccessComponent,
        TagsBoxComponent,
    ],
    imports: [CommonModule, SharingModule],
    exports: [
        BaseRegistrationComponent,
        BaseRegistrationBtnComponent,
        ErrorComponent,
        HomeLogScreenComponent,
        HomeScreenComponent,
        LoginComponent,
        LogoutComponent,
        MenuComponent,
        NavBarComponent,
        RegisterComponent,
        SuccessComponent,
        TagsBoxComponent,
    ],
})
export class UiContainersModule {}
