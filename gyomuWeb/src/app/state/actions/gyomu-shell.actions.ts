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
 *              Access              *
 ************************************/
/** User log in */
export const LoginUser = createAction('[GYOMU SHELL Page] Log In User');
export const LoginUserSuccess = createAction(
    '[GYOMU SHELL API] Log In User Success',
    props<{ user: IGyomuMember }>()
);
export const LoginUserFailure = createAction(
    '[GYOMU SHELL API] Log In User Failure',
    props<{ error: IError }>()
);

/** Group registration */
export const RegisterCustomer = createAction(
    '[GYOMU SHELL Page] Register Customer'
);
export const RegisterCustomerSuccess = createAction(
    '[GYOMU SHELL API] Register Customer Success'
);
export const RegisterCustomerFailure = createAction(
    '[GYOMU SHELL API] Register Customer Failure',
    props<{ error: IError }>()
);
