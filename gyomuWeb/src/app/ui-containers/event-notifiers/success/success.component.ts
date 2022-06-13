import { Component, Inject, OnInit } from '@angular/core';
import {
    MatSnackBarRef,
    MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import { ACTION_KEYS } from 'src/app/state/state';
import { ISuccess } from './success';

@Component({
    selector: 'app-success',
    templateUrl: './success.component.html',
    styleUrls: ['./success.component.scss'],
})
export class SuccessComponent implements OnInit {
    successMsg: string = '';
    operation: string = '';

    constructor(
        public successNotifier: MatSnackBarRef<SuccessComponent>,
        @Inject(MAT_SNACK_BAR_DATA) public data: ISuccess
    ) {}

    ngOnInit(): void {
        this.successMsg = `${this.data.item} successfully ${this.getAction()}`;
    }

    getAction(): string {
        let a = this.data.action;
        let action: string = '';
        switch (this.data.action) {
            case ACTION_KEYS.submit:
                action = 'submitted';
                break;
            case ACTION_KEYS.send:
                action = 'sent';
                break;
            case ACTION_KEYS.set:
                action = 'set';
                break;
            default:
                action = a.charAt(a.length - 1) === 'e' ? a + 'd' : a + 'ed';
                break;
        }
        return action;
    }
}
