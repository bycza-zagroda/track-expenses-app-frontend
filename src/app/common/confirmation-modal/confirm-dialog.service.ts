import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationModalComponent } from './confirmation-modal.component';
import { IConfirmationModalData } from '../model/confirmation-modal.types';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  public constructor(private readonly dialog: MatDialog) {
  }

  public openConfirmModal(config: IConfirmationModalData): MatDialogRef<ConfirmationModalComponent, boolean> {
    return this.dialog.open(ConfirmationModalComponent, {
      data: config,
    });
  }
}
