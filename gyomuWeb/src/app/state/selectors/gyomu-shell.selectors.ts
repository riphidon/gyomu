import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IGyomuShellState } from '../reducers/gyomu-shell.reducer';

const gyomuState = 'gyomuState';

const selectGyomuState = createFeatureSelector<IGyomuShellState>(gyomuState);

export const selectUser = createSelector(
    selectGyomuState,
    (state) => state.user
);
export const selectConfiguration = createSelector(
    selectGyomuState,
    (state) => state.configuration
);
