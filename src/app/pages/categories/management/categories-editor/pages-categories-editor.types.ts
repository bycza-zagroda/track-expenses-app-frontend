import { FormControl } from '@angular/forms';
import { WalletTransactionType } from 'src/app/domains/transactions/domains.transactions.constants';

export interface ITransactionCategoryModalData {
  name: string;
  type: WalletTransactionType;
}

export interface ITransactioCategorynModalFormType {
  name: FormControl<string | null>;
  type: FormControl<WalletTransactionType | null>;
}
