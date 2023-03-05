import { FormControl } from '@angular/forms';
import { TServerEntityId } from 'src/app/common/http/common.http.types';
import { WalletTransactionType } from 'src/app/domains/transactions/domains.transactions.constants';

export interface ITransactionCategoryModalFormType {
  name: FormControl<string | null>;
  type: FormControl<WalletTransactionType | null>;
}

export interface ITransactionCategoryEditorPayload {
  categoryId?: TServerEntityId;
  type: WalletTransactionType;
}
