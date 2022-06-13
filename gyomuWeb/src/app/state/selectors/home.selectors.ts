import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as HomeState from '../reducers/home.reducer';

export interface State {
    home: HomeState.IHomeState;
}

const getHomeState = (state: State) => state.home;
