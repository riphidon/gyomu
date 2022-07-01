import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { RootActions } from 'src/app/state/actions';
import { ILoginCredentials } from 'src/app/ui-containers/access-forms/login/login.component';

@Component({
    selector: 'app-access-shell',
    templateUrl: './access-shell.component.html',
    styleUrls: ['./access-shell.component.scss'],
})
export class AccessShellComponent implements OnInit {
    constructor(private store: Store) {}

    ngOnInit() {}

    login(credentials: ILoginCredentials): void {
        this.store.dispatch(RootActions.LoginUser({ credentials }));
    }

    register(): void {}
}
