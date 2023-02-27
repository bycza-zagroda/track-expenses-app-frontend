import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TDataState } from 'src/app/common/http/common.http.types';
import { NotificationType } from 'src/app/common/utils/system-notifications/system.notifications.constants';
import { WalletTransactionType } from 'src/app/domains/transactions/domains.transactions.constants';
import { TransactionCategory } from '../transaction-category.model';
import { PagesTransactionCategoriesService } from './pages-transaction-categories.service';

export type CategorySelectionValue = WalletTransactionType | '';

@Component({
  selector: 'app-categories-management',
  templateUrl: './pages-categories-management.component.html',
  styleUrls: [ './pages-categories-management.component.scss' ],
})
export class PagesCategoriesManagementComponent implements OnInit, OnDestroy {
  public selectTransactionCategoriesTypes: Record<string, CategorySelectionValue> = {
    'All Categories': '',
    'Incomes': WalletTransactionType.Income,
    'Expenses': WalletTransactionType.Expense,
  };

  public notificationTypes: typeof NotificationType = NotificationType;
  public categoryType: typeof WalletTransactionType = WalletTransactionType;
  public displayedColumns: string[] = [ 'name', 'type', 'actions' ];
  public categoriesTypeForm = new FormControl<CategorySelectionValue>('');
  public displayedCategories: TransactionCategory[] = [];

  public transactionCategoriesData: TDataState<TransactionCategory[]> = {
    data: null,
    hasError: false,
    isLoading: true,
  };

  private categoriesTypeSub!: Subscription;

  public constructor(
    private readonly pagesTransactionCategoriesService: PagesTransactionCategoriesService,
  ) { }

  public ngOnInit(): void {
    this.initCategories();

    this.categoriesTypeSub = this.categoriesTypeForm.valueChanges
      .subscribe(() => {
        this.filterCategories();
      });
  }

  public ngOnDestroy(): void {
    this.categoriesTypeSub.unsubscribe();
  }

  private initCategories(): void {
    this.pagesTransactionCategoriesService.getCategories().subscribe({
      next: (categories: TransactionCategory[]) => {
        this.displayedCategories = categories.sort( (a, b) =>
          a.name.toLowerCase() < b.name.toLowerCase() ? -1 : a.name.toLowerCase() > b.name.toLowerCase() ? 1 : 0,
        );

        this.transactionCategoriesData = {
          data: categories,
          hasError: false,
          isLoading: false,
        };
      },
      error: () => {
        this.transactionCategoriesData = {
          data: null,
          isLoading: false,
          hasError: true,
        };
      },
    });
  }

  private filterCategories(): void {
    this.displayedCategories = this.transactionCategoriesData.data!.filter(
      (category: TransactionCategory) =>
        (this.categoriesTypeForm.value === '') ? true : this.categoriesTypeForm.value === category.type.toString(),
    );
  }
}
