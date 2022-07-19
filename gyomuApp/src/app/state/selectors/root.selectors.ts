import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IRootState } from '../reducers/root.reducer';

const rootStateKey = 'rootState';
const selectRootSate = createFeatureSelector<IRootState>(rootStateKey);

export const selectUserAuthStatus = createSelector(
    selectRootSate,
    (state) => state.userAuthStatus
);

export const selectDeviceInfo = createSelector(
    selectRootSate,
    (state) => state.deviceInfo
);

export const selectUserLoginStatus = createSelector(
    selectRootSate,
    (state) => state.userLogin
);
