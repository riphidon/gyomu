import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IDeviceInfo } from 'src/app/models/root';
import { rootItems } from 'src/app/state/selectors';

@Component({
    selector: 'app-projects-shell',
    templateUrl: './projects-shell.component.html',
    styleUrls: ['./projects-shell.component.scss'],
})
export class ProjectsShellComponent implements OnInit {
    device$: Observable<IDeviceInfo>;

    constructor(private store: Store) {
        // Get subscriptions from the store.
        this.device$ = store.select(rootItems.selectDeviceInfo);
    }

    ngOnInit() {}
}
