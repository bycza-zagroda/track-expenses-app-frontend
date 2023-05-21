import { Pipe, PipeTransform } from '@angular/core';
import { TKeysMatching } from '../types';

@Pipe({
  name: 'sortByDate',
  standalone: true,
})
export class SortByDatePipe implements PipeTransform {
  public transform<T extends object, K extends TKeysMatching<T, Date>>(array: T[], prop: K, descending = false): T[] {
    return array.sort((a, b) => {
      const propAValue = a[prop];
      const propBValue = b[prop];

      if (!(propAValue instanceof Date) || !(propBValue instanceof Date)) {
        throw new Error(`[${prop.toString()}] value is not a proper Date type`);
      }

      if (propAValue === propBValue) {
        return 0;
      }

      return (descending) ? (propAValue < propBValue ? -1 : 1) : (propAValue < propBValue ? 1 : -1);
    });
  }
}
