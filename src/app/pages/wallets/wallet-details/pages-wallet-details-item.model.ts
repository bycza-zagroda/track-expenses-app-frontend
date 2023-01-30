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
  public readonly transactionDate: Date;
  public readonly description: string | null;
  public readonly type: WalletTransactionType;
  public readonly amount: number;
  public readonly walletId: TServerEntityId;

  public constructor(data: IWalletTransactionItemData) {
    this.id = data.id;
    this.creationDate = new Date(data.creationDate);
    this.transactionDate = new Date(data.transactionDate);
    this.description = data.description ?? null;
    this.type = data.type;
    this.amount = data.amount;
    this.walletId = data.walletId;
  }

  public static create(data: Partial<IWalletTransactionApiResponse>): WalletTransaction {
    return new WalletTransaction({
      id: data.id ?? null,
      amount: data.amount ?? 0,
      creationDate: data.creationDate ?? new Date().toISOString(),
      transactionDate: data.transactionDate ?? new Date().toISOString(),
      description: data.description ?? null,
      type: data.type ?? WalletTransactionType.Incomes,
      walletId: data.walletId!,
    });
  }

  public toPayload(): ITransactionPayload {
    return {
      amount: this.amount,
      transactionDate: this.transactionDate.toISOString(),
      type: this.type,
      description: this.description,
      walletId: this.walletId,
    };
  }
}