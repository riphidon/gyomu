import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IHomeState } from '../reducers/home.reducer';

const homeStateKey = 'homeState';

const selectHomeState = createFeatureSelector<IHomeState>(homeStateKey);

export const selectUserStatus = createSelector(
    selectHomeState,
    (state) => state.isUserLoggedIn
);
