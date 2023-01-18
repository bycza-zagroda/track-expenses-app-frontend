import { TServerEntityId } from 'src/app/common/http/common.http.types';
import {
  IWalletTransactionApiResponse,
  IWalletTransactionItemData,
  WalletTransactionType,
} from 'src/app/domains/transactions/domains.transactions.types';

export class WalletsDetailsTransaction {
  public readonly id: TServerEntityId | null;
  public readonly date: Date;
  public readonly description: string | null;
  public readonly type: WalletTransactionType;
  public readonly amount: number;

  public constructor(data: IWalletTransactionItemData) {
    this.id = data.id;
    this.date = new Date(data.creationDate);
    this.description = data.description ?? null;
    this.type = data.type;
    this.amount = data.amount;
  }

  public static create(data: Partial<IWalletTransactionApiResponse>): WalletsDetailsTransaction {
    return new WalletsDetailsTransaction({
      id: data.id ?? null,
      amount: data.amount ?? 0,
      creationDate: data.creationDate ?? '',
      description: data.description ?? '',
      type: data.type ?? WalletTransactionType.Incomes,
    });
  }
}