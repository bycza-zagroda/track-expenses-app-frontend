import { TServerEntityId } from 'src/app/common/http/common.http.types';
import { WalletTransactionType } from 'src/app/domains/transactions/domains.transactions.constants';

export class TransactionCategory {
  public readonly id: TServerEntityId | null;
  public readonly name: string;
  public readonly type: WalletTransactionType;

  public constructor(id: TServerEntityId | null, name: string, type: WalletTransactionType) {
    this.id = id;
    this.name = name;
    this.type = type;
  }
}