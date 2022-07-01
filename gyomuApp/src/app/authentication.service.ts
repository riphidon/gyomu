import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { USER_TWO } from './mock-data/user.mock';
import { IGyomuMember } from './models/user';
import { ILoginCredentials } from './ui-containers/access-forms/login/login.component';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    constructor(private http: HttpClient) {}

    isAuthenticated(status: boolean): Observable<boolean> {
        // TODO implement call to server to check user auth status.
        return of(status);
    }

    login(credentials: ILoginCredentials): Observable<IGyomuMember> {
        // TODO implement call to server to login user.
        return of(USER_TWO);
    }

    logout(): Observable<boolean> {
        // TODO implement call to server to logout user.
        return of(true);
    }
}
