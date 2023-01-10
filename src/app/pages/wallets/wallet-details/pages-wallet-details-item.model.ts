import { IWalletTransactionApiResponse, WalletTransactionType } from 'src/app/domains/wallets/domains.wallets.types';

export class WalletsDetailsTransaction {
  public readonly id: number | null;
  public readonly date: Date;
  public readonly description: string | null;
  public readonly type: WalletTransactionType;
  public readonly amount: number;

  public constructor(data: IWalletTransactionApiResponse) {
    this.id = data.id;
    this.date = new Date(data.creationDate);
    this.description = data.description ?? null;
    this.type = data.type;
    this.amount = data.amount;
  }
}