import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map, tap } from 'rxjs';
import { TransactionCategoryDeletingModalComponent } from './transaction-category-deleting-modal.component';
import { ITransactionCategoryDeletingModalData } from './transaction-category-deleting-modal.types';

@Injectable({
  providedIn: 'root'
})
export class TransactionCategoryDeletingModalService {
  public constructor(private readonly dialog: MatDialog) {
  }

  public openDeletingModal(config: ITransactionCategoryDeletingModalData): Observable<boolean> {
    return this.dialog.open<TransactionCategoryDeletingModalComponent, ITransactionCategoryDeletingModalData, boolean>(TransactionCategoryDeletingModalComponent, {
      data: config,
    }).afterClosed().pipe(
      map((val: boolean | undefined) => !!val),
    );
  }
}
