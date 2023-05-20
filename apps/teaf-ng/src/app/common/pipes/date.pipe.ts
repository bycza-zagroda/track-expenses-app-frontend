import { Pipe, PipeTransform } from '@angular/core';
import { format } from 'date-fns';

@Pipe({
  name: 'dateView',
  standalone: true,
})
export class DatePipe implements PipeTransform {
  public transform(value: Date): string {
    return format(value, 'dd/MM/yyyy');
  }
}
