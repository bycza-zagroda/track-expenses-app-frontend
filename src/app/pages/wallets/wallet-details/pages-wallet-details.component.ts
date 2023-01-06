import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TDataState } from 'src/app/common/http/common.http.types';
import { WalletTransactionType } from 'src/app/domains/wallets/domains.wallets.types';
import { WalletsManagementItem } from '../management/pages-wallets-wallets-management-item.model';
import { PagesWalletsManagementEditorService } from '../management/wallet-editor/pages-wallets-management-editor.service';
import { IWalletModalData } from '../management/wallet-editor/pages-wallets-management-editor.types';
import { WalletsDetailsTransaction } from './pages-wallet-details-item.model';
import { PagesWalletDetailsService } from './pages-wallet-details.service';

type WalletSelectionValue = WalletTransactionType | '';

@Component({
  selector: 'app-pages-wallet-details',
  templateUrl: './pages-wallet-details.component.html',
  styleUrls: ['./pages-wallet-details.component.scss'],
})
export class PagesWalletDetailsComponent implements OnInit, OnDestroy {

  public selectTransactionsTypes: Record<string, WalletSelectionValue> = {
    'All transactions': '',
    'Incomes': WalletTransactionType.Incomes,
    'Expenses': WalletTransactionType.Expenses,
  }

  public transactionsTypeForm = new FormControl<WalletSelectionValue>('');

  private transactionTypeSub!: Subscription;

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
    private readonly pagesWalletsManagementEditorService: PagesWalletsManagementEditorService,
    private readonly activatedRoute: ActivatedRoute,
  ) { }

  public ngOnInit(): void {
    this.activatedRoute.data.subscribe( ({ wallet }) => {
      if (!(wallet instanceof WalletsManagementItem)) {
        return;
      }

      this.walletsManagementItem = wallet;
      this.getWalletTransactions(wallet.id!);
    });

    this.transactionTypeSub = this.transactionsTypeForm.valueChanges.subscribe((data: WalletSelectionValue | null) => {
      this.filterTransactions(data ?? '');
    });
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

  public async handleWalletEdit(): Promise<void> {
    this.pagesWalletsManagementEditorService.openWalletEditor(this.walletsManagementItem).subscribe( (createdName: WalletsManagementItem | undefined) => {
      createdName && this.updateWallet(createdName);
    })
  }

  private updateWallet({ name }: IWalletModalData): void {
    this.walletsManagementItem = WalletsManagementItem.create({ id: this.walletsManagementItem!.id!, name, creationDate: this.walletsManagementItem!.createdAt.toString() });;
  }

  public ngOnDestroy(): void {
    this.transactionTypeSub.unsubscribe();
  }
}
