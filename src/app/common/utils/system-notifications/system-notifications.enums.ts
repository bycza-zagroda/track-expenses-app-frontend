export enum NotificationType {
    Error = 'error',
    Warning = 'warning',
    Success = 'success',
}

export interface IShowNotificationConfig {
    type: NotificationType,
    message: string,
    dismiss?: string;
}