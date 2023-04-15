import { TServerDateTime, TServerEntityId } from '../../common/types';

export interface IWalletResponse {
  id: TServerEntityId;
  name: string;
  creationDate: TServerDateTime;
}

export interface IWalletData<IsNew extends boolean = true> {
  id: IsNew extends true ? null : TServerEntityId;
  name: string;
  createdAt?: Date | TServerDateTime;
}

export interface IWalletPayload {
  name: string;
}
