import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TServerEntityId } from 'src/app/common/http/common.http.types';
import { checkInputError } from 'src/app/common/utils/forms/common-utils-forms-form-utils';
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
export class PagesWalletTransactionEditorComponent implements OnInit {
  public selectTransactionsTypes: Record<string, WalletTransactionType> = {
    'Income': WalletTransactionType.Income,
    'Expense': WalletTransactionType.Expense,
  };

  public form!: FormGroup<IWalletTransactionModalFormType>;

  private transactionId: TServerEntityId | null = null;
  private walletId!: TServerEntityId;
  public transactionsCategories!: TransactionCategory[];

  public constructor(
    private readonly dialogRef: MatDialogRef<PagesWalletTransactionEditorComponent>,
    private readonly transactionCategories: PagesTransactionCategoriesService,
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
        validators: [
          Validators.required,
        ],
        nonNullable: false,
      }),
    });

    this.getCategories();
  }

  public save(): void {
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

  private getCategories(): void {
    let currentlySelectedTransactionType: WalletTransactionType | null;
    let transactionCategoriesArray: TransactionCategory[];
    let currentlySelectedCategoryType = this.data.type;
    console.log(currentlySelectedCategoryType);

    this.form.get("type")!.valueChanges.subscribe(selectedType => {
      currentlySelectedTransactionType = selectedType;
      console.log(selectedType);
      this.transactionCategories.getCategories().subscribe((data) => {
        transactionCategoriesArray = data;
        this.transactionsCategories = transactionCategoriesArray.filter(cat => cat.type == currentlySelectedTransactionType);
      })
    })
  }
}
