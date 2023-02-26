import { TServerEntityId } from 'src/app/common/http/common.http.types';
import { ITransactionCategoryApiResponse } from 'src/app/domains/categories/domains.transaction-categories.types';
import { WalletTransactionType } from 'src/app/domains/transactions/domains.transactions.constants';

export class TransactionCategory {
  public readonly id: TServerEntityId | null;
  public readonly name: string;
  public readonly type: WalletTransactionType;

  public constructor({ id, name, type }: ITransactionCategoryApiResponse) {
    this.id = id;
    this.name = name;
    this.type = type;
  }
}