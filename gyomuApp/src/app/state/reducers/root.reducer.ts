import { Action, createReducer, on } from '@ngrx/store';
import { IDeviceInfo } from 'src/app/models/root';
import { IGyomuMember } from 'src/app/models/user';
import { RootActions } from '../actions';
import { IAuthProcess, ILoadItem, IProcessItem } from '../state.models';

export interface IRootState {
    userAuthStatus: IAuthProcess;
    userLogin: IProcessItem;
    userLogout: IProcessItem;
    deviceInfo: IDeviceInfo;
    user: ILoadItem<IGyomuMember>;
}

export const initialState: IRootState = {
    userAuthStatus: { isAuthenticated: false, isChecking: true, error: null },
    userLogin: {
        isOngoing: false,
        isSuccess: false,
        hasError: false,
        error: null,
    },
    userLogout: {
        isOngoing: false,
        isSuccess: false,
        hasError: false,
        error: null,
    },
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
    ),
    //#region LOGIN
    on(
        RootActions.LoginUser,
        (state, action): IRootState => ({
            ...state,
            userLogin: {
                ...state.userLogin,
                isOngoing: true,
                hasError: false,
                error: null,
            },
        })
    ),
    on(
        RootActions.LoginUserSuccess,
        (state, action): IRootState => ({
            ...state,
            userLogin: {
                ...state.userLogin,
                isOngoing: false,
                isSuccess: true,
            },
        })
    ),
    on(
        RootActions.LoginUserFailure,
        (state, action): IRootState => ({
            ...state,
            userLogin: {
                ...state.userLogin,
                isOngoing: false,
                hasError: true,
                error: action.error,
            },
        })
    ),
    //#endregion
    //#region LOGOUT
    on(
        RootActions.Logout,
        (state, action): IRootState => ({
            ...state,
            userLogout: {
                ...state.userLogin,
                isOngoing: true,
                hasError: false,
                error: null,
            },
        })
    ),
    on(
        RootActions.LogoutSuccess,
        (state, action): IRootState => ({
            ...state,
            userAuthStatus: {
                isAuthenticated: false,
                isChecking: true,
                error: null,
            },
            userLogout: {
                isOngoing: false,
                isSuccess: true,
                hasError: false,
                error: null,
            },
            user: {
                value: null,
                isLoading: false,
                hasError: false,
                error: null,
            },
        })
    ),
    on(
        RootActions.LogoutFailure,
        (state, action): IRootState => ({
            ...state,
            userLogout: {
                isOngoing: false,
                isSuccess: false,
                hasError: true,
                error: action.error,
            },
        })
    )
    //#endregion
);
