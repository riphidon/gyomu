import { createAction, props } from '@ngrx/store';
import { IDeviceInfo } from 'src/app/models/root';

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
