import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { IGyomuConfig } from 'src/app/models/gyomu';
import { IGyomuMember } from 'src/app/models/user';
import { ILoadItem } from 'src/app/state/state.models';

/** Selectors */
import { shellSelectors } from 'src/app/state/selectors';

@Component({
    selector: 'app-home-shell',
    templateUrl: './home-shell.component.html',
    styleUrls: ['./home-shell.component.scss'],
})
export class HomeShellComponent {
    ngDestroyed$ = new Subject();

    user$: Observable<ILoadItem<IGyomuMember>>;
    configuration$: Observable<ILoadItem<IGyomuConfig>>;

    constructor(private store: Store) {
        // Get subscriptions from the store.
        this.user$ = this.store.select(shellSelectors.selectUser);
        this.configuration$ = store.select(shellSelectors.selectConfiguration);
    }
}
