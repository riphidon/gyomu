import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface IUserRegister {
    name: string;
    lastName: string;
    nickName: string;
    email: string;
    password: string;
}

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
    @Output() userRegister = new EventEmitter<IUserRegister>();

    registerForm = new FormGroup({
        name: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        nickName: new FormControl('', Validators.required),
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        verify: new FormControl('', Validators.required),
    });
    constructor() {}
}
