import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications/system-notifications.service';
import { NotificationType } from 'src/app/common/utils/system-notifications/system.notifications.constants';
import { TransactionCategory } from 'src/app/pages/categories/transaction-category.model';
import { PagesTransactionCategoriesService } from '../../pages-transaction-categories.service';
import { ITransactionCategoryDeletingModalData } from './transaction-category-deleting-modal.types';

@Component({
  selector: 'app-transaction-category-deleting-modal',
  templateUrl: './transaction-category-deleting-modal.component.html',
  styleUrls: ['./transaction-category-deleting-modal.component.scss']
})
export class TransactionCategoryDeletingModalComponent implements OnInit {
  public form!: FormControl;
  public transactionsCategories!: TransactionCategory[];
  public isLoadingTransactionCategories  = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ITransactionCategoryDeletingModalData,
    private transactionCategoriesService: PagesTransactionCategoriesService,
    private readonly systemNotificationsService: SystemNotificationsService,
  ) { }

  ngOnInit(): void {
    this.getCategories();

    this.form = new FormControl();
  }

  private getCategories(): void {
    this.transactionCategoriesService.getCategories().subscribe({
      next: (categoriesReceived) => {
        this.transactionsCategories = categoriesReceived;
        this.isLoadingTransactionCategories  = false;
      },
      complete: () => {
        this.isLoadingTransactionCategories = false;
      },
      error: () => {
        this.isLoadingTransactionCategories  = false;

        this.systemNotificationsService.showNotification({
          message: 'Editing transaction failed',
          type: NotificationType.Error,
        });
      },
    });
  }
}
