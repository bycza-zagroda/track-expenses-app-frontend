import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, switchMap, tap } from 'rxjs';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications/system-notifications.service';
import { WalletsDetailsTransaction } from '../pages-wallet-details-item.model';
import { PagesWalletDetailsService } from '../pages-wallet-details.service';
import { PagesWalletTransactionEditorComponent } from './pages-wallet-transaction-editor.component';
import { ITransactionModalData } from './pages-wallet-transaction.editor.types';

@Injectable({
  providedIn: 'root',
})
export class PagesWalletTransactionEditorService {
  public constructor(
    private readonly dialog: MatDialog,
    private readonly systemNotificationsService: SystemNotificationsService,
    private readonly pagesWalletDetailsService: PagesWalletDetailsService,
  ) { }

  public openEditor(transaction: Partial<WalletsDetailsTransaction>): Observable<WalletsDetailsTransaction | null> {
    return this.dialog.open<PagesWalletTransactionEditorComponent, Partial<ITransactionModalData>, ITransactionModalData>(
      PagesWalletTransactionEditorComponent, {
        data: {
          amount: transaction.amount ?? 100,
          description: transaction.description ?? '',
          date: transaction.date ?? new Date(),
          type: transaction.type,
        },
      }).afterClosed().pipe(
      switchMap((transactionResp: ITransactionModalData | undefined) => {
        return !!transactionResp ? this.makeRequest(transactionResp, transaction) : of(null);
      }),
      tap((w: WalletsDetailsTransaction | null) => {
        if(w) {
          this.notify(w, transaction.id ? 'updated' : 'created');
        }
      }),
    );
  }

  private makeRequest(transactionModalData: ITransactionModalData, transaction: Partial<WalletsDetailsTransaction> | null)
  : Observable<WalletsDetailsTransaction> {
    return transaction?.id !== undefined ?
      this.pagesWalletDetailsService.editWalletTransaction(transaction.id!,
        WalletsDetailsTransaction.createFromModalEditorData(transaction.id!, transactionModalData)) :
      this.pagesWalletDetailsService.createWalletTransaction(transactionModalData);
  }

  private notify(updatedWallet: WalletsDetailsTransaction | null, type: string): void {
    const message = !updatedWallet ?
      'Sorry. Something went wrong and your transaction was not saved. Contact administrator.' :
      `Congratulations! Your transaction was ${type} successfully.`;

    if(!updatedWallet) {
      this.systemNotificationsService.showNotification({ message });

      return;
    }

    this.systemNotificationsService.showNotification({ message });
  }
}
