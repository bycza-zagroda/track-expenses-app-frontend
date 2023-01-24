import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SNACKBAR_DURATION_SECONDS } from './system.notifications.consts';
import { IShowNotificationConfig } from './system.notifications.types';

@Injectable({
  providedIn: 'root',
})
export class SystemNotificationsService {
  public constructor(
    private readonly snackBar: MatSnackBar,
  ) { }

  public showNotification({ message, dismissBtnText = 'OK', type="success" }: IShowNotificationConfig): void {
    this.snackBar.open(message, dismissBtnText, {
      duration: 1000 * SNACKBAR_DURATION_SECONDS,
      panelClass: [type]
    });
  }
}
