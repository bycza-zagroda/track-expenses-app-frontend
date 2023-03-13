import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { TServerEntityId } from 'src/app/common/http/common.http.types';
import { checkInputError } from 'src/app/common/utils/forms/common-utils-forms-form-utils';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications/system-notifications.service';
import { NotificationType } from 'src/app/common/utils/system-notifications/system.notifications.constants';
import { WalletTransactionType } from 'src/app/domains/transactions/domains.transactions.constants';
import { PagesTransactionCategoriesService } from 'src/app/pages/categories/pages-transaction-categories.service';
import { TransactionCategory } from 'src/app/pages/categories/transaction-category.model';
import { WalletTransaction } from '../pages-wallet-details-item.model';
import { IWalletTransactionModalFormType } from './pages-wallet-transaction.editor.types';

export const regexAmount = /^\d+(\.\d{1,2})?$/;

@Component({
  selector: 'app-transaction-editor',
  templateUrl: './pages-wallet-transaction-editor.component.html',
  styleUrls: [ './pages-wallet-transaction-editor.component.scss' ],
})
export class PagesWalletTransactionEditorComponent implements OnInit, OnDestroy {
  public selectTransactionsTypes: Record<string, WalletTransactionType> = {
    'Income': WalletTransactionType.Income,
    'Expense': WalletTransactionType.Expense,
  };

  public form!: FormGroup<IWalletTransactionModalFormType>;
  public transactionsCategories!: TransactionCategory[];
  public isLoadingTransactionCategories  = true;
  private allTransactionCategories!: TransactionCategory[];
  private listenToTypeChangeSubscription!: Subscription;

  private transactionId: TServerEntityId | null = null;
  private walletId!: TServerEntityId;

  public constructor(
    private readonly dialogRef: MatDialogRef<PagesWalletTransactionEditorComponent>,
    private readonly transactionCategoriesService: PagesTransactionCategoriesService,
    private readonly systemNotificationsService: SystemNotificationsService,
    @Inject(MAT_DIALOG_DATA) public data: WalletTransaction,
  ) {}

  public get amountIsNotProvided(): boolean {
    return checkInputError(this.form, 'amount', 'required');
  }

  public get amountIsZero(): boolean {
    return checkInputError(this.form, 'amount', 'amountIsZero');
  }

  public get amountHasInvalidFormat(): boolean {
    return checkInputError(this.form, 'amount', 'pattern');
  }

  public get dateIsNotProvided(): boolean {
    return checkInputError(this.form, 'date', 'required');
  }

  public ngOnInit(): void {
    this.transactionId = this.data.id;
    this.walletId = this.data.walletId;
    this.getCategoriesByType(this.data.type);

    this.form = new FormGroup<IWalletTransactionModalFormType>({
      amount: new FormControl(this.data.amount === 0 ? null : this.data.amount, {
        validators: [
          Validators.required,
          Validators.pattern(regexAmount),
          this.amountBiggerThanZero(),
        ],
        nonNullable: false,
      }),
      description: new FormControl(this.data.description),
      date: new FormControl(this.data.date, {
        validators: [
          Validators.required,
        ],
        nonNullable: false,
      }),
      type: new FormControl(this.data.type, {
        validators: [
          Validators.required,
        ],
        nonNullable: true,
      }),
      category: new FormControl(this.data.categoryId, {
        nonNullable: false,
      }),
    });

    this.listenToTypeChangeSubscription = this.listenToTypeChange();
  }

  public ngOnDestroy(): void {
    this.listenToTypeChangeSubscription.unsubscribe();
  }

  public save(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    this.dialogRef.close(WalletTransaction.create({
      id: this.transactionId ?? undefined,
      amount: parseFloat(this.form.controls.amount.value!.toString()),
      date: this.form.controls.date.value!.toString(),
      type: this.form.controls.type.value!,
      description: this.form.controls.description.value === '' ? null : this.form.controls.description.value,
      walletId: this.walletId,
    }));
  }

  public cancel(): void {
    this.dialogRef.close(null);
  }

  private amountBiggerThanZero(): ValidatorFn {
    return (control: AbstractControl) => {
      const value: number = parseFloat(control.value as string);

      if(value && value > 0) {
        return null;
      }

      return { amountIsZero: true };
    };
  }

  private getCategoriesByType(typeToFilter: WalletTransactionType): void {
    this.transactionCategoriesService.getCategories().subscribe({
      next: (categoriesReceived) => {
        this.allTransactionCategories = categoriesReceived;
        this.transactionsCategories = this.filterCategories(categoriesReceived, typeToFilter);
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

        this.cancel();
      },
    });
  }

  private listenToTypeChange(): Subscription {
    return this.form.get('type')!.valueChanges.subscribe((selectedType) => {
      this.transactionsCategories = this.filterCategories(this.allTransactionCategories, selectedType!);
    });
  }

  private filterCategories(
    categoriesToFilter: TransactionCategory[],
    typeToFilter: WalletTransactionType,
  ): TransactionCategory[] {
    return categoriesToFilter.filter(cat => cat.type === typeToFilter);
  }
}
