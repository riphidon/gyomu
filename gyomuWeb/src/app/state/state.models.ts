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
