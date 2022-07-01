import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication.service';
import { IGyomuMember } from 'src/app/models/user';
import { RootActions } from '../actions';
import { ACTION_KEYS, ROOT_KEYS } from '../state.models';

@Injectable()
export class RootEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthenticationService
    ) {}

    loginUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RootActions.LoginUser),
            mergeMap((action) => {
                const creds = action.credentials;
                return this.authService.login(creds).pipe(
                    map((user: IGyomuMember) => {
                        return RootActions.LoginUserSuccess({ user });
                    }),
                    catchError((err: HttpErrorResponse) =>
                        of(
                            RootActions.LoginUserFailure({
                                error: {
                                    code: err.status,
                                    item: ROOT_KEYS.user,
                                    action: ACTION_KEYS.login,
                                },
                            })
                        )
                    )
                );
            })
        );
    });
}
