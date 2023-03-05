import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { checkInputError } from 'src/app/common/utils/forms/common-utils-forms-form-utils';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications/system-notifications.service';
import { NotificationType } from 'src/app/common/utils/system-notifications/system.notifications.constants';
import { WalletTransactionType } from 'src/app/domains/transactions/domains.transactions.constants';
import { PagesTransactionCategoriesService } from '../../pages-transaction-categories.service';
import { TransactionCategoryFull } from '../../transaction-category-full.model';
import { TransactionCategory } from '../../transaction-category.model';
import { ITransactionCategoryEditorPayload } from './pages-categories-editor.service';
import { ITransactionCategoryModalFormType } from './pages-categories-editor.types';

@Component({
  selector: 'app-pages-categories-editor',
  templateUrl: './pages-categories-editor.component.html',
  styleUrls: [ './pages-categories-editor.component.scss' ],
})
export class PagesCategoriesEditorComponent implements OnInit {
  public selectTransactionsTypes: Record<string, WalletTransactionType> = {
    'Income': WalletTransactionType.Income,
    'Expense': WalletTransactionType.Expense,
  };

  public form!: FormGroup<ITransactionCategoryModalFormType>;

  public isLoadingTransaction = true;

  private fullCategory: TransactionCategoryFull | null = null;

  public constructor(
    private readonly pagesTransactionCategoriesService: PagesTransactionCategoriesService,
    private readonly systemNotificationsService: SystemNotificationsService,
    private readonly dialogRef: MatDialogRef<PagesCategoriesEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ITransactionCategoryEditorPayload,
  ) { }

  public get nameIsNotProvided(): boolean {
    return checkInputError(this.form, 'name', 'required');
  }

  public get nameIsTooLong(): boolean {
    return checkInputError(this.form, 'name', 'maxlength');
  }

  public get typeAlreadyUsed(): boolean {
    return Number(this.fullCategory?.financialTransactionsCounter) > 0;
  }

  public ngOnInit(): void {
    this.getTransaction().subscribe({
      next: (category: TransactionCategoryFull) => {
        this.isLoadingTransaction = false;
        this.fullCategory = category;
        this.createForm();
      },
      error: () => {
        this.systemNotificationsService.showNotification({
          message: 'Fetching category details failed',
          type: NotificationType.Error,
        });
        this.cancel();
      },
    });
  }

  public save(): void {
    this.dialogRef.close(new TransactionCategory({
      id: this.fullCategory!.id,
      type: this.form.controls.type.value!,
      name: this.form.controls.name.value!,
    }));
  }

  public cancel(): void {
    this.dialogRef.close(null);
  }

  private getTransaction(): Observable<TransactionCategoryFull> {
    return this.data.categoryId
      ? this.pagesTransactionCategoriesService.getTransactionCategoryById(this.data.categoryId)
      : of(new TransactionCategoryFull({ id: null, name: '', type: this.data.type }, 0));
  }

  private createForm(): void {
    this.form = new FormGroup<ITransactionCategoryModalFormType>({
      name: new FormControl(this.fullCategory!.name, {
        validators: [
          Validators.required,
          Validators.maxLength(20),
        ],
        nonNullable: true,
      }),
      type: new FormControl({
        value: this.fullCategory!.type,
        disabled: Number(this.fullCategory!.financialTransactionsCounter) > 0,
      }, {
        validators: [
          Validators.required,
        ],
        nonNullable: true,
      }),
    });
  }
}
