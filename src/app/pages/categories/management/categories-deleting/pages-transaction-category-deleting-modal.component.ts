import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, Observable } from 'rxjs';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications/system-notifications.service';
import { NotificationType } from 'src/app/common/utils/system-notifications/system.notifications.constants';
import { TransactionCategory } from 'src/app/pages/categories/transaction-category.model';
import { PagesTransactionCategoriesService } from '../../pages-transaction-categories.service';
import { TransactionCategoryFull } from '../../transaction-category-full.model';

@Component({
  selector: 'app-pages-transaction-category-deleting-modal',
  templateUrl: './pages-transaction-category-deleting-modal.component.html',
  styleUrls: [ './pages-transaction-category-deleting-modal.component.scss' ],
})
export class PagesTransactionCategoryDeletingModalComponent implements OnInit {
  public transactionCategoryId!: number;
  public transactionCategoryFull!: TransactionCategoryFull;
  public isAssigned!: boolean;
  public categorySelectionField!: FormControl;
  public transactionCategories!: TransactionCategory[];
  public isLoadingTransactionCategories  = true;

  public constructor(
    private readonly transactionCategoriesService: PagesTransactionCategoriesService,
    private readonly systemNotificationsService: SystemNotificationsService,
  ) { }

  public ngOnInit(): void {
    this.loadTransactionCategories();
    this.categorySelectionField = new FormControl();
  }

  private loadTransactionCategories(): void {
    combineLatest([ this.getCategoryById(), this.getCategories() ]).subscribe({
      next: ([ transactionCategoryFullObs, transactionCategoryListObs ]) => {
        this.assignCategoryFull(transactionCategoryFullObs);
        this.assignCategories(transactionCategoryListObs);
        this.isLoadingTransactionCategories = false;
      },
      complete: () => {
        this.isLoadingTransactionCategories = false;
      },
      error: () => {
        this.isLoadingTransactionCategories  = false;
        this.systemNotificationsService.showNotification({
          message: 'Loading categories failed',
          type: NotificationType.Error,
        });
      },
    });
  }

  private getCategoryById(): Observable<TransactionCategoryFull> {
    return this.transactionCategoriesService.getTransactionCategoryById(this.transactionCategoryId);
  }

  private assignCategoryFull(transactionCategoryFullObs: TransactionCategoryFull): void {
    this.isAssigned = transactionCategoryFullObs.financialTransactionsCounter! > 0;
    this.transactionCategoryFull = transactionCategoryFullObs;
  }

  private assignCategories(transactionCategoryListObs: TransactionCategory[]): void {
    this.transactionCategories = transactionCategoryListObs;
  }

  private getCategories(): Observable<TransactionCategory[]> {
    return this.transactionCategoriesService.getCategories();
  }
}
