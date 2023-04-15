import { TServerDateTime, TServerEntityId } from '../../common/types';
import { TransactionType } from './transaction.constants';

export interface ITransactionResponse {
  id: TServerEntityId;
  amount: number;
  description: string | null;
  type: TransactionType;
  creationDate: TServerDateTime;
  date: TServerDateTime;
  walletId: TServerEntityId;
  categoryId: TServerEntityId | null;
}

export interface ITransactionData<IsNew extends boolean = true> {
  id: IsNew extends true ? null : TServerEntityId;
  amount: number;
  description?: string | null;
  type: TransactionType;
  createdAt?: Date | TServerDateTime;
  date: Date | TServerDateTime;
  walletId: TServerEntityId;
  categoryId?: TServerEntityId | null;
}

export interface ITransactionPayload {
  description: string | null;
  amount: number;
  date: TServerDateTime;
  type: TransactionType;
  walletId: TServerEntityId;
  categoryId: TServerEntityId | null;
}
