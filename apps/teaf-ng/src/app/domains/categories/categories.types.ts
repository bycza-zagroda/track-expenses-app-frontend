import { TServerEntityId } from '../../common/types';
import { TransactionType } from '../transactions/transaction.constants';

export interface ICategoryResponse {
  id: TServerEntityId;
  name: string;
  type: TransactionType;
}

export interface ICategoryData<IsNew extends boolean = true> {
  id: IsNew extends true ? null : TServerEntityId;
  name: string;
  type: TransactionType;
}

export interface ICategoryPayload {
  name: string;
  type: TransactionType;
}
