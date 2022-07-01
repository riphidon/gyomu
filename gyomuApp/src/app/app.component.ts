import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AngularDeviceInformationService } from 'angular-device-information';
import { IDeviceInfo, SCREEN } from './models/root';
import { RootActions } from './state/actions';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
    constructor(
        private deviceService: AngularDeviceInformationService,
        private store: Store
    ) {}

    ngOnInit(): void {
        this.setDeviceInfo(screen.orientation.type);

        screen.orientation.onchange = () => {
            this.setScreenOrientation(screen.orientation.type);
        };

        this.store.dispatch(RootActions.CheckIsUserAuthenticated());
    }

    /**************************************
     *           DEVICE INFORMATION
     **************************************/
    setDeviceInfo(orientation: string): void {
        let info: IDeviceInfo = {
            isPortrait: orientation === SCREEN.portrait ? true : false,
            type: this.deviceService.getDeviceType(),
            os: this.deviceService.getDeviceInfo().os,
        };
        this.store.dispatch(RootActions.SetDeviceInfo({ info }));
    }

    setScreenOrientation(orientation: string): void {
        let portrait = orientation === SCREEN.portrait ? true : false;
        this.store.dispatch(RootActions.SwitchOrientation({ portrait }));
    }
}
