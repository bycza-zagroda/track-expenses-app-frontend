import { NotificationType } from './system.notifications.constants';

export interface IShowNotificationConfig {
    message: string,
    dismissBtnText?: string;
    type: NotificationType;
}
