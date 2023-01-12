import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, switchMap, tap } from 'rxjs';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications/system-notifications.service';
import { WalletTransactionType } from 'src/app/domains/wallets/domains.wallets.types';
import { WalletsDetailsTransaction } from '../pages-wallet-details-item.model';
import { PagesWalletDetailsService } from '../pages-wallet-details.service';
import { PagesWalletTransactionEditorComponent } from './pages-wallet-transaction-editor.component';
import { ITransactionModalData } from './pages-wallet-transaction.editor.types';

// @Injectable({
//   providedIn: 'root',
// })
// export class PagesWalletTransactionEditorService {

//   constructor(
//     private readonly dialog: MatDialog,
//     private readonly systemNotificationsService: SystemNotificationsService,
//     private readonly walletDetailsService: PagesWalletDetailsService,
//   ) { }

//   public openTransactionEditor(type: WalletTransactionType, transaction?: WalletsDetailsTransaction): Observable<WalletsDetailsTransaction | null> {

//     return this.dialog.open(PagesWalletTransactionEditorComponent, {
//       data: {
//         type,
//         amount: transaction?.amount,
//         description: transaction?.amount ?? '',
//         date: transaction?.date,
//       },
//     })
//     .afterClosed().pipe(
//       switchMap((transactionModelData: ITransactionModalData | undefined) => {
//         return !!transactionModelData ? this.makeRequest(transactionModelData, transaction ?? null) : of(null);
//       }),
//       tap((w: WalletsDetailsTransaction | null) => {
//         if (w) {
//           this.notify(w, transaction ? 'updated' : 'created');
//         }
//       }),
//     )
//   }

//   private makeRequest(transactionModelData: ITransactionModalData, transaction: WalletsDetailsTransaction | null): Observable<WalletsDetailsTransaction> {
//     return transaction ?
//       this.walletDetailsService.editWalletTransaction(transaction!.id!, WalletsDetailsTransaction.create(transactionModelData))
//         :
//       this.walletDetailsService.createWalletTransaction(transactionModelData);
//   }

//   private notify(updatedTransaction: WalletsDetailsTransaction | null, type: string): void {
//     const message = !updatedTransaction ? 'Sorry. Something went wrong and your wallet was not saved. Contact administrator.' : `Congratulations! Your wallet was ${type} successfully.`;

//     if (!updatedTransaction) {
//       this.systemNotificationsService.showNotification({ message });
//       return;
//     }

//     this.systemNotificationsService.showNotification({ message });
//   }
// }
