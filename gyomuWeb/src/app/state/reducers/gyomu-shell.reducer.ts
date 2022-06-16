import { Action, createReducer, on } from '@ngrx/store';
import { IGyomuConfig } from 'src/app/models/gyomu';
import { IGyomuMember } from 'src/app/models/user';
import { GyomuShellActions } from '../actions';
import { ILoadItem } from '../state.models';

export const gyomuShellFeatureKey = 'gyomuShell';

export interface IGyomuShellState {
    configuration: ILoadItem<IGyomuConfig>;
    user: ILoadItem<IGyomuMember>;
}

export const initialState: IGyomuShellState = {
    configuration: {
        value: null,
        isLoading: false,
        hasError: false,
        error: null,
    },
    user: { value: null, isLoading: false, hasError: false, error: null },
};

export const GyomuReducer = createReducer(
    initialState,
    //#region CONFIG
    on(
        GyomuShellActions.LoadConfiguration,
        (state, action): IGyomuShellState => {
            return {
                ...state,
                configuration: { ...state.configuration, isLoading: true },
            };
        }
    ),
    on(
        GyomuShellActions.LoadConfigurationSuccess,
        (state, action): IGyomuShellState => {
            return {
                ...state,
                configuration: {
                    ...state.configuration,
                    value: action.config,
                    isLoading: false,
                },
            };
        }
    ),
    on(
        GyomuShellActions.LoadConfigurationFailure,
        (state, action): IGyomuShellState => {
            return {
                ...state,
                configuration: {
                    ...state.configuration,
                    isLoading: false,
                    hasError: true,
                    error: action.error,
                },
            };
        }
    ),
    //#endregion
    //#region USER
    on(GyomuShellActions.LoadUser, (state, action): IGyomuShellState => {
        return {
            ...state,
            user: { ...state.user, isLoading: true },
        };
    }),
    on(GyomuShellActions.LoadUserSuccess, (state, action): IGyomuShellState => {
        return {
            ...state,
            user: { ...state.user, value: action.user, isLoading: false },
        };
    }),
    on(GyomuShellActions.LoadUserFailure, (state, action): IGyomuShellState => {
        return {
            ...state,
            user: {
                ...state.user,
                isLoading: false,
                hasError: true,
                error: action.error,
            },
        };
    })
    //#endregion
);
