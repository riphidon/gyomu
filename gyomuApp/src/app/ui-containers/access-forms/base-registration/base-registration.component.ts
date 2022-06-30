import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { IUserRegister } from '../register/register.component';
import { IGroupRegisterRequest } from './base-registration-btn/base-registration-btn.component';

export interface IGroupRegister {
    name: string;
}

@Component({
    selector: 'app-base-registration',
    templateUrl: './base-registration.component.html',
    styleUrls: ['./base-registration.component.scss'],
})
export class BaseRegistrationComponent {
    baseRegisterForm = new FormGroup({
        name: new FormControl('', Validators.required),
    });

    groupData: IGroupRegister | null = null;
    userData: IUserRegister | null = null;
    constructor(
        public baseRegisterCreator: MatDialogRef<BaseRegistrationComponent>
    ) {}

    getUserRegisterData(data: IUserRegister): void {
        this.userData = data;
    }

    register(): void {
        // First check if there is user data.
        if (this.userData) {
            this.groupData = {
                name: this.baseRegisterForm.controls['name'].value as string,
            };
            let baseRegistration: IGroupRegisterRequest = {
                group: this.groupData,
                admin: this.userData,
            };

            this.baseRegisterCreator.close(baseRegistration);
        }
    }
}
