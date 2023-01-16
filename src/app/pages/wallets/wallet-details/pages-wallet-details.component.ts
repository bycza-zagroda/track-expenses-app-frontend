import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TDataState } from 'src/app/common/http/common.http.types';
import { WalletTransactionType } from 'src/app/domains/transactions/domains.transactions.types';
import { WalletsManagementItem } from '../management/pages-wallets-wallets-management-item.model';
import { PagesWalletsManagementEditorService } from '../management/wallet-editor/pages-wallets-management-editor.service';
import { IWalletModalData } from '../management/wallet-editor/pages-wallets-management-editor.types';
import { WalletsDetailsTransaction } from './pages-wallet-details-item.model';
import { PagesWalletDetailsService } from './pages-wallet-details.service';
import { PagesWalletTransactionEditorService } from './transaction-editor/pages-wallet-transaction-editor.service';

type WalletSelectionValue = WalletTransactionType | '';

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

  private transactionTypeSub!: Subscription;

  public selectedType?: WalletSelectionValue;

  public walletTransactionType: typeof WalletTransactionType = WalletTransactionType;
  public displayedColumns: string[] = [ 'date', 'description', 'amount', 'actions' ];
  public walletsManagementItem?: WalletsManagementItem;
  public displayedTransactions: WalletsDetailsTransaction[] = [];

  public walletsDetailsData: TDataState<WalletsDetailsTransaction[]> = {
    data: null,
    hasError: false,
    isLoading: true,
  };

  public constructor(
    private readonly pagesWalletDetailsService: PagesWalletDetailsService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly pagesWalletTransactionEditorService: PagesWalletTransactionEditorService,
    private readonly pagesWalletsManagementEditorService: PagesWalletsManagementEditorService,
  ) { }

  public ngOnInit(): void {
    this.activatedRoute.data.subscribe( ({ wallet }) => {
      if (!(wallet instanceof WalletsManagementItem)) {
        return;
      }

      this.walletsManagementItem = wallet;
      this.getWalletTransactions(wallet.id!);

      this.transactionTypeSub = this.transactionsTypeForm.valueChanges.subscribe((selectedType: WalletSelectionValue | null) => {
        this.selectedType = selectedType!;
        this.filterTransactions(this.selectedType!);
      });
    });
  }

  public setTransactionType(value: WalletSelectionValue): void {
    this.filterTransactions(value);
  }

  public handleWalletEdit(): void {
    this.pagesWalletsManagementEditorService.openEditor(this.walletsManagementItem)
      .subscribe( (wallet: WalletsManagementItem | null) => {
        if(wallet) {
          this.updateWallet(wallet);
        }
      });
  }

  public handleCreateTransaction(type: WalletTransactionType): void {
    this.pagesWalletTransactionEditorService.openEditor(WalletsDetailsTransaction.create({type, amount: 100})).subscribe( (transaction: WalletsDetailsTransaction | null) => {
      if(transaction) {
        this.createTransaction(transaction);
      }
    });
  }

  public handleEditTransaction(transaction: WalletsDetailsTransaction): void {
    this.pagesWalletTransactionEditorService.openEditor(transaction).subscribe( (transaction: WalletsDetailsTransaction | null) => {
      if(transaction) {
        this.updateTransaction(transaction);
      }
    });
  }

  private getWalletTransactions(walletId: number): void {
    this.pagesWalletDetailsService.getWalletTransactions(walletId).subscribe({
      next: (transactions: WalletsDetailsTransaction[]) => {
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

  private filterTransactions(type: WalletSelectionValue): void {
    this.displayedTransactions = this.walletsDetailsData.data!.filter(
      (item: WalletsDetailsTransaction) =>
        (type === '') ? true : type.toString() === item.type.toString(),
    );
  }

  private createTransaction(transaction: WalletsDetailsTransaction): void {
    this.walletsDetailsData.data?.push(transaction);
    this.filterTransactions(this.selectedType!);
  }

  private updateWallet({ name }: IWalletModalData): void {
    this.walletsManagementItem = WalletsManagementItem.create({
      id: this.walletsManagementItem!.id!,
      name, creationDate:
      this.walletsManagementItem!.createdAt.toString(),
    });
  }

  private updateTransaction(transaction: WalletsDetailsTransaction): void {
    this.walletsDetailsData.data = this.walletsDetailsData.data!.map( (transaction_: WalletsDetailsTransaction) => {
      if(transaction_.id == transaction.id) {
        return transaction;
      }

      return transaction_;
    });
    this.filterTransactions(this.selectedType!);
  }

  public ngOnDestroy(): void {
    this.transactionTypeSub.unsubscribe();
  }
}
