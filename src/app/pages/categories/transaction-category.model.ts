import { TServerEntityId } from 'src/app/common/http/common.http.types';
import {
  ITransactionCategoryApiResponse,
  ITransactionCategory,
  ITransactionCategoryPayload,
} from 'src/app/domains/categories/domains.transaction-categories.types';
import { WalletTransactionType } from 'src/app/domains/transactions/domains.transactions.constants';

export class TransactionCategory {
  public readonly id: TServerEntityId | null;
  public readonly name: string;
  public readonly type: WalletTransactionType;

  public constructor({ id, name, type }: ITransactionCategory) {
    this.id = id;
    this.name = name;
    this.type = type;
  }

  public static createFromApiResponse({ id, name, type }: ITransactionCategoryApiResponse): TransactionCategory {
    return new TransactionCategory({ id, name, type });
  }

  public toPayload(): ITransactionCategoryPayload {
    return { name: this.name, type: this.type };
  }
}
