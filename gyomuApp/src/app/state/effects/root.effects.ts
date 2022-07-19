import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AuthenticationGuard } from 'src/app/authentication.guard';
import { AuthenticationService } from 'src/app/authentication.service';
import { IGyomuMember } from 'src/app/models/user';
import { RootActions } from '../actions';
import { ACTION_KEYS, ROOT_KEYS } from '../state.models';

@Injectable()
export class RootEffects {
    constructor(
        private actions$: Actions,
        private authService: AuthenticationService,
        private authGuard: AuthenticationGuard,
        private router: Router
    ) {}

    authCheck$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RootActions.CheckIsUserAuthenticated),
            mergeMap(() =>
                this.authService.authCheck().pipe(
                    map((isAuth: boolean) => {
                        if (isAuth) {
                            this.authService.isAuthenticated = true;
                            this.authGuard.canActivate();
                            this.router.navigate(['gyomu/home']);
                        }
                        this.router.navigate(['/login']);
                        return RootActions.UserAuthenticated({ isAuth });
                    }),
                    catchError((err: HttpErrorResponse) =>
                        of(
                            RootActions.AuthCheckFailure({
                                error: {
                                    code: err.status,
                                    item: ROOT_KEYS.user,
                                    action: ACTION_KEYS.authCheck,
                                },
                            })
                        )
                    )
                )
            )
        );
    });
    loginUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RootActions.LoginUser),
            mergeMap((action) => {
                const creds = action.credentials;
                return this.authService.login(creds).pipe(
                    map((user: IGyomuMember) => {
                        this.authService.isAuthenticated = true;
                        this.authGuard.canActivate();
                        this.router.navigate(['gyomu/home']);
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

    logoutUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(RootActions.Logout),
            mergeMap((action) => {
                return this.authService.logout().pipe(
                    map(() => {
                        this.authService.isAuthenticated = false;
                        this.authGuard.canActivate();
                        this.router.navigate(['login']);
                        return RootActions.LogoutSuccess();
                    }),
                    catchError((err: HttpErrorResponse) =>
                        of(
                            RootActions.LogoutFailure({
                                error: {
                                    code: err.status,
                                    item: ROOT_KEYS.user,
                                    action: ACTION_KEYS.logout,
                                },
                            })
                        )
                    )
                );
            })
        );
    });
}
