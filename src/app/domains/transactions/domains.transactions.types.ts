import { TServerDateTime } from 'src/app/common/date-and-time/common-date-and-time.types';
import { TServerEntityId } from 'src/app/common/http/common.http.types';
import { WalletTransactionType } from './domains.transactions.constants';

export interface IWalletTransactionItemData extends Omit<IWalletTransactionApiResponse, 'id'> {
  id: TServerEntityId | null;
}

export type WalletSelectionValue = WalletTransactionType | '';

export interface ITransactionPayload {
  description: string | null;
  amount: number;
  date: TServerDateTime;
  type: WalletTransactionType;
  walletId: TServerEntityId;
  categoryId: TServerEntityId | null;
}

export interface IWalletTransactionApiResponse {
  id: TServerEntityId;
  amount: number;
  description: string | null;
  type: WalletTransactionType;
  creationDate: TServerDateTime;
  date: TServerDateTime;
  walletId: TServerEntityId;
  categoryId: TServerEntityId | null;
}
