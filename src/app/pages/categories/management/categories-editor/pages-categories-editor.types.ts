import { FormControl } from '@angular/forms';
import { WalletTransactionType } from 'src/app/domains/transactions/domains.transactions.constants';

export interface ITransactionCategoryModalFormType {
  name: FormControl<string | null>;
  type: FormControl<WalletTransactionType | null>;
}
