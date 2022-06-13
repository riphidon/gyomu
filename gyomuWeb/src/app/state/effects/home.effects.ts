import { Injectable } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';

@Injectable()
export class HomeEffects {
    constructor(private actions$: Actions) {}
}
