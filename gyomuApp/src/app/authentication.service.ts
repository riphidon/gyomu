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
    private baseURL = environment.API_URL;
    private authCheckKey = '/authcheck';
    private loginKey = '/login';
    private logoutKey = '/logout';
    headers = new HttpHeaders().set('content-type', 'application/json');

    constructor(private http: HttpClient) {}

    isAuthenticated = false;
    authCheck(): Observable<boolean> {
        const URL = this.baseURL + this.authCheckKey;
        return this.http.get<boolean>(URL, { headers: this.headers });
    }

    login(credentials: ILoginCredentials): Observable<IGyomuMember> {
        const URL = this.baseURL + this.loginKey;
        return this.http.post<IGyomuMember>(URL, credentials, {
            headers: this.headers,
        });
    }

    logout(): Observable<any> {
        const URL = this.baseURL + this.logoutKey;
        const h = new HttpHeaders().set('accept', '*/*');
        return this.http.post<any>(URL, { headers: h });
    }
}
