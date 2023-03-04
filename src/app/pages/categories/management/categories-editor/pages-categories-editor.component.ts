import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { checkInputError } from 'src/app/common/utils/forms/common-utils-forms-form-utils';
import { WalletTransactionType } from 'src/app/domains/transactions/domains.transactions.constants';
import { PagesTransactionCategoriesService } from '../../pages-transaction-categories.service';
import { TransactionCategoryFull } from '../../transaction-category-full.model';
import { TransactionCategory } from '../../transaction-category.model';
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

  public transactionTypeDisabledLoading = true;

  private category: TransactionCategory | null = null;
  private fullCategory: TransactionCategoryFull | null = null;

  public constructor(
    private readonly pagesTransactionCategoriesService: PagesTransactionCategoriesService,
    private readonly dialogRef: MatDialogRef<PagesCategoriesEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TransactionCategory,
  ) { }

  public get nameIsNotProvided(): boolean {
    return checkInputError(this.form, 'name', 'required');
  }

  public get nameIsToLong(): boolean {
    return checkInputError(this.form, 'name', 'maxlength');
  }

  public get typeAlreadyUsed(): boolean {
    return this.fullCategory?.financialTransactionsCounter != null
      && this.fullCategory.financialTransactionsCounter > 0;
  }

  public ngOnInit(): void {
    this.category = this.data;

    this.form = new FormGroup<ITransactionCategoryModalFormType>({
      name: new FormControl(this.data.name, {
        validators: [
          Validators.required,
          Validators.maxLength(20),
        ],
        nonNullable: true,
      }),
      type: new FormControl({ value: this.data.type, disabled: true }, {
        validators: [
          Validators.required,
        ],
        nonNullable: true,
      }),
    });

    this.getTransactionCategoryById();
  }

  public save(): void {
    this.dialogRef.close(new TransactionCategory({
      id: this.category!.id,
      type: this.form.controls.type.value!,
      name: this.form.controls.name.value!,
    }));
  }

  public cancel(): void {
    this.dialogRef.close(null);
  }

  private getTransactionCategoryById(): void {
    if(this.category?.id) {
      this.pagesTransactionCategoriesService.getTransactionCategoryById(this.data)
        .subscribe((transactionCategoryFull: TransactionCategoryFull) => {
          this.transactionTypeDisabledLoading = false;
          this.fullCategory = transactionCategoryFull;

          if(this.fullCategory.financialTransactionsCounter != null
            && this.fullCategory.financialTransactionsCounter == 0) {
            this.form.controls.type.enable();
          }
        });
    } else {
      this.transactionTypeDisabledLoading = false;
      this.form.controls.type.enable();
    }
  }
}
