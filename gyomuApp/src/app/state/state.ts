import { IGyomuShellState } from './reducers/gyomu-shell.reducer';
import { IRootState } from './reducers/root.reducer';

// Reference the global state and its different slices.
export interface IState {
    appRoot: IRootState;
    gyomu: IGyomuShellState;
}
