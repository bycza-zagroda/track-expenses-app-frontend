import { TServerDateTime } from '../../common/date-and-time/common-date-and-time.types';
import { TServerEntityId } from '../../common/http/common.http.types';

export interface IWalletApiResponse {
  id: TServerEntityId;
  creationDate: TServerDateTime;
  name: string;
}

export interface IWalletManagementItemData extends Omit<IWalletApiResponse, 'id'> {
  id: TServerEntityId | null;
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

export interface IWalletTransactionItemData extends Omit<IWalletTransactionApiResponse, 'id'> {
  id: TServerEntityId | null;
}

export enum WalletTransactionType {
  Incomes = 'INCOMES',
  Expenses = 'EXPENSES',
}

export interface ITransactionPayload {
  description?: string;
  amount: number;
  date: Date;
  type: WalletTransactionType;
}