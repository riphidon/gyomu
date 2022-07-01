import { Component, Inject, OnInit } from '@angular/core';
import {
    MatSnackBarRef,
    MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import { IErrorNotificationData } from './error';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
    errMsg: string = '';

    constructor(
        public errorNotifier: MatSnackBarRef<ErrorComponent>,
        @Inject(MAT_SNACK_BAR_DATA) public data: IErrorNotificationData
    ) {}

    ngOnInit(): void {
        this.getErrorMessage();
    }

    getErrorMessage(): void {
        switch (this.data.error.code) {
            case 400:
                this.errMsg = `An error occured while trying to ${this.data.error.action} ${this.data.error.item}. <br /> Please check the data you provided. <br /> ${this.data.context}`;
                break;
            case 403:
                this.errMsg = `You do not have the authorization to ${this.data.error.action} ${this.data.error.item}.`;
                break;
            default:
                this.errMsg = `An error occured while trying to ${this.data.error.action} ${this.data.error.item}. \n Please try again later .`;
                break;
        }
    }
}
