export interface WalletsDetails {
  id: number;
  name: string;
  transaction: WalletTransactionDetails[];
}

export interface WalletTransactionDetails {
  id: number;
  date: string;
  description: string;
  amount: number;
}

export enum WalletTransactionType {
  AllTransaction = "ALL_TRANSACTIONS",
  Incomes = "INCOMES",
  Expences = "EXPENCES",
}