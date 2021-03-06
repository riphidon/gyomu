import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
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
import { LoginPageComponent } from './login-page/login-page.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
    declarations: [
        BaseRegistrationComponent,
        BaseRegistrationBtnComponent,
        ErrorComponent,
        LoginPageComponent,
        HomeScreenComponent,
        LoginComponent,
        LogoutComponent,
        MenuComponent,
        RegisterComponent,
        SuccessComponent,
        TagsBoxComponent,
    ],
    imports: [CommonModule, SharingModule, IonicModule],
    exports: [
        BaseRegistrationComponent,
        BaseRegistrationBtnComponent,
        ErrorComponent,
        LoginPageComponent,
        HomeScreenComponent,
        LoginComponent,
        LogoutComponent,
        MenuComponent,
        RegisterComponent,
        SuccessComponent,
        TagsBoxComponent,
    ],
})
export class UiContainersModule {}
