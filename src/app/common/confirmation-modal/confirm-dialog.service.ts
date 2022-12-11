import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from './confirmation-modal.component';
import { IConfirmationModalData } from './confirmation-modal.types';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  public constructor(private readonly dialog: MatDialog) {
  }

  public openConfirmModal(config: IConfirmationModalData): Observable<boolean> {
    return this.dialog.open<ConfirmationModalComponent, IConfirmationModalData, boolean>(ConfirmationModalComponent, {
      data: config,
    }).afterClosed().pipe(
        map((val: boolean | undefined) => !!val),
    )
  }
}
