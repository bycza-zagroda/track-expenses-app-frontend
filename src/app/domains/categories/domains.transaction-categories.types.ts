import { TServerEntityId } from 'src/app/common/http/common.http.types';
import { WalletTransactionType } from '../transactions/domains.transactions.constants';

export type CategorySelectionValue = WalletTransactionType | '';

export interface ITransactionCategoryApiResponse {
  id: TServerEntityId;
  name: string;
  type: WalletTransactionType;
}

