import { createAction, props } from '@ngrx/store';
import { IGyomuUser } from 'src/app/models/gyomu';

export const SetUser = createAction(
    '[GYOMU SHELL Page] Set User',
    props<{ user: IGyomuUser }>()
);
