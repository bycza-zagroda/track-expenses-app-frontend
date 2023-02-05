import { Component, OnInit } from '@angular/core';
import { PagesWalletsManagementService } from './pages-wallets-management.service';
import { WalletsManagementItem } from './pages-wallets-wallets-management-item.model';
import { TDataState } from '../../../common/http/common.http.types';
import { NotificationType } from 'src/app/common/utils/system-notifications/system.notifications.constants';
import { ConfirmDialogService } from '../../../common/confirmation-modal/confirm-dialog.service';
import { LoadingSnackbarService } from '../../../common/loading-modal/loading-snackbar.service';
import { PagesWalletsManagementEditorService } from './wallet-editor/pages-wallets-management-editor.service';
import { Router } from '@angular/router';
import { SystemNotificationsService } from '../../../common/utils/system-notifications/system-notifications.service';

@Component({
  selector: 'app-wallets-management',
  templateUrl: './pages-wallets-management.component.html',
  styleUrls: [ './pages-wallets-management.component.scss' ],
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
    private readonly modalEditorService: PagesWalletsManagementEditorService,
    private readonly notificationService: SystemNotificationsService,
    private readonly router: Router,
  ) {
  }

  public ngOnInit(): void {
    this.myWalletsService.getWallets().subscribe({
      next: (data: WalletsManagementItem[]) => {
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

  public handleWalletCreate(): void {
    this.modalEditorService.openEditor(WalletsManagementItem.create({})).subscribe( (data: WalletsManagementItem | null) => {
      if(data) {
        this.createWallet(data);
      }
    });
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

  public handleWalletEdit(wallet: WalletsManagementItem): void {
    this.modalEditorService.openEditor(wallet).subscribe( (data: WalletsManagementItem | null) => {
      if(data) {
        this.updateWallet(wallet, data);
      }
    });
  }

  public async goToWalletDetails(wallet: WalletsManagementItem): Promise<void> {
    await this.router.navigate([ `/wallets/${wallet.id!}` ]);
  }

  private createWallet(wallet: WalletsManagementItem): void {
    this.myWalletsData.data = [ wallet, ...this.myWalletsData.data! ].sort().reverse();
  }

  private updateWallet(wallet: WalletsManagementItem, { name }: WalletsManagementItem): void {
    this.myWalletsData.data = this.myWalletsData.data!.map(walletItem => {
      if (walletItem.id === wallet.id) {
        return WalletsManagementItem.create({ id: wallet.id!, name });
      }

      return walletItem;
    }).sort((previousWallet, nextWallet) => previousWallet.name.localeCompare(nextWallet.name));
  }

  private deleteWallet(wallet: WalletsManagementItem): void {
    this.loadingDialogService.show('Deleting wallet');

    this.myWalletsService.deleteWallet(wallet).subscribe({
      next: () => {
        this.loadingDialogService.hide();
        this.myWalletsData.data = this.myWalletsData.data!.filter(data => data.id !== wallet.id);
        this.notificationService.showNotification({ message: 'Wallet deleted succesfully', type: NotificationType.Success });
      },
      error: () => {
        this.loadingDialogService.hide();
        this.notificationService.showNotification({ message: 'Deleting wallet failed', type: NotificationType.Error });
      },
    },
    );
  }
}
