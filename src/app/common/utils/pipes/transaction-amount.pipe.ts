import { Pipe, PipeTransform } from '@angular/core';
import { WalletTransactionType } from 'src/app/domains/transactions/domains.transactions.types';

@Pipe({
  name: 'transactionAmount',
})
export class TransactionAmountPipe implements PipeTransform {
  public transform(value: number, type?: WalletTransactionType): string {
    if(value === 0) {
      return value.toString();
    }

    return (type == WalletTransactionType.Expenses ? '- ' : '+ ') + value.toString();
  }
}
