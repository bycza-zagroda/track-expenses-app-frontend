import { TServerEntityId } from 'src/app/common/http/common.http.types';
import {
  IWalletApiResponse,
  IWalletManagementItemData,
  IWalletPayload,
} from '../../../domains/wallets/domains.wallets.types';

export class WalletsManagementItem {
  public readonly id: TServerEntityId | null;
  public readonly createdAt: Date;
  public readonly name: string;

  public constructor(data: IWalletManagementItemData) {
    this.id = data.id ?? null;
    this.createdAt = new Date(data.creationDate);
    this.name = data.name;
  }

  public static create(data: Partial<IWalletApiResponse>): WalletsManagementItem {
    return new WalletsManagementItem({
      id: data.id ?? null,
      name: data.name ?? '',
      creationDate: data.creationDate ?? new Date().toString(),
    });
  }

  public toPayload(): IWalletPayload {
    return { name: this.name };
  }
}
