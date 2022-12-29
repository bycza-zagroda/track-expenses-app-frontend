import { IWalletDetailsApiResponse, IWalletDetailsTransactionApiResponse } from 'src/app/domains/wallets/domains.wallets.types';

export class WalletDetailsItem {
  public readonly id: number | null;
  public readonly name: string;
  public readonly transactions: WalletsDetailsTransaction[];

  public constructor(data: IWalletDetailsApiResponse) {
    this.id = data.id === 0 ? null : data.id;
    this.name = data.name;
    this.transactions = data.transactions.map((item: IWalletDetailsTransactionApiResponse) => new WalletsDetailsTransaction(item));
  }
}

export class WalletsDetailsTransaction {
  public readonly id: number | null;
  public readonly date: Date;
  public readonly description: string;
  public readonly amount: number;

  public constructor(data: IWalletDetailsTransactionApiResponse) {
    this.id = data.id === 0 ? null : data.id;
    this.date = new Date(data.date);
    this.description = data.description;
    this.amount = data.amount;
  }
}