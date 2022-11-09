import { Component, OnInit } from '@angular/core';
import { PagesWalletsMyWalletsService } from './pages-wallets-my-wallets.service';
import { MyWallet } from './pages-wallets-my-wallet.model';
import { TDataState } from '../../../common/http/common.http.types';
import { MatDialog } from '@angular/material/dialog';
import { WalletFormModalComponent } from 'src/app/common/components/modals/dialog-create-or-update-wallet/wallet-form-modal.component';

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
    nowEditWallet: 0,
  };

  public constructor(
    private readonly myWalletsService: PagesWalletsMyWalletsService,
    public dialog: MatDialog,
  ) {}

  public ngOnInit(): void {
    this.myWalletsService.getMyWallets().subscribe({
      next: (data) => {
        this.myWalletsData = {
          data,
          isLoading: false,
          hasError: false,
          nowEditWallet: 0,
        };
      },
      error: () => {
        this.myWalletsData = {
          data: null,
          isLoading: false,
          hasError: true,
          nowEditWallet: 0,
        };
      },
    });
  }

  public addNewWallet(userInputData_: string) {
    this.myWalletsService.addNewWallet(userInputData_).subscribe( (wallet_: MyWallet) => {
        this.myWalletsData.data?.push(wallet_);
    });
  }

  public updateWallet(userInputData_: string) {
    this.myWalletsService.updateNewWallet(this.myWalletsData.nowEditWallet, userInputData_).subscribe( (wallet_: MyWallet) => {
        const walletIndex = this.myWalletsData.data?.findIndex(w => w.id === this.myWalletsData.nowEditWallet);
        if(walletIndex != undefined && walletIndex > -1) {
            this.myWalletsData.data?.splice(walletIndex, 1, wallet_);
        }
    });
  }

  public openWalletModalCallback(id_: number): void {
    this.myWalletsData.nowEditWallet = id_;
    this.openWalletModal(id_);
  }

  public openAddNewWalletModal(): void {
    this.myWalletsData.nowEditWallet = 0;
    this.openWalletModal();
  }

  public openWalletModal(id_: number = 0): void {
    const walletNameInput = id_ == 0 ? "" : this.myWalletsData.data?.find(w => w.id === id_)?.name;
    const dialogRef = this.dialog.open(WalletFormModalComponent, {
        width: '350px',
        height: '300px',
        data: { title: 'Update Wallet', isNewWallet: id_ === 0, inputData: walletNameInput, }
    });

    dialogRef.afterClosed().subscribe(result => {
        if(result) {
            if(this.myWalletsData.nowEditWallet == 0) {
                this.addNewWallet(result);
            } else {
                this.updateWallet(result);
            }
        }
        console.log(result);

    });
  }


}
