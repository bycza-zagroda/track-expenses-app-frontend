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
