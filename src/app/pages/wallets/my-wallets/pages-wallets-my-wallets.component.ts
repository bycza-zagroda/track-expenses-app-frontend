import { Component, OnInit } from '@angular/core';
import { PagesWalletsMyWalletsService } from './pages-wallets-my-wallets.service';
import { MyWallet } from './pages-wallets-my-wallet.model';
import { TDataState } from '../../../common/http/common.http.types';
import { MatDialog } from '@angular/material/dialog';
import { IWalletModalData } from 'src/app/pages/wallets/my-wallets/wallet-form-modal/pages-wallets-my-wallets-wallet-form-modal';
import { Observable } from 'rxjs';
import { WalletFormModalComponent } from './wallet-form-modal/wallet-form-modal.component';

@Component({
  selector: 'app-my-wallets',
  templateUrl: './pages-wallets-my-wallets.component.html',
  styleUrls: ['./pages-wallets-my-wallets.component.scss']
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

  public createWallet({ name }: IWalletModalData) {
    this.myWalletsService.createWallet(MyWallet.create({ name })).subscribe( (wallet: MyWallet) => {
        this.myWalletsData.data = [wallet, ...this.myWalletsData.data!]
    });
  }

  public updateWallet({ id }: MyWallet, { name }: IWalletModalData) {
    this.myWalletsService.updateWallet(MyWallet.create({ id: id!, name })).subscribe( (updatedWallet: MyWallet) => {
        this.myWalletsData.data = this.myWalletsData?.data!.map(walletItem => {
            if (walletItem.id === id) {
                return updatedWallet;
            }

            return walletItem;
        });
    });
  }

  public handleWalletCreate() {
    this.openWalletModal().subscribe( (walletModalData: IWalletModalData) => {
      this.createWallet(walletModalData);
    })
  }

  public handleWalletEdit(wallet: MyWallet) {
    this.openWalletModal(wallet).subscribe( (walletModalData: IWalletModalData) => {
      this.updateWallet(wallet, walletModalData);
    })
  }

  private openWalletModal(wallet?: MyWallet): Observable<IWalletModalData> {
    const dialogRef = this.dialog.open(WalletFormModalComponent, {
      data: wallet
    });

    return dialogRef.afterClosed();
  }
}