import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IGyomuShellState } from '../reducers/gyomu-shell.reducer';

const gyomuStateKey = 'gyomuState';

const selectGyomuState = createFeatureSelector<IGyomuShellState>(gyomuStateKey);

export const selectUser = createSelector(
    selectGyomuState,
    (state) => state.user
);
export const selectConfiguration = createSelector(
    selectGyomuState,
    (state) => state.configuration
);
