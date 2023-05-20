import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from '../../../ui/container/container.component';
import { ButtonModule } from 'primeng/button';
import { WalletDataComponent } from './wallet-data/wallet-data.component';
import { TransactionsListComponent } from './transactions-list/transactions-list.component';
import { ActivatedRoute } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { ManageCategoriesComponent } from './manage-categories/manage-categories.component';
import { Category } from '../../../domains/categories/category.model';
import { CategoriesGatewayService } from '../../../domains/categories/categories-gateway.service';
import { Transaction } from '../../../domains/transactions/transaction.model';
import { TransactionsGatewayService } from '../../../domains/transactions/transactions-gateway.service';
import { combineLatest } from 'rxjs';
import { WalletsGatewayService } from '../../../domains/wallets/wallets-gateway.service';
import { Wallet } from '../../../domains/wallets/wallet.model';
import { LoadingDataErrorComponent } from '../../../common/components/loading-data-error/loading-data-error.component';
import { NoResultsComponent } from '../../../common/components/no-results/no-results.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TransactionType } from '../../../domains/transactions/transaction.constants';
import { TransactionsChartComponent } from './transactions-chart/transactions-chart.component';
import { SortByDatePipe } from '../../../common/pipes/sort-by-date.pipe';

@Component({
  selector: 'teaf-ng-wallet-details',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    ButtonModule,
    WalletDataComponent,
    TransactionsListComponent,
    SidebarModule,
    ManageCategoriesComponent,
    LoadingDataErrorComponent,
    NoResultsComponent,
    ProgressSpinnerModule,
    TransactionsChartComponent,
  ],
  templateUrl: './wallet-details.component.html',
  styleUrls: [ './wallet-details.component.scss' ],
})
export class WalletDetailsComponent implements OnInit {
  public categoriesVisible = false;
  public categories: Category[] = [];
  public wallet: Wallet | null = null;
  public incomesCount = 0;
  public expensesCount = 0;

  public get showData(): boolean {
    return this.wallet !== null && !this.isLoading;
  }

  public get showLoadingError(): boolean {
    return this.hasLoadingError && !this.isLoading;
  }

  public get showLoading(): boolean {
    return this.isLoading;
  }

  public get transactions(): Transaction[] {
    return this.datePipe.transform(this.nonSortedTransactions, 'date');
  }

  private isLoading = true;
  private hasLoadingError = false;
  private walletId: number | null = null;
  private datePipe = new SortByDatePipe();
  private nonSortedTransactions: Transaction[] = [];

  public constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly categoriesGateway: CategoriesGatewayService,
    private readonly transactionsGateway: TransactionsGatewayService,
    private readonly walletGateway: WalletsGatewayService,
  ) {}

  public ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      if (params['id'] === undefined) {
        throw new Error('No wallet ID provided');
      }

      this.walletId = Number(params['id']);

      combineLatest([
        this.categoriesGateway.getCategories(),
        this.transactionsGateway.getTransactions(this.walletId),
        this.walletGateway.getWalletById(this.walletId),
      ]).subscribe({
        next: ([ categoriesResp, transactionsResp, walletResp ]) => {
          this.categories = categoriesResp.map(category => Category.fromResponse(category));
          this.nonSortedTransactions = transactionsResp.map(transaction => Transaction.fromResponse(transaction));
          this.wallet = Wallet.fromResponse(walletResp);

          this.incomesCount = this.nonSortedTransactions
            .filter(t => t.type === TransactionType.Income)
            .reduce((acc, t) => acc + t.amount, 0);

          this.expensesCount = this.nonSortedTransactions
            .filter(t => t.type === TransactionType.Expense)
            .reduce((acc, t) => acc + t.amount, 0);

          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
          this.hasLoadingError = true;
        },
      });
    });
  }

  public onCategoryUpdated(category: Category): void {
    this.categories = this.categories.map(c => c.id === category.id ? category : c);
  }

  public onCategoryAdded(category: Category): void {
    this.categories = [ ...this.categories, category ];
  }

  public onCategoryRemove(category: Category): void {
    this.categories = this.categories.filter(c => c.id !== category.id);
  }

  public onTransactionUpdated(transaction: Transaction): void {
    this.nonSortedTransactions = this.nonSortedTransactions.map(t => t.id === transaction.id ? transaction : t);
  }

  public onTransactionAdded(transaction: Transaction): void {
    this.nonSortedTransactions = [ ...this.nonSortedTransactions, transaction ];
  }

  public onTransactionRemove(transaction: Transaction): void {
    this.nonSortedTransactions = this.nonSortedTransactions.filter(t => t.id !== transaction.id);
  }
}
