import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { WalletTransactionType } from 'src/app/domains/transactions/domains.transactions.types';

export type WalletSelectionValue = WalletTransactionType | '';

@Component({
  selector: 'app-transaction-type-mat-select',
  templateUrl: './transaction-type-mat-select.component.html',
  styleUrls: [ './transaction-type-mat-select.component.scss' ],
})
export class TransactionTypeMatSelectComponent implements OnInit {
  @Output() public setTransactionType = new EventEmitter<WalletSelectionValue>();

  @Input() public type?: WalletTransactionType;

  public selectTransactionsTypes: Record<string, WalletSelectionValue> = {
    'All transactions': '',
    'Incomes': WalletTransactionType.Incomes,
    'Expenses': WalletTransactionType.Expenses,
  };

  public transactionsTypeForm = new FormControl<WalletSelectionValue>('');

  private transactionTypeSub!: Subscription;

  public ngOnInit(): void {

    this.transactionTypeSub = this.transactionsTypeForm.valueChanges.subscribe(() => {
      this.setTransactionType.emit(this.transactionsTypeForm.value ?? '');
    });
  }

}