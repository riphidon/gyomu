import { IGyomuShellState } from './reducers/gyomu-shell.reducer';

// Reference the global state and its different slices.
export interface IState {
    gyomu: IGyomuShellState;
}
