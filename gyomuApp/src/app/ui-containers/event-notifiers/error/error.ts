export interface IError {
    code: number;
    action: string;
    item: string;
}

export interface IErrorNotificationData {
    error: IError;
    context: string;
    message?: string;
}
