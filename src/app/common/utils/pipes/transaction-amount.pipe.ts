import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transactionAmount',
})
export class TransactionAmountPipe implements PipeTransform {

  public transform(value: number): string {
    return value < 0 ? '- ' + Math.abs(value).toString() : '+ ' + value.toString();
  }

}
