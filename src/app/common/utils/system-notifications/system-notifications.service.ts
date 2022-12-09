import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IShowNotificationConfig } from './system.notifications.types';

@Injectable({
  providedIn: 'root',
})
export class SystemNotificationsService {
    public constructor(
        private readonly snackBar: MatSnackBar,
      ) { }

      public showNotification({ type, message, dismissBtnText = 'OK' }: IShowNotificationConfig): void {
        this.snackBar.open(message, dismissBtnText);
      }
}
