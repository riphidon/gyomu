import { IGyomuShellState } from './reducers/gyomu-shell.reducer';

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

export interface IState {
    gyomu: IGyomuShellState;
}
