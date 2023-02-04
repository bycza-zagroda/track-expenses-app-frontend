import { formatDate } from '@angular/common';
import { MatDateFormats, NativeDateAdapter } from '@angular/material/core';
import { Injectable } from '@angular/core';

@Injectable()
export class PickDateAdapter extends NativeDateAdapter {
  public override format(date: Date, displayFormat: unknown): string {
    if (displayFormat === 'input') {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return formatDate(date,'dd/MM/YYYY', this.locale);
    } else {
      return date.toDateString();
    }
  }
}

export const TEAF_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: {
      month: 'short',
      year: 'numeric',
      day: 'numeric',
    },
  },
  display: {
    dateInput: 'input',
    monthYearLabel: {
      year: 'numeric',
      month: 'short',
    },
    dateA11yLabel: {
      year: 'numeric',
      month: 'long',
    },
    monthYearA11yLabel: {
      year: 'numeric',
      month: 'long',
    },
  },
};
