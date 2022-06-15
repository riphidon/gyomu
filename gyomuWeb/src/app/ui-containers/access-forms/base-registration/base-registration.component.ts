import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-base-registration',
    templateUrl: './base-registration.component.html',
    styleUrls: ['./base-registration.component.scss'],
})
export class BaseRegistrationComponent {
    baseRegisterForm = new FormGroup({
        name: new FormControl('', Validators.required),
    });
    constructor() {}
}
