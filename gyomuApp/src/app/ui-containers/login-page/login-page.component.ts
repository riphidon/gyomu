import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IGroupRegisterRequest } from '../access-forms/base-registration/base-registration-btn/base-registration-btn.component';
import { ILoginCredentials } from '../access-forms/login/login.component';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
    @Output() userLogger = new EventEmitter<ILoginCredentials>();
    @Output() groupRegister = new EventEmitter<IGroupRegisterRequest>();

    constructor() {}

    login(creds: ILoginCredentials): void {
        this.userLogger.emit(creds);
    }

    register(registerForm: IGroupRegisterRequest): void {
        this.groupRegister.emit(registerForm);
    }
}
