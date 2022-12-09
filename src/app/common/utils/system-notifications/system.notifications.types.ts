import { NotificationType } from "./system.notifications.constants";

export interface IShowNotificationConfig {
    type: NotificationType,
    message: string,
    dismissBtnText?: string;
}