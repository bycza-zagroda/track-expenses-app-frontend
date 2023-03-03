import { TServerEntityId } from 'src/app/common/http/common.http.types';
import { WalletTransactionType } from '../transactions/domains.transactions.constants';

export interface ITransactionCategory {
  id: TServerEntityId | null;
  name: string;
  type: WalletTransactionType;
}

export interface ITransactionCategoryApiResponse extends Omit<ITransactionCategory, 'id'> {
  id: TServerEntityId;
}

export interface ITransactionCategoryPayload {
  name: string;
  type: WalletTransactionType;
}
