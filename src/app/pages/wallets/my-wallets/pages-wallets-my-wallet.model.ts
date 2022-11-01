import { IWalletApiResponse } from '../../../domains/wallets/domains.wallets.types';

export class MyWallet {
  public readonly id: number;
  public readonly createdAt: Date;
  public readonly name: string;

  public constructor(data: IWalletApiResponse) {
    this.id = data.id;
    this.createdAt = new Date(data.creationDate);
    this.name = data.name;
  }
}
