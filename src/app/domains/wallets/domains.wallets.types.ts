import { TServerDateTime } from '../../common/date-and-time/common-date-and-time.types';
import { TServerEntityId } from '../../common/http/common.http.types';
import { NotificationType } from './domains.wallets.enums';

export interface IWalletApiResponse {
  id: TServerEntityId;
  creationDate: TServerDateTime;
  name: string;
}

export interface IWalletPayload {
  name: string;
}

export interface INotification {
    type: NotificationType,
    message: string,
}