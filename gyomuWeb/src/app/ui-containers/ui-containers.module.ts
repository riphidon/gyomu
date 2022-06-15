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

@NgModule({
    declarations: [
        MenuComponent,
        NavBarComponent,
        ErrorComponent,
        SuccessComponent,
        TagsBoxComponent,
        LoginComponent,
        LogoutComponent,
        RegisterComponent,
        BaseRegistrationComponent,
    ],
    imports: [CommonModule, SharingModule],
    exports: [MenuComponent, NavBarComponent],
})
export class UiContainersModule {}
