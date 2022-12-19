import { Component, OnInit } from '@angular/core';
import { PagesWalletsManagementService } from './pages-wallets-management.service';
import { WalletsManagementItem } from './pages-wallets-wallets-management-item.model';
import { TDataState } from '../../../common/http/common.http.types';
import { MatDialog } from '@angular/material/dialog';
import {
  IWalletModalData,
} from 'src/app/pages/wallets/management/wallet-editor/pages-wallets-management-editor.types';
import { Observable } from 'rxjs';
import { PagesWalletsManagementEditorComponent } from './wallet-editor/pages-wallets-management-editor.component';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications/system-notifications.service';
import { NotificationType } from 'src/app/common/utils/system-notifications/system.notifications.constants';
import { ConfirmDialogService } from '../../../common/confirmation-modal/confirm-dialog.service';
import { LoadingSnackbarService } from '../../../common/loading-modal/loading-snackbar.service'

@Component({
  selector: 'app-wallets-management',
  templateUrl: './pages-wallets-management.component.html',
  styleUrls: ['./pages-wallets-management.component.scss'],
})
export class PagesWalletsManagementComponent implements OnInit {
  public notificationTypes: typeof NotificationType = NotificationType;

  public myWalletsData: TDataState<WalletsManagementItem[]> = {
    isLoading: true,
    data: null,
    hasError: false,
  };

  public constructor(
      private readonly myWalletsService: PagesWalletsManagementService,
      private readonly confirmDialogService: ConfirmDialogService,
      private readonly loadingDialogService: LoadingSnackbarService,
      private readonly systemNotificationsService: SystemNotificationsService,
      private readonly dialog: MatDialog,
  ) {
  }

  public ngOnInit(): void {
    this.myWalletsService.getWallets().subscribe({
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
    this.myWalletsService.createWallet(WalletsManagementItem.create({ name })).subscribe({
        next: (wallet: WalletsManagementItem) => {
          this.myWalletsData.data = [wallet, ...this.myWalletsData.data!];
          this.systemNotificationsService.showNotification({ message: 'Congratulations! Your wallet was created successfully.' });
        },
        error: () => {
          this.systemNotificationsService.showNotification({ message: 'Sorry. Something went wrong and your wallet was not saved. Contact administrator.' });
        },
    });
  }

  public updateWallet({ id }: WalletsManagementItem, { name }: IWalletModalData): void {
    this.myWalletsService.updateWallet(WalletsManagementItem.create({ id: id!, name })).subscribe({
        next: (updatedWallet: WalletsManagementItem) => {
            this.myWalletsData.data = this.myWalletsData.data!.map(walletItem => {
                if (walletItem.id === id) {
                    return updatedWallet;
                }
                return walletItem;
            });
        },
        error: () => {
            this.systemNotificationsService.showNotification({ message: 'Some server error during updating' });
        },
    });
  }

  public handleWalletCreate(): void {
    this.openWalletModal().subscribe( (walletModalData?: IWalletModalData) => {
            if(walletModalData) {
                this.createWallet(walletModalData);
            }
        },
    );
  }

  public handleWalletEdit(wallet: WalletsManagementItem): void {
    this.openWalletModal(wallet).subscribe( (walletModalData?: IWalletModalData) => {
            if (walletModalData === undefined) {
              return;
            }
            this.updateWallet(wallet, walletModalData);
        },
    );
  }

  private openWalletModal(wallet?: WalletsManagementItem): Observable<IWalletModalData | undefined> {
    const dialogRef = this.dialog.open<PagesWalletsManagementEditorComponent, WalletsManagementItem | undefined, IWalletModalData>(PagesWalletsManagementEditorComponent, {
      data: wallet,
    });

    return dialogRef.afterClosed();
  }

  public handleWalletDelete(wallet: WalletsManagementItem): void {
    this.confirmDialogService.openConfirmModal({
      headerText: `Deleting ${wallet.name} wallet`,
      confirmationText: `Are you sure you want to delete ${wallet.name} wallet and all related data?`,
    }).subscribe((result: boolean) => {
      if (!result) {
        return;
      }
      this.deleteWallet(wallet);
    });
  }

  private deleteWallet(wallet: WalletsManagementItem): void {
    this.loadingDialogService.show('Deleting wallet')

    this.myWalletsService.deleteWallet(wallet).subscribe({
          next: () => {
            this.loadingDialogService.hide();
            this.myWalletsData.data = this.myWalletsData.data!.filter(data => data.id !== wallet.id);
          },
          error: () => {
            this.loadingDialogService.hide();
          },
        },
    )
  }
}
