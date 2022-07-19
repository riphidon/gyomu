import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RootActions } from 'src/app/state/actions';
import { rootItems } from 'src/app/state/selectors';
import { IProcessItem } from 'src/app/state/state.models';
import { ILoginCredentials } from 'src/app/ui-containers/access-forms/login/login.component';

@Component({
    selector: 'app-access-shell',
    templateUrl: './access-shell.component.html',
    styleUrls: ['./access-shell.component.scss'],
})
export class AccessShellComponent implements OnInit {
    userLogin$: Observable<IProcessItem>;
    constructor(private store: Store) {
        // Get subscriptions from the store.
        this.userLogin$ = this.store.select(rootItems.selectUserLoginStatus);
    }

    ngOnInit() {}

    login(credentials: ILoginCredentials): void {
        this.store.dispatch(RootActions.LoginUser({ credentials }));
    }

    register(): void {}
}
