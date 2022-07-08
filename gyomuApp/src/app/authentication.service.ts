import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { USER_TWO } from './mock-data/user.mock';
import { IGyomuMember } from './models/user';
import { ILoginCredentials } from './ui-containers/access-forms/login/login.component';

@Injectable({
    providedIn: 'root',
})
export class AuthenticationService {
    authCheckKey = '/authcheck';
    headers = new HttpHeaders().set('content-type', 'application/json');

    constructor(private http: HttpClient) {}

    isAuthenticated(): Observable<boolean> {
        const URL = environment.API_URL + this.authCheckKey;
        return this.http.get<boolean>(URL, { headers: this.headers });
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
