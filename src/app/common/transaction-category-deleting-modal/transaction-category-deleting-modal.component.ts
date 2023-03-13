import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITransactionCategoryDeletingModalData } from './transaction-category-deleting-modal.types';

@Component({
  selector: 'app-transaction-category-deleting-modal',
  templateUrl: './transaction-category-deleting-modal.component.html',
  styleUrls: ['./transaction-category-deleting-modal.component.scss']
})
export class TransactionCategoryDeletingModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: ITransactionCategoryDeletingModalData) { }

  ngOnInit(): void {
  }

}
