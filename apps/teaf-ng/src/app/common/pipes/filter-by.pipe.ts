import { Pipe, PipeTransform } from '@angular/core';
import { KeysMatching } from '../types';

@Pipe({
  name: 'filterByText',
  standalone: true,
})
export class FilterByTextPipe implements PipeTransform {
  public transform<T extends object, K extends KeysMatching<T, string>>(value: T[], fieldName: K, searchText: string): T[] {
    return value.filter(val => {
      const propValue = val[fieldName];

      if (typeof propValue !== 'string') {
        throw new Error(`[${fieldName.toString()}] value is not a string type of value`);
      }

      return propValue.includes(searchText);
    });
  }
}
