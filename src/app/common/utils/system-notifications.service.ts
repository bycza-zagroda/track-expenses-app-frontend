import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { INotification } from 'src/app/domains/wallets/domains.wallets.types';

@Injectable({
  providedIn: 'root'
})
export class SystemNotificationsService {

    public constructor(
        private readonly snackBar: MatSnackBar,
      ) { }

      public showNotification({ type, message }: INotification): void {
        this.snackBar.open(message, 'OK', {
            panelClass: type, // ??
        });
      }
}
