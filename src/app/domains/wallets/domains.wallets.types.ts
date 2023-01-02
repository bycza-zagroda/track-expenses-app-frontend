import { TServerDateTime } from '../../common/date-and-time/common-date-and-time.types';
import { TServerEntityId } from '../../common/http/common.http.types';

export interface IWalletApiResponse {
  id: TServerEntityId;
  creationDate: TServerDateTime;
  name: string;
}

export interface IWalletPayload {
  name: string;
}

export interface IWalletTransactionApiResponse {
  id: TServerEntityId;
  amount: number;
  description?: string;
  type: WalletTransactionType;
  creationDate: TServerDateTime;
}

export enum WalletTransactionType {
  Incomes = 'INCOMES',
  Expenses = 'EXPENSES',
}