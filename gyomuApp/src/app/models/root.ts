/**********************************
 *              DEVICE
 **********************************/
export enum DEVICE_KEYS {
    mobile = 'Mobile',
    tablet = 'Tablet',
    desktop = 'Desktop',
    ipad = 'Ipad',
    iphone = 'Iphone',
}
export enum OS_KEYS {
    android = 'Android',
    ios = 'iOS',
    windows = 'Windows',
}
export interface IDeviceInfo {
    isPortrait: boolean;
    type: string;
    os: string;
}
