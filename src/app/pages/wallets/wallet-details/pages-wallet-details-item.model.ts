import { IWalletTransactionApiResponse } from 'src/app/domains/wallets/domains.wallets.types';

export class WalletsDetailsTransaction {
  public readonly id: number | null;
  public readonly date: Date;
  public readonly description: string;
  public readonly amount: number;

  public constructor(data: IWalletTransactionApiResponse) {
    this.id = data.id === 0 ? null : data.id;
    this.date = new Date(data.creationDate);
    this.description = data.description;
    this.amount = data.amount;
  }
}