import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { GyomuShellEffects } from './gyomu-shell.effects';

describe('GyomuShellEffects', () => {
    let actions$: Observable<any>;
    let effects: GyomuShellEffects;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [GyomuShellEffects, provideMockActions(() => actions$)],
        });

        effects = TestBed.inject(GyomuShellEffects);
    });

    it('should be created', () => {
        expect(effects).toBeTruthy();
    });
});
