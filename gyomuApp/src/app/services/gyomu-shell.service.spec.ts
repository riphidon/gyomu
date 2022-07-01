import { TestBed } from '@angular/core/testing';

import { GyomuShellService } from './gyomu-shell.service';

describe('GyomuShellService', () => {
    let service: GyomuShellService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(GyomuShellService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
