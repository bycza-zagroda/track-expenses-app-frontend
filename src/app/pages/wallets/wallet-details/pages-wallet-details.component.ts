import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ConfirmDialogService } from 'src/app/common/confirmation-modal/confirm-dialog.service';
import { TDataState, TServerEntityId } from 'src/app/common/http/common.http.types';
import { LoadingSnackbarService } from 'src/app/common/loading-modal/loading-snackbar.service';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications/system-notifications.service';
import { WalletTransactionType } from 'src/app/domains/transactions/domains.transactions.constants';
import { WalletSelectionValue } from 'src/app/domains/transactions/domains.transactions.types';
import { WalletsManagementItem } from '../management/pages-wallets-wallets-management-item.model';
import { PagesWalletsManagementEditorService } from '../management/wallet-editor/pages-wallets-management-editor.service';
import { IWalletModalData } from '../management/wallet-editor/pages-wallets-management-editor.types';
import { WalletTransaction } from './pages-wallet-details-item.model';
import { PagesWalletDetailsService } from './pages-wallet-details.service';
import { PagesWalletTransactionEditorService } from './transaction-editor/pages-wallet-transaction-editor.service';
import { NotificationType } from '../../../common/utils/system-notifications/system.notifications.constants';

@Component({
  selector: 'app-pages-wallet-details',
  templateUrl: './pages-wallet-details.component.html',
  styleUrls: [ './pages-wallet-details.component.scss' ],
})
export class PagesWalletDetailsComponent implements OnInit, OnDestroy {
  public selectTransactionsTypes: Record<string, WalletSelectionValue> = {
    'All transactions': '',
    'Incomes': WalletTransactionType.Incomes,
    'Expenses': WalletTransactionType.Expenses,
  };

  public transactionsTypeForm = new FormControl<WalletSelectionValue>('');
  public walletTransactionType: typeof WalletTransactionType = WalletTransactionType;
  public displayedColumns: string[] = [ 'date', 'description', 'amount', 'actions' ];
  public walletsManagementItem: WalletsManagementItem | null = null;
  public displayedTransactions: WalletTransaction[] = [];

  public walletsDetailsData: TDataState<WalletTransaction[]> = {
    data: null,
    hasError: false,
    isLoading: true,
  };

  private transactionTypeSub!: Subscription;

  public constructor(
    private readonly pagesWalletDetailsService: PagesWalletDetailsService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly pagesWalletTransactionEditorService: PagesWalletTransactionEditorService,
    private readonly pagesWalletsManagementEditorService: PagesWalletsManagementEditorService,
    private readonly confirmDialogService: ConfirmDialogService,
    private readonly loadingDialogService: LoadingSnackbarService,
    private readonly systemNotificationsService: SystemNotificationsService,
  ) { }

  public ngOnInit(): void {
    this.activatedRoute.data.subscribe( ({ wallet }) => {
      if (!(wallet instanceof WalletsManagementItem)) {
        return;
      }

      this.walletsManagementItem = wallet;
      this.getWalletTransactions(wallet.id!);

      this.transactionTypeSub = this.transactionsTypeForm.valueChanges
        .subscribe(() => {
          this.filterTransactions();
        });
    });
  }

  public handleWalletEdit(): void {
    this.pagesWalletsManagementEditorService.openEditor(this.walletsManagementItem!)
      .subscribe( (wallet: WalletsManagementItem | null) => {
        if(wallet) {
          this.updateWallet(wallet);
        }
      });
  }

  public handleCreateTransaction(type: WalletTransactionType): void {
    this.pagesWalletTransactionEditorService
      .openEditor(WalletTransaction.create({ type, walletId: this.walletsManagementItem!.id! }))
      .subscribe( (transaction: WalletTransaction | null) => {
        if(transaction) {
          this.createTransaction(transaction);
        }
      });
  }

  public handleEditTransaction(transaction: WalletTransaction): void {
    this.pagesWalletTransactionEditorService.openEditor(transaction)
      .subscribe( (transaction: WalletTransaction | null) => {
        if(transaction) {
          this.updateTransaction(transaction);
        }
      });
  }

  public handleRemoveTransaction(transaction: WalletTransaction): void {
    this.confirmDialogService.openConfirmModal({
      headerText: 'Remove Transaction',
      confirmationText: 'Are you sure you want to remove transaction?',
    }).subscribe( (modalResponse: boolean | null) => {
      if(modalResponse) {
        this.removeTransaction(transaction);
      }
    });
  }

  public ngOnDestroy(): void {
    this.transactionTypeSub.unsubscribe();
  }

  private getWalletTransactions(walletId: TServerEntityId): void {
    this.pagesWalletDetailsService.getWalletTransactions(walletId).subscribe({
      next: (transactions: WalletTransaction[]) => {
        this.displayedTransactions = transactions;

        this.walletsDetailsData = {
          data: transactions,
          hasError: false,
          isLoading: false,
        };
      },
      error: () => {
        this.walletsDetailsData = {
          data: null,
          isLoading: false,
          hasError: true,
        };
      },
    });
  }

  private filterTransactions(): void {
    this.displayedTransactions = this.walletsDetailsData.data!.filter(
      (transaction: WalletTransaction) =>
        (this.transactionsTypeForm.value === '') ? true : this.transactionsTypeForm.value === transaction.type.toString(),
    );
  }

  private createTransaction(transaction: WalletTransaction): void {
    this.walletsDetailsData.data?.push(transaction);
    this.filterTransactions();
  }

  private updateWallet({ name }: IWalletModalData): void {
    this.walletsManagementItem = WalletsManagementItem.create({
      id: this.walletsManagementItem!.id!,
      name, creationDate:
      this.walletsManagementItem!.createdAt.toString(),
    });
  }

  private updateTransaction(transaction: WalletTransaction): void {
    this.walletsDetailsData.data = this.walletsDetailsData.data!.map( (transactionItem: WalletTransaction) => {
      if(transactionItem.id == transaction.id) {
        return transaction;
      }

      return transactionItem;
    });
    this.filterTransactions();
  }

  private removeTransaction(transaction: WalletTransaction): void {
    this.loadingDialogService.show('Deleting transaction');

    this.pagesWalletDetailsService.removeWalletTransaction(transaction).subscribe({
      next: () => {
        this.walletsDetailsData.data = this.walletsDetailsData.data!.filter( (transactionItem: WalletTransaction) => {
          return transactionItem.id !== transaction.id;
        });
        this.filterTransactions();

        this.systemNotificationsService.showNotification({
          message: 'Transaction deleted successfully',
          type: NotificationType.Success,
        });

        this.loadingDialogService.hide();
      },
      error: () => {
        this.systemNotificationsService.showNotification({
          message: 'Deleting transaction failed',
          type: NotificationType.Error,
        });

        this.loadingDialogService.hide();
      },
    });
  }
}
