import { createAction, props } from '@ngrx/store';
import { IError } from 'src/app/ui-containers/event-notifiers/error/error';

export const LoadUser = createAction('[GYOMU SHELL Page] Load User');

export const LoadUserSuccess = createAction(
    '[GYOMU SHELL API] Load User Success'
);

export const LoadUserFailure = createAction(
    '[GYOMU SHELL API] Load User Failure',
    props<{ error: IError }>()
);
