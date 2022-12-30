import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TDataState } from 'src/app/common/http/common.http.types';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications/system-notifications.service';
import { PagesWalletsManagementService } from '../management/pages-wallets-management.service';
import { WalletsManagementItem } from '../management/pages-wallets-wallets-management-item.model';
import { PagesWalletsManagementEditorComponent } from '../management/wallet-editor/pages-wallets-management-editor.component';
import { IWalletModalData } from '../management/wallet-editor/pages-wallets-management-editor.types';
import { WalletsDetailsTransaction } from './pages-wallet-details-item.model';
import { PagesWalletDetailsService } from './pages-wallet-details.service';
import { WalletTransactionType } from './pages-wallet-details.types';

@Component({
  selector: 'app-pages-wallet-details',
  templateUrl: './pages-wallet-details.component.html',
  styleUrls: ['./pages-wallet-details.component.scss'],
})
export class PagesWalletDetailsComponent implements OnInit {

  toppings = new FormControl('');

  public walletTransactionType: typeof WalletTransactionType = WalletTransactionType;

  public selectedTransactionType: WalletTransactionType = WalletTransactionType.AllTransaction;

  public displayedColumns: string[] = ['date', 'description', 'amount', 'actions'];

  public walletsManagementItem?: WalletsManagementItem;

  public displayedTransactions: WalletsDetailsTransaction[] = [];

  public walletsDetailsData: TDataState<WalletsDetailsTransaction[]> = {
    data: null,
    hasError: false,
    isLoading: true,
  }

  public constructor(
    private readonly pagesWalletDetailsService: PagesWalletDetailsService,
    private readonly myWalletsService: PagesWalletsManagementService,
    private readonly systemNotificationsService: SystemNotificationsService,
    private readonly dialog: MatDialog,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this.activatedRoute.data.subscribe( ({ wallet }) => {
      this.walletsManagementItem = wallet;
      this.initWalletDetails(wallet);
    });

    this.toppings.valueChanges.subscribe((data) => {
      console.log(data);
      this.filterTransactions(data as WalletTransactionType);
    });
  }

  private initWalletDetails = (wallet: WalletsManagementItem) => {
    this.pagesWalletDetailsService.getWalletsDetails(wallet.id!).subscribe({
      next: (data) => {
        this.displayedTransactions = data;
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

  private filterTransactions = (type: WalletTransactionType) => {
    if(type == WalletTransactionType.Expences) {
      this.displayedTransactions = this.walletsDetailsData.data!.filter( (item: WalletsDetailsTransaction) => item.amount < 0);
    } else if(type == WalletTransactionType.Incomes) {
      this.displayedTransactions = this.walletsDetailsData.data!.filter( (item: WalletsDetailsTransaction) => item.amount >= 0);
    } else {
      this.displayedTransactions = this.walletsDetailsData.data!;
    }
  }

  private openWalletModal(wallet?: WalletsManagementItem): Observable<IWalletModalData | undefined> {
    const dialogRef = this.dialog.open<PagesWalletsManagementEditorComponent, WalletsManagementItem | undefined, IWalletModalData>(PagesWalletsManagementEditorComponent, {
      data: wallet,
    });

    return dialogRef.afterClosed();
  }

  public handleWalletEdit(): void {
    this.openWalletModal(this.walletsManagementItem).subscribe((walletModalData?: IWalletModalData) => {
      if (walletModalData === undefined) {
        return;
      }
      this.updateWallet(walletModalData);
    });
  }

  public updateWallet({ name }: IWalletModalData): void {
    const updatedWallet = WalletsManagementItem.create({ id: this.walletsManagementItem!.id!, name, creationDate: this.walletsManagementItem!.createdAt.toString() });

    this.myWalletsService.updateWallet(updatedWallet).subscribe({
      next: () => {
        this.walletsManagementItem = updatedWallet;
      },
      error: () => {
        this.systemNotificationsService.showNotification({ message: 'Some server error during updating' });
      },
    });
  }

  public onTransactionTypeChange(event: MatSelectChange): void {
    this.selectedTransactionType = event.value as WalletTransactionType;
  }
}
