import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import { IDeviceInfo } from 'src/app/models/root';
import { IGyomuMember } from 'src/app/models/user';
import { RootActions } from '../actions';
import { IAuthProcess, ILoadItem } from '../state.models';

export interface IRootState {
    userAuthStatus: IAuthProcess;
    deviceInfo: IDeviceInfo;
    user: ILoadItem<IGyomuMember>;
}

export const initialState: IRootState = {
    userAuthStatus: { isAuthenticated: false, isChecking: true, error: null },
    deviceInfo: { isPortrait: true, type: '', os: '' },
    user: { value: null, isLoading: false, hasError: false, error: null },
};

export const rootReducer = createReducer(
    initialState,
    on(
        RootActions.UserAuthenticated,
        (state, action): IRootState => ({
            ...state,
            userAuthStatus: {
                isAuthenticated: true,
                isChecking: false,
                error: null,
            },
        })
    ),
    on(
        RootActions.AuthCheckFailure,
        (state, action): IRootState => ({
            ...state,
            userAuthStatus: {
                isAuthenticated: false,
                isChecking: false,
                error: action.error,
            },
        })
    ),
    on(
        RootActions.SetDeviceInfo,
        (state, action): IRootState => ({
            ...state,
            deviceInfo: {
                isPortrait: action.info.isPortrait,
                type: action.info.type,
                os: action.info.os,
            },
        })
    ),
    on(
        RootActions.SwitchOrientation,
        (state, action): IRootState => ({
            ...state,
            deviceInfo: {
                ...state.deviceInfo,
                isPortrait: action.portrait,
            },
        })
    )
);
