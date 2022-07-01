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

export interface IAuthProcess {
    isAuthenticated: boolean;
    isChecking: boolean;
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
    login = 'login',
    logout = 'logout',
    publish = 'publish',
    register = 'register',
    submit = 'submit',
    send = 'send',
    set = 'set',
    update = 'update',
}

export enum ROOT_KEYS {
    device = 'device',
    user = 'user',
}
