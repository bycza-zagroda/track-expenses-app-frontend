import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationModalComponent } from './confirmation-modal.component';
import { IConfirmationModalData } from '../model/confirmation-modal.types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  public constructor(private readonly dialog: MatDialog) {
  }

  public openConfirmModal(config: IConfirmationModalData): Observable<boolean | undefined> {
    return this.dialog.open<ConfirmationModalComponent, IConfirmationModalData, boolean>(ConfirmationModalComponent, {
      data: config,
    }).afterClosed()
  }
}
