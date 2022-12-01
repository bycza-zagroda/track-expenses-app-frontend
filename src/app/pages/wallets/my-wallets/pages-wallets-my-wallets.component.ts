import { Component, OnInit } from '@angular/core';
import { PagesWalletsMyWalletsService } from './pages-wallets-my-wallets.service';
import { MyWallet } from './pages-wallets-my-wallet.model';
import { TDataState } from '../../../common/http/common.http.types';
import { MatDialog } from '@angular/material/dialog';
import { IWalletModalData } from 'src/app/pages/wallets/my-wallets/wallet-form-modal/pages-wallets-my-wallets-wallet-form-modal';
import { Observable } from 'rxjs';
import { WalletFormModalComponent } from './wallet-form-modal/wallet-form-modal.component';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications.service';
import { NotificationType } from 'src/app/domains/wallets/domains.wallets.enums';

@Component({
  selector: 'app-my-wallets',
  templateUrl: './pages-wallets-my-wallets.component.html',
  styleUrls: ['./pages-wallets-my-wallets.component.scss'],
})
export class PagesWalletsMyWalletsComponent implements OnInit {

  public myWalletsData: TDataState<MyWallet[]> = {
    isLoading: true,
    data: null,
    hasError: false,
  };

  public constructor(
    private readonly myWalletsService: PagesWalletsMyWalletsService,
    private readonly dialog: MatDialog,
    private readonly systemNotificationsService: SystemNotificationsService,
  ) {}

  public ngOnInit(): void {
    this.myWalletsService.getMyWallets().subscribe({
      next: (data) => {
        this.myWalletsData = {
          data,
          isLoading: false,
          hasError: false,
        };
      },
      error: () => {
        this.myWalletsData = {
          data: null,
          isLoading: false,
          hasError: true,
        };
      },
    });
  }

  public createWallet({ name }: IWalletModalData): void {
    this.myWalletsService.createWallet(MyWallet.create({ name })).subscribe({
        next: (wallet: MyWallet) => {
            this.myWalletsData.data = [wallet, ...this.myWalletsData.data!];
        },
        error: () => {
            this.systemNotificationsService.showNotification({ message: 'Some server error during creating', type: NotificationType.Error });
        },
    });
  }

  public updateWallet({ id }: MyWallet, { name }: IWalletModalData): void {
    this.myWalletsService.updateWallet(MyWallet.create({ id: id!, name })).subscribe({
        next: (updatedWallet: MyWallet) => {
            this.myWalletsData.data = this.myWalletsData.data!.map(walletItem => {
                if (walletItem.id === id) {
                    return updatedWallet;
                }
                return walletItem;
            });
        },
        error: () => {
            this.systemNotificationsService.showNotification({ message: 'Some server error during updating', type: NotificationType.Error });
        },
    });
  }

  public handleWalletCreate(): void {
    this.openWalletModal().subscribe({
        next: (walletModalData?: IWalletModalData) => {
            if(walletModalData) {
                this.createWallet(walletModalData);
            }
        },
        error: () => {
            this.systemNotificationsService.showNotification({ message: 'Some modal error during creating', type: NotificationType.Error });
        },
    });
  }

  public handleWalletEdit(wallet: MyWallet): void {
    this.openWalletModal(wallet).subscribe({
        next: (walletModalData?: IWalletModalData) => {
            if (walletModalData === undefined) {
              return;
            }
            this.updateWallet(wallet, walletModalData);
        },
        error: () => {
            this.systemNotificationsService.showNotification({ message: 'Some modal error during ypdating', type: NotificationType.Error });
        },
    });
  }

  private openWalletModal(wallet?: MyWallet): Observable<IWalletModalData | undefined> {
    const dialogRef = this.dialog.open<WalletFormModalComponent, MyWallet | undefined, IWalletModalData>(WalletFormModalComponent, {
      data: wallet,
    });

    return dialogRef.afterClosed();
  }
}
