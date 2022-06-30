import { IError } from '../ui-containers/event-notifiers/error/error';

export interface ILoadItem<T> {
    value: T | null;
    isLoading: boolean;
    hasError: boolean;
    error: IError | null;
}

export interface IProcessItem {
    isOngoing: boolean;
    isSuccess: boolean;
    hasError: boolean;
    error: IError | null;
}

export enum ACTION_KEYS {
    accept = 'accept',
    cancel = 'cancel',
    create = 'create',
    delete = 'delete',
    duplicate = 'duplicate',
    edit = 'edit',
    load = 'load',
    publish = 'publish',
    submit = 'submit',
    send = 'send',
    set = 'set',
    update = 'update',
}
