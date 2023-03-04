import { ITransactionCategory } from 'src/app/domains/categories/domains.transaction-categories.types';
import { TransactionCategory } from './transaction-category.model';

export class TransactionCategoryFull extends TransactionCategory {
  public readonly financialTransactionsCounter: number | null;

  public constructor({ id, name, type }: ITransactionCategory, financialTransactionsCounter: number) {
    super({ id, name, type });
    this.financialTransactionsCounter = financialTransactionsCounter;
  }
}
