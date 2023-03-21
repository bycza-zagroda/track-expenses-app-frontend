import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications/system-notifications.service';
import { NotificationType } from 'src/app/common/utils/system-notifications/system.notifications.constants';
import { TransactionCategory } from 'src/app/pages/categories/transaction-category.model';
import { PagesTransactionCategoriesService } from '../../pages-transaction-categories.service';
import { TransactionCategoryFull } from '../../transaction-category-full.model';

@Component({
  selector: 'app-transaction-category-deleting-modal',
  templateUrl: './transaction-category-deleting-modal.component.html',
  styleUrls: [ './transaction-category-deleting-modal.component.scss' ],
})
export class TransactionCategoryDeletingModalComponent implements OnInit {
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
    this.getCategoryById();
    this.categorySelectionField = new FormControl();
  }

  private getCategoryById(): void {
    this.transactionCategoriesService.getTransactionCategoryById(this.transactionCategoryId).subscribe((category) => {
      this.isAssigned = category.financialTransactionsCounter! > 0;
      this.transactionCategoryFull = category;
      this.getCategories();
    });
  }

  private getCategories(): void {
    this.transactionCategoriesService.getCategories().subscribe({
      next: (receivedCategories) => {
        this.transactionCategories = receivedCategories;
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
}
