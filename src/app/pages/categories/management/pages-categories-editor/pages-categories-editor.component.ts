import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TServerEntityId } from 'src/app/common/http/common.http.types';
import { TransactionCategory } from 'src/app/domains/categories/domains.transaction-categories.types';
import { WalletTransactionType } from 'src/app/domains/transactions/domains.transactions.constants';
import { ITransactionCategoryModalFormType } from './pages-categories-editor.types';

@Component({
  selector: 'app-categories-editor',
  templateUrl: './pages-categories-editor.component.html',
  styleUrls: ['./pages-categories-editor.component.scss']
})
export class PagesCategoriesEditorComponent implements OnInit {
  public selectTransactionsTypes: Record<string, WalletTransactionType> = {
    'Income': WalletTransactionType.Income,
    'Expense': WalletTransactionType.Expense,
  };

  private categoryId!: TServerEntityId | null;

  public form!: FormGroup<ITransactionCategoryModalFormType>;

  constructor(
    private readonly dialogRef: MatDialogRef<PagesCategoriesEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TransactionCategory,
  ) { }

  ngOnInit(): void {
    this.categoryId = this.data.id;

    this.form = new FormGroup<ITransactionCategoryModalFormType>({
      name: new FormControl(this.data.name, {
        validators: [
          Validators.required,
        ],
        nonNullable: true,
      }),
      type: new FormControl(this.data.type, {
        validators: [
          Validators.required,
        ],
        nonNullable: true,
      }),
    });
  }

  public save(): void {
    if (this.form.invalid) {
      return;
    }

    this.dialogRef.close(new TransactionCategory(
      this.categoryId,
      this.form.controls.name.value ?? '' ,
      this.form.controls.type.value ?? WalletTransactionType.Income,
    ));
  }

  public cancel(): void {
    this.dialogRef.close(null);
  }

}
