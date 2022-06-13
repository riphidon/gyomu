import { Action, createReducer, on } from '@ngrx/store';

export const homeFeatureKey = 'home';

export interface IHomeState {}

export const initialState: IHomeState = {};

export const HomeReducer = createReducer(initialState);
