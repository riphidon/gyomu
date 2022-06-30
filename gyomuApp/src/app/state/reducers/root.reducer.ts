import { Action, createReducer, on } from '@ngrx/store';
import { IDeviceInfo } from 'src/app/models/root';
import { RootActions } from '../actions';

export interface IRootState {
    deviceInfo: IDeviceInfo;
}

export const initialState: IRootState = {
    deviceInfo: { isPortrait: true, type: '', os: '' },
};

export const rootReducer = createReducer(
    initialState,
    on(
        RootActions.SetDeviceInfo,
        (state, action): IRootState => ({
            ...state,
            deviceInfo: {
                isPortrait: action.info.isPortrait,
                type: action.info.type,
                os: action.info.os,
            },
        })
    ),
    on(
        RootActions.SwitchOrientation,
        (state, action): IRootState => ({
            ...state,
            deviceInfo: {
                ...state.deviceInfo,
                isPortrait: action.portrait,
            },
        })
    )
);
