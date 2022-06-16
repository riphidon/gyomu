import { createAction, props } from '@ngrx/store';
import { IGyomuConfig } from 'src/app/models/gyomu';
import { IGyomuMember } from 'src/app/models/user';
import { IError } from 'src/app/ui-containers/event-notifiers/error/error';

/************************************
 *          Configuration           *
 ************************************/
export const LoadConfiguration = createAction('[GYOMU SHELL Page] Load User');
export const LoadConfigurationSuccess = createAction(
    '[GYOMU SHELL API] Load Configuration Success',
    props<{ config: IGyomuConfig }>()
);
export const LoadConfigurationFailure = createAction(
    '[GYOMU SHELL API] Load Configuration Failure',
    props<{ error: IError }>()
);

/************************************
 *                User              *
 ************************************/
export const LoadUser = createAction('[GYOMU SHELL Page] Load User');
export const LoadUserSuccess = createAction(
    '[GYOMU SHELL API] Load User Success',
    props<{ user: IGyomuMember }>()
);
export const LoadUserFailure = createAction(
    '[GYOMU SHELL API] Load User Failure',
    props<{ error: IError }>()
);
