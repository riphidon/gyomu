import { Action, createReducer, on } from '@ngrx/store';

export interface IHomeState {
    isUserLoggedIn: boolean;
}

export const initialState: IHomeState = {
    isUserLoggedIn: false,
};

export const HomeReducer = createReducer(initialState);
