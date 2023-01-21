import { FormControl } from '@angular/forms';
import { WalletTransactionType } from 'src/app/domains/transactions/domains.transactions.constants';

export interface ITransactionModalData {
  amount: number;
  description?: string;
  date: Date;
  type: WalletTransactionType;
}

export interface IWalletTransactionModalFormType {
  amount: FormControl<number | null>;
  description?: FormControl<string | null>;
  date: FormControl<Date | null>;
  type: FormControl<WalletTransactionType | null>;
}