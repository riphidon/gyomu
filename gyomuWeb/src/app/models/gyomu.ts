export interface IGyomuConfig {
    id: number;
    customer: IGyomuCustomer;
    configName: string;
    welcomeMessage: string;
}

export interface IGyomuCustomer {
    id: number;
    name: string;
    domain: string;
}
