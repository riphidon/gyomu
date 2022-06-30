import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent {
    @Output() logoutEvent = new EventEmitter();
    constructor() {}

    logout(): void {
        this.logoutEvent.emit();
    }
}
