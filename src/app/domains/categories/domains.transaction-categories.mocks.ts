import { TransactionCategory } from 'src/app/pages/categories/transaction-category.model';
import { WalletTransactionType } from '../transactions/domains.transactions.constants';
import { ITransactionCategoryApiResponse, ITransactionCategoryPayload } from './domains.transaction-categories.types';

export function transactionCategoriesMockFunc(): ITransactionCategoryApiResponse[] {
  return [
    { id: 1, name: 'Nic', type: WalletTransactionType.Income },
    { id: 2, name: 'aNic2', type: WalletTransactionType.Income },
    { id: 3, name: 'bNic3', type: WalletTransactionType.Expense },
  ];
}

export function transactionCategoriesObjectsMockFunc(): TransactionCategory[] {
  return transactionCategoriesMockFunc().map( (c: ITransactionCategoryApiResponse) =>
    new TransactionCategory({ id: c.id, name: c.name, type: c.type }),
  );
}

export function transactionCategoryObjectMockFunc(): TransactionCategory {
  const c = transactionCategoriesMockFunc()[0];

  return new TransactionCategory({ id: c.id, name: c.name, type: c.type });
}

export function toCreateTransactionCategoryObjectsMockFunc(): TransactionCategory {
  const c = transactionCategoriesMockFunc()[0];

  return new TransactionCategory({ id: null, name: c.name, type: c.type });
}

export function updatedTransactionCategoryObjectMockFunc(): TransactionCategory {
  const c = transactionCategoriesMockFunc()[0];

  return new TransactionCategory({ id: c.id, name: c.name + ' updated', type: c.type });
}

export function createdTransactionCategoryObjectMockFunc(type: WalletTransactionType = WalletTransactionType.Expense)
: TransactionCategory {
  return new TransactionCategory({ id: 50, name: 'Created Category', type });
}

export function categoryPayloadMockFunc(): ITransactionCategoryPayload {
  return { name: 'abc', type: WalletTransactionType.Income };
}

export function categoryResponseMockFunc(): ITransactionCategoryApiResponse {
  return { id: 1, name: 'abc', type: WalletTransactionType.Income };
}
