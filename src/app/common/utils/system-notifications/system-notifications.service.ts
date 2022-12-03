import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IShowNotificationConfig } from './system-notifications.enums';

@Injectable({
  providedIn: 'root',
})
export class SystemNotificationsService {
    public constructor(
        private readonly snackBar: MatSnackBar,
      ) { }

      public showNotification({ type, message, dismiss = 'OK' }: IShowNotificationConfig): void {
        this.snackBar.open(message, dismiss, {
            panelClass: type,
        });
      }
}
