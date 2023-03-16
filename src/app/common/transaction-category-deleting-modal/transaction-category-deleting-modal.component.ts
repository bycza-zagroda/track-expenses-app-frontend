import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionCategory } from 'src/app/pages/categories/transaction-category.model';
import { ITransactionCategoryDeletingModalData, ITransactionCategoryDeletingModalFormType } from './transaction-category-deleting-modal.types';

@Component({
  selector: 'app-transaction-category-deleting-modal',
  templateUrl: './transaction-category-deleting-modal.component.html',
  styleUrls: ['./transaction-category-deleting-modal.component.scss']
})
export class TransactionCategoryDeletingModalComponent implements OnInit {
  public form!: FormGroup<ITransactionCategoryDeletingModalFormType>;
  public transactionsCategories!: TransactionCategory[];
  public isLoadingTransactionCategories  = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: ITransactionCategoryDeletingModalData) { }

  ngOnInit(): void {
    this.transactionsCategories = this.data.categories;

    this.form = new FormGroup<ITransactionCategoryDeletingModalFormType>({
      category: new FormControl(this.data.categoryId, {
        nonNullable: false,
      }),
    });
  }

}
