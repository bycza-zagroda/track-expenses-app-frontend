import { Component, OnInit } from '@angular/core';
import { PagesWalletsMyWalletsService } from './pages-wallets-my-wallets.service';
import { MyWallet } from './pages-wallets-my-wallet.model';
import { TDataState } from '../../../common/http/common.http.types';
import { MatDialog } from '@angular/material/dialog';
import { WalletFormModalComponent } from 'src/app/pages/wallets/my-wallets/modals/dialog-create-or-update-wallet/wallet-form-modal.component';
import { IWalletModalData } from 'src/app/domains/wallet-modal/domains.wallet-modal.types';

@Component({
  selector: 'app-my-wallets',
  templateUrl: './pages-wallets-my-wallets.component.html',
  styleUrls: ['./pages-wallets-my-wallets.component.scss']
})
export class PagesWalletsMyWalletsComponent implements OnInit {
  private nowEditWallet?: number;

  public myWalletsData: TDataState<MyWallet[]> = {
    isLoading: true,
    data: null,
    hasError: false,
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

  public addNewWallet(userInputData: string) {
    this.myWalletsService.addNewWallet(userInputData).subscribe( (wallet: MyWallet) => {
        this.myWalletsData.data = [wallet, ...this.myWalletsData.data!]
    });
  }

  public updateWallet(userInputData: string) {
    this.myWalletsService.updateNewWallet(this.nowEditWallet!, userInputData).subscribe( (walletResponse: MyWallet) => {
        this.myWalletsData.data = this.myWalletsData?.data?.map(wallet => {
            if (wallet.id === this.nowEditWallet) {
                return walletResponse;
            }
            return wallet;
        }) as MyWallet[];
    });
  }

  public openWalletModal(wallet: MyWallet | undefined = undefined): void {
    this.nowEditWallet = wallet?.id;
    const dialogRef = this.dialog.open(WalletFormModalComponent, {
        data: wallet
    });

    dialogRef.afterClosed().subscribe((result: IWalletModalData | null) => {
        if(result) {
            if(this.nowEditWallet != undefined) {
                this.updateWallet(result.name);
            } else {
                this.addNewWallet(result.name);
            }
        }
    });
  }
}