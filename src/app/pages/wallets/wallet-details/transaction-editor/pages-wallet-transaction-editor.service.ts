import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, finalize, Observable, of, switchMap, tap } from 'rxjs';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications/system-notifications.service';
import { WalletTransaction } from '../pages-wallet-details-item.model';
import { PagesWalletDetailsService } from '../pages-wallet-details.service';
import { PagesWalletTransactionEditorComponent } from './pages-wallet-transaction-editor.component';
import { NotificationType } from '../../../../common/utils/system-notifications/system.notifications.constants';
import { LoadingSnackbarService } from '../../../../common/loading-modal/loading-snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class PagesWalletTransactionEditorService {
  public constructor(
    private readonly dialog: MatDialog,
    private readonly systemNotificationsService: SystemNotificationsService,
    private readonly pagesWalletDetailsService: PagesWalletDetailsService,
    private readonly loadingService: LoadingSnackbarService,
  ) { }

  public openEditor(transaction: WalletTransaction): Observable<WalletTransaction | null> {
    return this.dialog.open<PagesWalletTransactionEditorComponent, WalletTransaction, WalletTransaction>(
      PagesWalletTransactionEditorComponent,
      {
        data: transaction,
      },
    ).afterClosed().pipe(
      switchMap(transaction => {
        if (!transaction) {
          return of(null);
        }

        return this.makeRequest(transaction).pipe(
          tap(() => this.systemNotificationsService.showNotification({
            message: 'Transaction saved successfully',
            type: NotificationType.Success,
          })),
          finalize(() => {
            this.loadingService.hide();
          }),
          catchError(() => {
            this.systemNotificationsService.showNotification({
              message: 'Saving transaction failed',
              type: NotificationType.Error,
            });

            return of(null);
          }),
        );
      }),
    );
  }

  private makeRequest(transaction: WalletTransaction): Observable<WalletTransaction> {
    this.loadingService.show('Saving transaction');

    return transaction.id ?
      this.pagesWalletDetailsService.editWalletTransaction(transaction) :
      this.pagesWalletDetailsService.createWalletTransaction(transaction);
  }
}
