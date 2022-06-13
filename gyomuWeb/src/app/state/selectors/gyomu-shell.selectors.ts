import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as GyomuState from '../reducers/gyomu-shell.reducer';

export interface State {
    gyomu: GyomuState.IGyomuShellState;
}

const getGyomuState = (state: State) => state.gyomu;
