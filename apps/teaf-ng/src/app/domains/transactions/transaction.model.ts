import { ITransactionResponse, ITransactionData, ITransactionPayload } from './transaction.types';
import { TServerEntityId } from '../../common/types';
import { TransactionType } from './transaction.constants';
import { DateUtils } from '../../common/dates/date-utils';

export class Transaction<IsNew extends boolean = false> {
  public readonly amount: number;
  public readonly description: string | null;
  public readonly type: TransactionType;
  public readonly createdAt: Date;
  public readonly date: Date;
  public readonly walletId: TServerEntityId;
  public readonly categoryId: TServerEntityId | null;
  public readonly id: IsNew extends true ? null : TServerEntityId

  private constructor(data: ITransactionData<IsNew>) {
    this.amount = data.amount;
    this.description = data.description ?? null;
    this.type = data.type;
    this.createdAt = data?.createdAt ? DateUtils.parseDate(data.createdAt) : new Date();
    this.date = DateUtils.parseDate(data.date);
    this.walletId = data.walletId;
    this.categoryId = data.categoryId ?? null;
    this.id = data.id;
  }

  public static create<IsNew extends boolean = true>(data: ITransactionData<IsNew>): Transaction<IsNew> {
    return new Transaction(data);
  }

  public static fromResponse(data: ITransactionResponse): Transaction {
    return new Transaction({
      id: data.id,
      amount: data.amount,
      description: data.description,
      type: data.type,
      createdAt: data.creationDate,
      date: data.date,
      walletId: data.walletId,
      categoryId: data.categoryId,
    });
  }

  public copy(data: Partial<ITransactionData>): Transaction<IsNew> {
    return new Transaction({
      id: data.id || this.id,
      amount: data.amount || this.amount,
      description: data.description || this.description,
      type: data.type || this.type,
      createdAt: data.createdAt || this.createdAt,
      date: data.date || this.date,
      walletId: data.walletId || this.walletId,
      categoryId: data.categoryId || this.categoryId,
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
