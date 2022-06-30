import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { IGyomuConfig } from 'src/app/models/gyomu';
import { IGyomuMember } from 'src/app/models/user';
import { ILoadItem } from 'src/app/state/state.models';

/** Selectors */
import { homeItems, rootItems, shellItems } from 'src/app/state/selectors';

/** */
import { ILoginCredentials } from 'src/app/ui-containers/access-forms/login/login.component';
import { IGroupRegisterRequest } from 'src/app/ui-containers/access-forms/base-registration/base-registration-btn/base-registration-btn.component';
import { IDeviceInfo } from 'src/app/models/root';

@Component({
    selector: 'app-home-shell',
    templateUrl: './home-shell.component.html',
    styleUrls: ['./home-shell.component.scss'],
})
export class HomeShellComponent {
    // To handle unsubscription from observable.
    ngDestroyed$ = new Subject();

    user$: Observable<ILoadItem<IGyomuMember>>;
    device$: Observable<IDeviceInfo>;
    configuration$: Observable<ILoadItem<IGyomuConfig>>;
    isUserLoggedIn$: Observable<boolean>;

    constructor(private store: Store) {
        // Get subscriptions from the store.
        this.user$ = this.store.select(shellItems.selectUser);
        this.device$ = store.select(rootItems.selectDeviceInfo);
        this.configuration$ = this.store.select(shellItems.selectConfiguration);
        this.isUserLoggedIn$ = this.store.select(homeItems.selectUserStatus);
    }

    login(creds: ILoginCredentials): void {}

    register(registerForm: IGroupRegisterRequest): void {}
}
