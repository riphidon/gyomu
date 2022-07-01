import { createAction, props } from '@ngrx/store';
import { IDeviceInfo } from 'src/app/models/root';
import { IGyomuMember } from 'src/app/models/user';
import { ILoginCredentials } from 'src/app/ui-containers/access-forms/login/login.component';
import { IError } from 'src/app/ui-containers/event-notifiers/error/error';

/**********************************
 *              Device
 **********************************/
export const SetDeviceInfo = createAction(
    '[AppRoot] Set Device Information',
    props<{ info: IDeviceInfo }>()
);

export const SwitchOrientation = createAction(
    '[AppRoot] Switch Screen Orientation',
    props<{ portrait: boolean }>()
);

/**********************************
 *          Authentication
 **********************************/
export const CheckIsUserAuthenticated = createAction(
    '[AppRoot] Check Is User Authenticated'
);

export const UserAuthenticated = createAction(
    '[AppRoot] User Is Authenticated'
);

export const AuthCheckFailure = createAction(
    '[AppRoot] Auth Check Failure',
    props<{ error: IError }>()
);

export const LoginUser = createAction(
    '[AppRoot] Login User',
    props<{ credentials: ILoginCredentials }>()
);

export const LoginUserSuccess = createAction(
    '[AppRoot] Login User Success',
    props<{ user: IGyomuMember }>()
);

export const LoginUserFailure = createAction(
    '[AppRoot] Login User Failure',
    props<{ error: IError }>()
);

export const Logout = createAction(
    '[AppRoot] Login User',
    props<{ credentials: ILoginCredentials }>()
);

export const LogoutSuccess = createAction(
    '[AppRoot] Login User',
    props<{ user: IGyomuMember }>()
);

export const LogoutFailure = createAction(
    '[AppRoot] Login User',
    props<{ error: IError }>()
);
