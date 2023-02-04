import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IShowNotificationConfig } from './system.notifications.types';
import { SNACKBAR_DURATION } from './system.notifications.constants';

@Injectable({
  providedIn: 'root',
})
export class SystemNotificationsService {
  public constructor(
    private readonly snackBar: MatSnackBar,
  ) { }

  public showNotification(config: IShowNotificationConfig): void {
    this.snackBar.open(config.message, config.dismissBtnText ?? 'OK', {
      duration: SNACKBAR_DURATION,
      panelClass: `notification--${config.type}`,
    });
  }
}
