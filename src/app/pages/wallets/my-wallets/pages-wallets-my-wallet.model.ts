import { IWalletApiResponse, IWalletPayload } from '../../../domains/wallets/domains.wallets.types';

export class MyWallet {
  public readonly id: number | null;
  public readonly createdAt: Date;
  public readonly name: string;

  public constructor(data: IWalletApiResponse) {
    this.id = data.id === 0 ? null : data.id;
    this.createdAt = new Date(data.creationDate);
    this.name = data.name;
  }

  public toPayload(): IWalletPayload {
    return { name: this.name }
  }

  public static create(data: Partial<IWalletApiResponse>): MyWallet {
    return new MyWallet({
        id: data.id ?? 0,
        name: data.name ?? '',
        creationDate: data.creationDate ?? new Date().toString(),
    });
  }
}
