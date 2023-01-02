import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionAmount'
})
export class TransactionAmountPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    const amount = value as number;
    return amount < 0 ? '- ' + Math.abs(amount).toString() : '+ ' + amount.toString();
  }

}
