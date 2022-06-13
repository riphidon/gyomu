import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-gyomu-shell',
    templateUrl: './gyomu-shell.component.html',
    styleUrls: ['./gyomu-shell.component.scss'],
})
export class GyomuShellComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit(): void {
        this.router.navigateByUrl('/home');
    }
}
