import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TransactionTypeMatSelectComponent, WalletSelectionValue } from 'src/app/common/components/mat-controls/transaction-type-mat-select/transaction-type-mat-select.component';
import { TDataState } from 'src/app/common/http/common.http.types';
import { ModalEditorService } from 'src/app/common/utils/modal/modal-editor.service';
import { WalletTransactionType } from 'src/app/domains/wallets/domains.wallets.types';
import { WalletsManagementItem } from '../management/pages-wallets-wallets-management-item.model';
import { PagesWalletsManagementEditorComponent } from '../management/wallet-editor/pages-wallets-management-editor.component';
import { IWalletModalData } from '../management/wallet-editor/pages-wallets-management-editor.types';
import { WalletsDetailsTransaction } from './pages-wallet-details-item.model';
import { PagesWalletDetailsService } from './pages-wallet-details.service';
import { PagesWalletTransactionEditorComponent } from './transaction-editor/pages-wallet-transaction-editor.component';
import { ITransactionModalData } from './transaction-editor/pages-wallet-transaction.editor.types';

@Component({
  selector: 'app-pages-wallet-details',
  templateUrl: './pages-wallet-details.component.html',
  styleUrls: ['./pages-wallet-details.component.scss'],
})
export class PagesWalletDetailsComponent implements OnInit {

  @ViewChild('transactionTypeMat') transactionTypeMat!: TransactionTypeMatSelectComponent;

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
    private readonly activatedRoute: ActivatedRoute,
    private readonly modalEditorService: ModalEditorService,
  ) { }

  public ngOnInit(): void {
    this.activatedRoute.data.subscribe( ({ wallet }) => {
      if (!(wallet instanceof WalletsManagementItem)) {
        return;
      }

      this.walletsManagementItem = wallet;
      this.getWalletTransactions(wallet.id!);
    });
  }

  public setTransactionType(value: WalletSelectionValue) {
    this.filterTransactions(value ?? '');
  }

  private getWalletTransactions(walletId: number): void {
    this.pagesWalletDetailsService.getWalletTransactions(walletId).subscribe({
      next: (data: WalletsDetailsTransaction[]) => {
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

  private filterTransactions(type: WalletSelectionValue): void {
    this.displayedTransactions = this.walletsDetailsData.data!.filter( (item: WalletsDetailsTransaction) =>  (type === '') ? true : type.toString() === item.type.toString() );
  }

  public handleWalletEdit(): void {
    this.modalEditorService.openEditor<IWalletModalData, WalletsManagementItem>(PagesWalletsManagementEditorComponent, {
      name: this.walletsManagementItem!.name,
    }, this.walletsManagementItem).subscribe( (data: WalletsManagementItem | null) => {
      if(data) {
        this.updateWallet(data);
      }
    })
  }

  private updateWallet({ name }: IWalletModalData): void {
    this.walletsManagementItem = WalletsManagementItem.create({ id: this.walletsManagementItem!.id!, name, creationDate: this.walletsManagementItem!.createdAt.toString() });
  }

  public handleCreateTransaction(type: WalletTransactionType): void {
    this.modalEditorService.openEditor<ITransactionModalData, WalletsDetailsTransaction>(PagesWalletTransactionEditorComponent, {
      type: type,
      amount: 10,
      date: new Date(),
    }).subscribe( (data: WalletsDetailsTransaction | null) => {
      if(data) {
        this.createTransaction(data);
      }
    })
  }

  private createTransaction(transaction: WalletsDetailsTransaction): void {
    this.walletsDetailsData.data?.push(transaction);
    this.filterTransactions(this.transactionTypeMat.transactionsTypeForm.value!);
  }

  public handleEditTransaction(transaction: WalletsDetailsTransaction): void {
    this.modalEditorService.openEditor<ITransactionModalData, WalletsDetailsTransaction>(PagesWalletTransactionEditorComponent, {
      type: transaction.type,
      amount: transaction.amount,
      date: transaction.date,
      description: transaction.description ?? '',
    }, transaction).subscribe( (data: WalletsDetailsTransaction | null) => {
      if(data) {
        this.updateTransaction(data);
      }
    })
  }

  private updateTransaction(transaction: WalletsDetailsTransaction): void {
    this.walletsDetailsData.data! = this.walletsDetailsData.data!.map( (t: WalletsDetailsTransaction) => {
      if(t.id == transaction.id) {
        return transaction;
      }

      return t;
    })
    this.filterTransactions(this.transactionTypeMat.transactionsTypeForm.value!);
  }
}
