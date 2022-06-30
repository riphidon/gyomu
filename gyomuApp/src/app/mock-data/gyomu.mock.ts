import { IGyomuConfig, IGyomuCustomer } from '../models/gyomu';

export const ECHUS_OVERLOOK: IGyomuCustomer = {
    id: 1,
    name: 'Echus Overlook Labs',
    domain: 'eoll',
};

export const ECHUS_CONFIG_ONE: IGyomuConfig = {
    id: 1,
    customer: ECHUS_OVERLOOK,
    configName: 'Echus One',
    welcomeMessage: 'Welcome to the Echus Overlook Labs Gyomu project manager.',
};
