import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

// Emulate an http response providing time delay, data and error.
export function emulateHTTPResponse(
    data: any,
    http: HttpClient,
    testErr: boolean
): any {
    return testErr ? http.get<any>(`fakeurl/`) : of(data);
}

// Wait for the next line of code to execute after a set delay
export function wait(delay: number): void {
    let start = new Date().getTime();
    let end = start;
    while (end < start + delay) {
        end = new Date().getTime();
    }
}
