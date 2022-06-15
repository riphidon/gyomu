import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ECHUS_CONFIG_ONE } from './mock-data/gyomu.mock';
import { PROJECTS } from './mock-data/project.mock';
import { USER_ONE } from './mock-data/user.mock';
import { IGyomuConfig } from './models/gyomu';
import { IProject } from './models/project';
import { IGyomuMember } from './models/user';

@Injectable({
    providedIn: 'root',
})
export class AppService {
    constructor(private http: HttpClient) {}

    login(): Observable<IGyomuMember> {
        return of(USER_ONE);
    }

    logout(): void {
        // TODO implements logout logic.
    }

    getCurrentConfiguration(): Observable<IGyomuConfig> {
        return of(ECHUS_CONFIG_ONE);
    }

    getProjects(): Observable<IProject[]> {
        return of(PROJECTS);
    }
}
