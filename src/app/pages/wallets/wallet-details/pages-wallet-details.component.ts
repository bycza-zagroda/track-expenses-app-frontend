import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { Observable } from 'rxjs';
import { TDataState } from 'src/app/common/http/common.http.types';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications/system-notifications.service';
import { PagesWalletsManagementService } from '../management/pages-wallets-management.service';
import { WalletsManagementItem } from '../management/pages-wallets-wallets-management-item.model';
import { PagesWalletsManagementEditorComponent } from '../management/wallet-editor/pages-wallets-management-editor.component';
import { IWalletModalData } from '../management/wallet-editor/pages-wallets-management-editor.types';
import { WalletDetailsItem } from './pages-wallet-details-item.model';
import { PagesWalletDetailsService } from './pages-wallet-details.service';
import { WalletTransactionType } from './pages-wallet-details.types';

@Component({
  selector: 'app-pages-wallet-details',
  templateUrl: './pages-wallet-details.component.html',
  styleUrls: ['./pages-wallet-details.component.scss'],
})
export class PagesWalletDetailsComponent implements OnInit {

  public walletTransactionType: typeof WalletTransactionType = WalletTransactionType;

  public transactionsTypes: string[] = [
    'allTransactions',
    'incomes',
    'expences',
  ];

  public selectedTransactionType: WalletTransactionType = WalletTransactionType.allTransaction;

  public displayedColumns: string[] = ['id', 'date', 'description', 'amount', 'actions'];

  public walletsDetailsData: TDataState<WalletDetailsItem> = {
    data: null,
    hasError: false,
    isLoading: true,
  }

  public constructor(
    private pagesWalletDetailsService: PagesWalletDetailsService,
    private readonly myWalletsService: PagesWalletsManagementService,
    private readonly systemNotificationsService: SystemNotificationsService,
    private readonly dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
    this.pagesWalletDetailsService.getWalletsDetails(1).subscribe({
      next: (data) => {
        this.walletsDetailsData = {
          data,
          hasError: false,
          isLoading: false,
        }
      },
      error: () => {
        this.walletsDetailsData = {
          data: null,
          isLoading: false,
          hasError: true,
        };
      },
    })
  }

  private openWalletModal(wallet?: WalletDetailsItem): Observable<IWalletModalData | undefined> {
    const dialogRef = this.dialog.open<PagesWalletsManagementEditorComponent, WalletDetailsItem | undefined, IWalletModalData>(PagesWalletsManagementEditorComponent, {
      data: wallet,
    });

    return dialogRef.afterClosed();
  }

  public handleWalletEdit(wallet: WalletDetailsItem): void {
    this.openWalletModal(wallet).subscribe((walletModalData?: IWalletModalData) => {
      if (walletModalData === undefined) {
        return;
      }
      this.updateWallet(wallet, walletModalData);
    });
  }

  public updateWallet({ id }: WalletDetailsItem, { name }: IWalletModalData): void {
    this.myWalletsService.updateWallet(WalletsManagementItem.create({ id: id!, name })).subscribe({
      next: (updatedWallet: WalletsManagementItem) => {
        this.walletsDetailsData.data = WalletDetailsItem.updateWalletDetailsItemName(this.walletsDetailsData.data!, updatedWallet.name);
      },
      error: () => {
        this.systemNotificationsService.showNotification({ message: 'Some server error during updating' });
      },
    });
  }


  public onTransactionTypeChange(event: MatSelectChange): void {
    this.selectedTransactionType = event.value as WalletTransactionType;
  }


  //TOCHECK w template czy tutaj?
  // public setAmountColor = (amount: number): string => {
  //   return amount < 0 ? 'red' : 'green';
  // }

}
