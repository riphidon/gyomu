import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IError } from '../../event-notifiers/error/error';

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
export class LoginComponent implements OnChanges {
    @Input() loginError: IError | null | undefined = null;
    @Output() userLogger = new EventEmitter<ILoginCredentials>();

    loginForm = new FormGroup({
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    });

    showLoginError = false;
    errorMsg = '';

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['loginError'] && this.loginError) {
            this.handleLoginError(this.loginError);
        }
    }

    login(): void {
        let creds: ILoginCredentials = {
            email: this.loginForm.controls[login.email].value as string,
            password: this.loginForm.controls[login.password].value as string,
        };
        this.userLogger.emit(creds);
    }

    handleLoginError(err: IError) {
        if (err === null) {
            this.showLoginError = false;
        } else {
            switch (err.code) {
                case 404:
                    this.errorMsg = 'Email adress not found.';
                    break;
                case 200:
                    this.errorMsg = 'The given password is incorrect.';
                    break;
                default:
                    this.errorMsg = 'An error ocurred during login.';
                    break;
            }
            this.showLoginError = true;
        }
    }
}
