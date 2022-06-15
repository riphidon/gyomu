import { Action, createReducer, on } from '@ngrx/store';
import { IGyomuMember } from 'src/app/models/user';
import { GyomuShellActions } from '..';

export const gyomuShellFeatureKey = 'gyomuShell';

export interface IGyomuShellState {
    user: IGyomuMember | null;
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
