import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IGroupRegisterRequest } from '../access-forms/base-registration/base-registration-btn/base-registration-btn.component';
import { IGroupRegister } from '../access-forms/base-registration/base-registration.component';
import { ILoginCredentials } from '../access-forms/login/login.component';

@Component({
    selector: 'app-home-log-screen',
    templateUrl: './home-log-screen.component.html',
    styleUrls: ['./home-log-screen.component.scss'],
})
export class HomeLogScreenComponent {
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
