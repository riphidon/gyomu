import { Component, Input, OnInit } from '@angular/core';
import { IGyomuConfig } from 'src/app/models/gyomu';
import { IGyomuMember } from 'src/app/models/user';
import { ILoadItem } from 'src/app/state/state.models';

@Component({
    selector: 'app-home-screen',
    templateUrl: './home-screen.component.html',
    styleUrls: ['./home-screen.component.scss'],
})
export class HomeScreenComponent {
    @Input() user: ILoadItem<IGyomuMember> = {
        value: null,
        isLoading: false,
        hasError: false,
        error: null,
    };
    @Input() configuration: ILoadItem<IGyomuConfig> = {
        value: null,
        isLoading: false,
        hasError: false,
        error: null,
    };
    constructor() {}
}
