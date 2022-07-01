import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

/** Ngrx */
import { Store } from '@ngrx/store';

/** Rxjs */
import { Observable } from 'rxjs';

/** Models */
import { IDeviceInfo } from 'src/app/models/root';

/** Selectors */
import { rootItems } from 'src/app/state/selectors';

@Component({
    selector: 'app-gyomu-shell',
    templateUrl: './gyomu-shell.component.html',
    styleUrls: ['./gyomu-shell.component.scss'],
})
export class GyomuShellComponent implements OnInit {
    device$: Observable<IDeviceInfo>;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private store: Store,
        private projectDrawer: MenuController,
        private settingsMenu: MenuController
    ) {
        // Get subscriptions from the store.
        this.device$ = store.select(rootItems.selectDeviceInfo);
    }

    ngOnInit(): void {
        this.watchUrlChanges();
    }

    /**************************************
     *               ROUTING
     **************************************/

    /**
     * watchUrlChanges
     *
     * Detects changes in URL
     *
     * Routes to home page on App Init.
     *
     * Triggers project details
     * opening based on query parameters.
     *
     */
    watchUrlChanges(): void {
        this.route.queryParams.subscribe((params: Params) => {
            if (Object.keys(params).length !== 0) {
                // If there are params, it can be project details opening (internal or external request),
                const projectId: number | undefined = parseInt(
                    params['id'],
                    10
                );
                const external: boolean | undefined = params['extReq'];

                // If there is a value for projectId & external, it is outside app opening request (e.g. from email).
                if (!isNaN(projectId) && external) {
                    // TODO: implement project detail opening from ecternal request.
                    // Else if no value for external then it is an in-app request.
                } else if (!isNaN(projectId)) {
                    // TODO implement project details opening.
                }

                // Finally, if no params, route user to home.
            } else {
                // On app init display the home page
                this.router.navigateByUrl('/home');
            }
        });
    }

    /**************************************
     *           MENUS / DRAWERS
     **************************************/
    openProjectDetails() {
        this.projectDrawer.enable(true, 'project');
        this.projectDrawer.open('project');
    }

    closeProjectDetails() {
        this.router.navigate([], { queryParams: {} });
        this.projectDrawer.close();
    }

    openSettings() {
        this.settingsMenu.enable(true, 'settings');
        this.settingsMenu.open('settings');
    }

    closeSettings() {
        this.settingsMenu.close();
    }
}
