import { Component, OnInit } from '@angular/core';
import { PagesWalletsMyWalletsService } from './pages-wallets-my-wallets.service';
import { MyWallet } from './pages-wallets-my-wallet.model';
import { TDataState } from '../../../common/http/common.http.types';
import { MatDialog } from '@angular/material/dialog';
import { WalletFormModalComponent } from 'src/app/pages/wallets/my-wallets/wallet-form-modal/dialog-create-or-update-wallet/wallet-form-modal.component';
import { IWalletModalData } from 'src/app/pages/wallets/my-wallets/wallet-form-modal/domains.wallet-modal.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-wallets',
  templateUrl: './pages-wallets-my-wallets.component.html',
  styleUrls: ['./pages-wallets-my-wallets.component.scss']
})
export class PagesWalletsMyWalletsComponent implements OnInit {
  //private nowEditWallet?: number;

  public myWalletsData: TDataState<MyWallet[]> = {
    isLoading: true,
    data: null,
    hasError: false,
  };

  public constructor(
    private readonly myWalletsService: PagesWalletsMyWalletsService,
    private dialog: MatDialog,
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

  public addNewWallet(walletModalData: IWalletModalData) {
    this.myWalletsService.addNewWallet(walletModalData.name).subscribe( (wallet: MyWallet) => {
        this.myWalletsData.data = [wallet, ...this.myWalletsData.data!]
    });
  }

  public updateWallet(wallet: MyWallet, walletModalData: IWalletModalData) {
    this.myWalletsService.updateNewWallet(wallet.id, walletModalData.name).subscribe( (updatedWallet: MyWallet) => {
        this.myWalletsData.data = this.myWalletsData?.data!.map(walletItem => {
            if (walletItem.id === wallet.id) {
                return updatedWallet;
            }
            return walletItem;
        });
    });
  }

  public handleWalletCreate() {
    this.openWalletModal().subscribe( (response: IWalletModalData) => {
      this.addNewWallet(response);
    })
  }

  public handleWalletEdit(wallet: MyWallet) {
    this.openWalletModal(wallet).subscribe( (response: IWalletModalData) => {
      this.updateWallet(wallet, response);
    })
  }

  private openWalletModal(wallet: MyWallet | undefined = undefined): Observable<IWalletModalData> {
    const dialogRef = this.dialog.open(WalletFormModalComponent, {
      data: wallet
    });
    return dialogRef.afterClosed();
  }
}