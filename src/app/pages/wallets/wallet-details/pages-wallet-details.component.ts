import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { TDataState } from 'src/app/common/http/common.http.types';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications/system-notifications.service';
import { WalletTransactionType } from 'src/app/domains/wallets/domains.wallets.types';
import { PagesWalletsManagementService } from '../management/pages-wallets-management.service';
import { WalletsManagementItem } from '../management/pages-wallets-wallets-management-item.model';
import { PagesWalletsManagementEditorComponent } from '../management/wallet-editor/pages-wallets-management-editor.component';
import { IWalletModalData } from '../management/wallet-editor/pages-wallets-management-editor.types';
import { WalletsDetailsTransaction } from './pages-wallet-details-item.model';
import { PagesWalletDetailsService } from './pages-wallet-details.service';

@Component({
  selector: 'app-pages-wallet-details',
  templateUrl: './pages-wallet-details.component.html',
  styleUrls: ['./pages-wallet-details.component.scss'],
})
export class PagesWalletDetailsComponent implements OnInit, OnDestroy {

  public selectTransactionsTypes: Record<string, WalletTransactionType | null> = {
    'All transactions': null,
    'Incomes': WalletTransactionType.Incomes,
    'Expenses': WalletTransactionType.Expenses,
  }

  public selectedTransactionType: Record<string, WalletTransactionType | null> = this.selectTransactionsTypes;

  public transactionsTypeForm = new FormControl(this.selectedTransactionType);

  private transactionTypeSub?: Subscription;

  public walletTransactionType: typeof WalletTransactionType = WalletTransactionType;

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

    this.transactionTypeSub = this.transactionsTypeForm.valueChanges.subscribe((data) => {
      this.filterTransactions(data as Record<string, WalletTransactionType | null>);
    });
  }

  private initWalletDetails = (wallet: WalletsManagementItem): void => {
    this.pagesWalletDetailsService.getWalletTransactions(wallet.id!).subscribe({
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

  private filterTransactions(type: Record<string, WalletTransactionType | null>): void {
    this.displayedTransactions = this.walletsDetailsData.data!.filter( (item: WalletsDetailsTransaction) =>  (type == null) ? true : type.toString() == item.type.toString() );
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

  public ngOnDestroy(): void {
    this.transactionTypeSub?.unsubscribe();
  }
}
