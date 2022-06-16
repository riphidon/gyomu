import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ACTION_KEYS } from 'src/app/state/state';
import { IUserRegister } from '../../register/register.component';
import {
    BaseRegistrationComponent,
    IGroupRegister,
} from '../base-registration.component';

export interface IGroupRegisterRequest {
    group: IGroupRegister;
    admin: IUserRegister;
}

@Component({
    selector: 'app-base-registration-btn',
    templateUrl: './base-registration-btn.component.html',
    styleUrls: ['./base-registration-btn.component.scss'],
})
export class BaseRegistrationBtnComponent {
    @Output() baseRegister = new EventEmitter<IGroupRegisterRequest>();

    constructor(public baseRegistrationDialog: MatDialog) {}

    registerOrganization(): void {
        // Open the dialog.
        const dialogRef = this.baseRegistrationDialog.open(
            BaseRegistrationComponent,
            {
                width: '500px',
                height: '700px',
            }
        );
        // Listen to dialog close, act accordingly to result received.
        dialogRef
            .afterClosed()
            .subscribe((result: string | IGroupRegisterRequest) => {
                // If result is not a string, pursue action, else, user cancelled, do nothing.
                if (result !== ACTION_KEYS.cancel) {
                    // Since result can be of two types, cast it as proper type to match
                    // the event emitter emit type.
                    this.baseRegister.emit(result as IGroupRegisterRequest);
                }
            });
    }
}
