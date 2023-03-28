import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TDataState } from 'src/app/common/http/common.http.types';
import { NotificationType } from 'src/app/common/utils/system-notifications/system.notifications.constants';
import { WalletTransactionType } from 'src/app/domains/transactions/domains.transactions.constants';
import { TransactionCategory } from '../transaction-category.model';
import { sortAlphabeticallyByProp } from 'src/app/common/utils/sorts/common.util.sort.';
import { PagesCategoriesEditorService } from './categories-editor/pages-categories-editor.service';
import { PagesTransactionCategoriesService } from '../pages-transaction-categories.service';
import { LoadingSnackbarService } from 'src/app/common/loading-modal/loading-snackbar.service';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications/system-notifications.service';

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
    private readonly pagesCategoriesEditorService: PagesCategoriesEditorService,
    private readonly pagesTransactionCategoriesService: PagesTransactionCategoriesService,
    private readonly loadingDialogService: LoadingSnackbarService,
    private readonly notificationService: SystemNotificationsService,
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

  public handleCreateCategory(type: WalletTransactionType): void {
    this.pagesCategoriesEditorService
      .openEditor(type)
      .subscribe({
        next: (category: TransactionCategory | null) => {
          if(category) {
            this.createCategory(category);
          }
        },
      });
  }

  public handleUpdateCategory(category: TransactionCategory): void {
    this.pagesCategoriesEditorService.openEditor(category.type, category.id!)
      .subscribe({
        next: (categoryModal: TransactionCategory | null) => {
          if(categoryModal) {
            this.updateCategory(categoryModal);
          }
        },
      });
  }

  public handleDeleteCategory(category: TransactionCategory): void {
    this.pagesTransactionCategoriesService.showCategoryDeletionModal(category.id!).subscribe((wasDeleted) => {
      if (!wasDeleted) {
        return;
      }
      this.deleteCategory(category);
    });
  }

  private initCategories(): void {
    this.pagesTransactionCategoriesService.getCategories().subscribe({
      next: (categories: TransactionCategory[]) => {
        this.displayedCategories = sortAlphabeticallyByProp(categories, 'name');

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

    this.displayedCategories = sortAlphabeticallyByProp(this.displayedCategories, 'name');
  }

  private createCategory(transaction: TransactionCategory): void {
    this.transactionCategoriesData.data?.push(transaction);
    this.filterCategories();
  }

  private updateCategory(category: TransactionCategory): void {
    this.transactionCategoriesData.data = this.transactionCategoriesData.data!.map( (categoryItem: TransactionCategory) => {
      if(categoryItem.id === category.id) {
        return category;
      }
      
      return categoryItem;
    });
    this.filterCategories();
  }

  private deleteCategory(category: TransactionCategory): void {
    this.loadingDialogService.show('Deleting category');
    this.removeCategoryFromCategoriesData(category);

    this.pagesTransactionCategoriesService.deleteTransactionCategory().subscribe({
      next: () => {
        this.loadingDialogService.hide();

        this.notificationService.showNotification(
          { message: 'Category deleted succesfully', type: NotificationType.Success });
      },
      error: () => {
        this.loadingDialogService.hide();
        this.notificationService.showNotification({ message: 'Deleting category failed', type: NotificationType.Error });
      },
    },
    );
  }

  private removeCategoryFromCategoriesData(category: TransactionCategory): void {
    const index = this.transactionCategoriesData.data!.indexOf(category);
    this.transactionCategoriesData.data!.splice(index, 1);
    this.filterCategories();
  }
}
