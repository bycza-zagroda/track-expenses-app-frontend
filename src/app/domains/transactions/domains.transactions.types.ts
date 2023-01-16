import { TServerDateTime } from "src/app/common/date-and-time/common-date-and-time.types";
import { TServerEntityId } from "src/app/common/http/common.http.types";

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

export interface IWalletTransactionApiResponse {
  id: TServerEntityId;
  amount: number;
  description?: string;
  type: WalletTransactionType;
  creationDate: TServerDateTime;
}
