import { Action, createReducer, on } from '@ngrx/store';
import { IGyomuUser } from 'src/app/models/gyomu';
import { GyomuShellActions } from '..';

export const gyomuShellFeatureKey = 'gyomuShell';

export interface IGyomuShellState {
    user: IGyomuUser | null;
}

export const initialState: IGyomuShellState = {
    user: null,
};

export const GyomuReducer = createReducer(
    initialState,
    on(GyomuShellActions.SetUser, (state, action): IGyomuShellState => {
        return {
            ...state,
            user: action.user,
        };
    })
);
