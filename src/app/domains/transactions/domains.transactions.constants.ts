import { environment } from 'src/environments/environment';

export const API_TRANSACTIONS_URL = environment.apiUrl + '/transactions';

export enum WalletTransactionType {
  Income = 'INCOME',
  Expense = 'EXPENSE',
}
