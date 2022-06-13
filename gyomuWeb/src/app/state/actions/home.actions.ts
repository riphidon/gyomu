import { createAction, props } from '@ngrx/store';
import { IError } from 'src/app/ui-containers/event-notifiers/error/error';

export const LoadCurrentProjects = createAction(
    '[HOME Page] Load Current Projects'
);

export const LoadCurrentProjectsSuccess = createAction(
    '[HOME API] Load Current Projects Success'
);

export const LoadCurrentProjectsFailure = createAction(
    '[HOME API] Load Current Projects Failure',
    props<{ error: IError }>()
);
