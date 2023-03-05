import { TServerEntityId } from 'src/app/common/http/common.http.types';
import {
  WalletTransactionType,
} from 'src/app/domains/transactions/domains.transactions.constants';
import {
  ITransactionPayload,
  IWalletTransactionApiResponse,
  IWalletTransactionItemData,
} from 'src/app/domains/transactions/domains.transactions.types';

export class WalletTransaction {
  public readonly id: TServerEntityId | null;
  public readonly creationDate: Date;
  public readonly date: Date;
  public readonly description: string | null;
  public readonly type: WalletTransactionType;
  public readonly amount: number;
  public readonly walletId: TServerEntityId;
  public readonly categoryId: TServerEntityId | null;

  public constructor(data: IWalletTransactionItemData) {
    this.id = data.id;
    this.creationDate = new Date(data.creationDate);
    this.date = new Date(data.date);
    this.description = data.description ?? null;
    this.type = data.type;
    this.amount = data.amount;
    this.walletId = data.walletId;
    this.categoryId = data.categoryId ?? null;
  }

  public static create(data: Partial<IWalletTransactionApiResponse>): WalletTransaction {
    return new WalletTransaction({
      id: data.id ?? null,
      amount: data.amount ?? 0,
      creationDate: data.creationDate ?? new Date().toISOString(),
      date: data.date ?? new Date().toISOString(),
      description: data.description ?? null,
      type: data.type ?? WalletTransactionType.Income,
      walletId: data.walletId!,
      categoryId: data.categoryId ?? null,
    });
  }

  public toPayload(): ITransactionPayload {
    return {
      amount: this.amount,
      date: this.date.toISOString(),
      type: this.type,
      description: this.description,
      walletId: this.walletId,
      categoryId: this.categoryId,
    };
  }
}
