import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, switchMap, tap } from 'rxjs';
import { PagesWalletsManagementService } from 'src/app/pages/wallets/management/pages-wallets-management.service';
import { WalletsManagementItem } from 'src/app/pages/wallets/management/pages-wallets-wallets-management-item.model';
import { IWalletModalData } from 'src/app/pages/wallets/management/wallet-editor/pages-wallets-management-editor.types';
import { WalletsDetailsTransaction } from 'src/app/pages/wallets/wallet-details/pages-wallet-details-item.model';
import { PagesWalletDetailsService } from 'src/app/pages/wallets/wallet-details/pages-wallet-details.service';
import { ITransactionModalData } from 'src/app/pages/wallets/wallet-details/transaction-editor/pages-wallet-transaction.editor.types';
import { SystemNotificationsService } from '../system-notifications/system-notifications.service';

@Injectable({
  providedIn: 'root'
})
export class ModalEditorService {

  constructor(
    private readonly dialog: MatDialog,
    private readonly systemNotificationsService: SystemNotificationsService,
    private readonly myWalletsService: PagesWalletsManagementService,
    private readonly walletDetailsService: PagesWalletDetailsService,
  ) { }

  public openEditor<TType, TObject>(comp: any, modalData: TType | null, object?: TObject): Observable<TObject | null> {

    return this.dialog.open<typeof comp, TType | undefined, TType>(comp, { data: modalData }).afterClosed()
      .pipe(
        switchMap((walletResp: TType | undefined) => {
          return !!walletResp ? this.makeRequest<TType, TObject>(walletResp, object ?? null) : of(null);
      }),
      tap((object: TObject | null) => {
        if(object) {
          this.notify(object, object ? 'updated' : 'created');
        }
      }),
    )
  }

  private makeRequest<TType, TObject>(modalData: TType, object: TObject | null): Observable<any> {

    if(this.isWalletData(modalData as unknown as IWalletModalData)) {
      if(object) {
        const x = object as unknown as WalletsManagementItem;
        const { name } = modalData as unknown as IWalletModalData;
        const wallet = this.myWalletsService.updateWallet(WalletsManagementItem.create({ name, id: x.id! }));

        return wallet;
      } else {
        const { name } = modalData as unknown as IWalletModalData;
        const wallet = this.myWalletsService.createWallet({ name });

        return wallet;
      }
    } else if(this.isTransactionData(modalData as unknown as ITransactionModalData)) {
      if(object) {
        const a = object as unknown as WalletsDetailsTransaction;
        const b = modalData as unknown as ITransactionModalData;
        const n = WalletsDetailsTransaction.createFromModalEditorData(a.id!, b);
        const x = this.walletDetailsService.editWalletTransaction(a.id!, n);

        return x;
      } else {
        const b = modalData as unknown as ITransactionModalData;
        const x = this.walletDetailsService.createWalletTransaction(b);

        return x;
      }
    }
    return of(null);
  }

  private isWalletData(arg: IWalletModalData): arg is IWalletModalData {
    return (arg as IWalletModalData).name !== undefined;
  }

  private isTransactionData(arg: ITransactionModalData): arg is ITransactionModalData {
    return (arg as ITransactionModalData).amount !== undefined;
  }

  private notify<TObject>(updatedWallet: TObject | null, type: string): void {
    const message = !updatedWallet ? 'Sorry. Something went wrong and your wallet was not saved. Contact administrator.' : `Congratulations! Your wallet was ${type} successfully.`;

    if(!updatedWallet) {
      this.systemNotificationsService.showNotification({ message });
      return;
    }

    this.systemNotificationsService.showNotification({ message });
  }
}
