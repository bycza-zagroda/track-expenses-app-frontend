import { WalletsDetailsTransaction } from 'src/app/pages/wallets/wallet-details/pages-wallet-details-item.model';
import { NEW_DATE_EXAMPLE1, NEW_DATE_EXAMPLE2 } from '../wallets/domains.wallets.mocks';
import { WalletTransactionType } from './domains.transactions.constants';
import { ITransactionPayload, IWalletTransactionApiResponse } from './domains.transactions.types';

export function WALLET_TRANSACTIONS_API_RESPONSE_MOCK(id: number): IWalletTransactionApiResponse[] {
  if(id === 1) {
    return  [
      {
        id: 1,
        creationDate: new Date(2020, 7, 12).toISOString(),
        transactionDate: new Date(2020, 7, 13).toISOString(),
        description: 'description 1',
        amount: 300,
        type: WalletTransactionType.Incomes,
        walletId: 1,
      },
      {
        id: 2,
        creationDate: new Date(2020, 1, 5).toISOString(),
        transactionDate: new Date(2020, 1, 6).toISOString(),
        description: 'description 2',
        amount: 50,
        type: WalletTransactionType.Expenses,
        walletId: 1,
      },
      {
        id: 3,
        creationDate: new Date(2020, 3, 1).toISOString(),
        transactionDate: new Date(2020, 3, 2).toISOString(),
        description: 'description 3',
        amount: 230,
        type: WalletTransactionType.Incomes,
        walletId: 1,
      },
    ];
  }

  return  [
    {
      id: 4,
      creationDate: new Date(2018, 7, 12).toISOString(),
      transactionDate: new Date(2018, 7, 13).toISOString(),
      description: 'description 4',
      amount: 320,
      type: WalletTransactionType.Incomes,
      walletId: 1,
    },
    {
      id: 5,
      creationDate: new Date(2018, 1, 5).toISOString(),
      transactionDate: new Date(2018, 1, 6).toISOString(),
      description: 'description 5', amount: 150,
      type: WalletTransactionType.Expenses,
      walletId: 1,
    },
    {
      id: 6,
      creationDate: new Date(2018, 3, 1).toISOString(),
      transactionDate: new Date(2018, 3, 2).toISOString(),
      description: 'description 6',
      amount: 510,
      type: WalletTransactionType.Incomes,
      walletId: 1,
    },
  ];
}

export function WALLET_TRANSACTIONS_OBJECTS_MOCK(id: number): WalletsDetailsTransaction[]  {
  return WALLET_TRANSACTIONS_API_RESPONSE_MOCK(id).map(
    (item: IWalletTransactionApiResponse) => new WalletsDetailsTransaction(item),
  );
}

export function UPDATED_WALLET_TRANSACTIONS_OBJECT_MOCK(id: number): WalletsDetailsTransaction  {
  const object = WALLET_TRANSACTIONS_API_RESPONSE_MOCK(id)[0];

  const updatedObject = { ...object, amount: 500, description: 'Some updated description' };

  return new WalletsDetailsTransaction(updatedObject);
}

export const TRANSACTION_PAYLOAD_MOCK: ITransactionPayload = {
  description: 'Desc 1',
  amount: 200,
  transactionDate: new Date().toISOString(),
  type: WalletTransactionType.Incomes,
  walletId: 1,
};

export const UPDATED_TRANSACTION_PAYLOAD_MOCK: ITransactionPayload = {
  description: 'Desc 1',
  amount: 200,
  transactionDate: new Date().toISOString(),
  type: WalletTransactionType.Incomes,
  walletId: 1,
};

export const WALLET_TRANSACTIONS_API_RESPONSE_1 = [
  {
    id: 1,
    creationDate: new Date(2020, 7, 12).toISOString(),
    description: 'description 1',
    amount: 300,
    type: WalletTransactionType.Incomes,
  },
  {
    id: 2,
    creationDate: new Date(2020, 1, 5).toISOString(),
    description: 'description 2',
    amount: 50,
    type: WalletTransactionType.Expenses,
  },
  {
    id: 3,
    creationDate: new Date(2020, 3, 1).toISOString(),
    description: 'description 3',
    amount: 230,
    type: WalletTransactionType.Incomes,
  },
];

export const WALLET_TRANSACTIONS_API_RESPONSE_2 = [
  {
    id: 4,
    creationDate: new Date(2018, 7, 12).toISOString(),
    description: 'description 4',
    amount: 320,
    type: WalletTransactionType.Incomes,
  },
  {
    id: 5,
    creationDate: new Date(2018, 1, 5).toISOString(),
    description: 'description 5',
    amount: 150,
    type: WalletTransactionType.Expenses,
  },
  {
    id: 6,
    creationDate: new Date(2018, 3, 1).toISOString(),
    description: 'description 6',
    amount: 510,
    type: WalletTransactionType.Incomes,
  },
];

export const WALLET_TRANSACTIONS_INCOME_MOCK = new WalletsDetailsTransaction({
  id: 10,
  amount: 150,
  creationDate: NEW_DATE_EXAMPLE1,
  transactionDate: NEW_DATE_EXAMPLE2,
  type: WalletTransactionType.Incomes,
  description: 'Some description 1',
  walletId: 1,
});

export const WALLET_TRANSACTIONS_TO_CREATE_INCOME_MOCK = new WalletsDetailsTransaction({
  id: null,
  amount: 150,
  creationDate: NEW_DATE_EXAMPLE1,
  transactionDate: NEW_DATE_EXAMPLE2,
  type: WalletTransactionType.Incomes,
  description: 'Some description 1',
  walletId: 1,
});

export const WALLET_TRANSACTIONS_CREATED_INCOME_MOCK = new WalletsDetailsTransaction({
  id: 200,
  amount: 150,
  creationDate: NEW_DATE_EXAMPLE1,
  transactionDate: NEW_DATE_EXAMPLE2,
  type: WalletTransactionType.Incomes,
  description: 'Some description 1',
  walletId: 1,
});

export const UPDATED_WALLET_TRANSACTIONS_INCOME_MOCK = new WalletsDetailsTransaction({
  id: 10,
  amount: 250,
  creationDate: NEW_DATE_EXAMPLE1,
  transactionDate: NEW_DATE_EXAMPLE2,
  type: WalletTransactionType.Incomes,
  description: 'Some updated description 1',
  walletId: 1,
});

export const WALLET_TRANSACTIONS_EXPENSE_MOCK = new WalletsDetailsTransaction({
  id: 15,
  amount: 50,
  creationDate: NEW_DATE_EXAMPLE1,
  transactionDate: NEW_DATE_EXAMPLE2,
  type: WalletTransactionType.Expenses,
  description: 'Some description 2',
  walletId: 1,
});
