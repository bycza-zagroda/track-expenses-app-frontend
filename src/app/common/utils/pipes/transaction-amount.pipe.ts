import { Pipe, PipeTransform } from '@angular/core';
import { WalletTransactionType } from 'src/app/domains/transactions/domains.transactions.constants';

@Pipe({
  name: 'transactionAmount',
})
export class TransactionAmountPipe implements PipeTransform {
  public transform(value: number, type?: WalletTransactionType): string {
    if (value === 0) {
      return value.toFixed(2).toString();
    }

    return (type == WalletTransactionType.Expense ? '- ' : '+ ') + value.toFixed(2).toString();
  }
}
