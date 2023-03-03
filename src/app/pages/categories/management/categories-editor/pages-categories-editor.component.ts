import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { checkInputError } from 'src/app/common/utils/forms/common-utils-forms-form-utils';
import { WalletTransactionType } from 'src/app/domains/transactions/domains.transactions.constants';
import { PagesTransactionCategoriesService } from '../../pages-transaction-categories.service';
import { TransactionCategory } from '../../transaction-category.model';
import { ITransactioCategorynModalFormType } from './pages-categories-editor.types';

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

  public form!: FormGroup<ITransactioCategorynModalFormType>;

  public transactionTypeDisabledLoading = true;

  private categoryId: number | null = null;

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

  public ngOnInit(): void {
    this.categoryId = this.data.id;

    this.form = new FormGroup<ITransactioCategorynModalFormType>({
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

    this.isTransactionCategoryAlreadyUsed();
  }

  public save(): void {
    this.dialogRef.close(new TransactionCategory({
      id: this.categoryId,
      type: this.form.controls.type.value!,
      name: this.form.controls.name.value!,
    }));
  }

  public cancel(): void {
    this.dialogRef.close(null);
  }

  private isTransactionCategoryAlreadyUsed(): void {
    if(this.categoryId) {
      this.pagesTransactionCategoriesService.isTransactionCategoryAlreadyUsed(this.data).subscribe((resp: boolean) => {
        this.transactionTypeDisabledLoading = false;

        if(!resp) {
          this.form.controls.type.enable();
        }
      });
    } else {
      this.transactionTypeDisabledLoading = false;
      this.form.controls.type.enable();
    }
  }
}
