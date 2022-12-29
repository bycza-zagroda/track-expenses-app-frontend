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

export interface IWalletDetailsApiResponse {
  id: TServerEntityId;
  name: string;
  creationDate: TServerDateTime;
  transactions: IWalletDetailsTransactionApiResponse[];
}

export interface IWalletDetailsTransactionApiResponse {
  id: TServerEntityId;
  date: TServerDateTime;
  description: string;
  amount: number;
}