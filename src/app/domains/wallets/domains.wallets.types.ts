import { TServerDateTime } from '../../common/date-and-time/common-date-and-time.types';
import { TServerEntityId } from '../../common/http/common.http.types';

export interface IWalletApiResponse {
  id: TServerEntityId;
  creationDate: TServerDateTime;
  name: string;
}

export interface IWalletModalData {
  title: string;
  isNewWallet: boolean;
  inputData: string;
}

export interface IWalletModalUserInput {
  name: string;
}