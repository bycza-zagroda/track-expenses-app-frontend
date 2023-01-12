import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { WalletTransactionType } from 'src/app/domains/wallets/domains.wallets.types';

export type WalletSelectionValue = WalletTransactionType | '';

@Component({
  selector: 'app-transaction-type-mat-select',
  templateUrl: './transaction-type-mat-select.component.html',
  styleUrls: ['./transaction-type-mat-select.component.scss']
})
export class TransactionTypeMatSelectComponent implements OnInit, OnDestroy {

  @Output('setTransactionType') public setTransactionType = new EventEmitter<WalletSelectionValue>();

  @Input('type') type!: WalletTransactionType;

  public selectTransactionsTypes: Record<string, WalletSelectionValue> = {
    'All transactions': '',
    'Incomes': WalletTransactionType.Incomes,
    'Expenses': WalletTransactionType.Expenses,
  }

  private transactionTypeSub!: Subscription;

  public transactionsTypeForm = new FormControl<WalletSelectionValue>('');

  ngOnInit(): void {
    this.transactionsTypeForm.setValue(this.type ?? this.selectTransactionsTypes['All transactions']);
    this.transactionTypeSub = this.transactionsTypeForm.valueChanges.subscribe((data: WalletSelectionValue | null) => {
      this.setTransactionType.emit(this.transactionsTypeForm.value ?? '');
    });
  }

  public ngOnDestroy(): void {
    this.transactionTypeSub.unsubscribe();
  }

}
