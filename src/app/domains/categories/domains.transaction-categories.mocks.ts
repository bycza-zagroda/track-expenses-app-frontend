import { TransactionCategory } from 'src/app/pages/categories/transaction-category.model';
import { WalletTransactionType } from '../transactions/domains.transactions.constants';
import { ITransactionCategoryApiResponse } from './domains.transaction-categories.types';

export const transactionCategoriesMock: ITransactionCategoryApiResponse[] = [
  { id: 1, name: 'Nic', type: WalletTransactionType.Income },
  { id: 2, name: 'aNic2', type: WalletTransactionType.Income },
  { id: 3, name: 'bNic3', type: WalletTransactionType.Expense },
];

export const transactionCategoriesObjectsMock: TransactionCategory[] =
  transactionCategoriesMock.map( (c: ITransactionCategoryApiResponse) =>
    new TransactionCategory({ id: c.id, name: c.name, type: c.type })
  );
