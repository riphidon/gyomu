import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HttpRequestInterceptor implements HttpInterceptor {
    constructor() {}
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        req = req.clone({
            withCredentials: true,
        });

        console.log('interceptor: ' + JSON.stringify(req));
        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    console.log('res--> ', event);
                }
                return event;
            })
        );
    }
}
