import { IWalletApiResponse, IWalletPayload } from '../../../domains/wallets/domains.wallets.types';

export class WalletsManagementItem {
  public readonly id: number | null;
  public readonly createdAt: Date;
  public readonly name: string;

  public constructor(data: IWalletApiResponse) {
    this.id = data.id > 0 ? data.id : null;
    this.createdAt = new Date(data.creationDate);
    this.name = data.name;
  }

  public toPayload(): IWalletPayload {
    return { name: this.name }
  }

  public static create(data: Partial<IWalletApiResponse>): WalletsManagementItem {
    return new WalletsManagementItem({
        id: data.id ?? 0,
        name: data.name ?? '',
        creationDate: data.creationDate ?? new Date().toString(),
    });
  }
}
