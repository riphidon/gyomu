import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface ILoginCredentials {
    email: string;
    password: string;
}

enum login {
    email = 'email',
    password = 'password',
}

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    @Output() userLogger = new EventEmitter<ILoginCredentials>();

    loginForm = new FormGroup({
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    });

    constructor() {}

    login(): void {
        let creds: ILoginCredentials = {
            email: this.loginForm.controls[login.email].value,
            password: this.loginForm.controls[login.password].value,
        };
        this.userLogger.emit(creds);
    }
}
