import { WalletTransaction } from 'src/app/pages/wallets/wallet-details/pages-wallet-details-item.model';
import { WalletTransactionType } from './domains.transactions.constants';
import { ITransactionPayload, IWalletTransactionApiResponse } from './domains.transactions.types';

export function WALLET_TRANSACTIONS_API_RESPONSE_MOCK(id: number): IWalletTransactionApiResponse[] {
  if(id === 1) {
    return  [
      {
        id: 1,
        creationDate: new Date(2020, 7, 12).toISOString(),
        date: new Date(2020, 7, 13).toISOString(),
        description: 'description 1',
        amount: 300,
        type: WalletTransactionType.Income,
        walletId: 1,
      },
      {
        id: 2,
        creationDate: new Date(2020, 1, 5).toISOString(),
        date: new Date(2020, 1, 6).toISOString(),
        description: 'description 2',
        amount: 50,
        type: WalletTransactionType.Expense,
        walletId: 1,
      },
      {
        id: 3,
        creationDate: new Date(2020, 3, 1).toISOString(),
        date: new Date(2020, 3, 2).toISOString(),
        description: 'description 3',
        amount: 230,
        type: WalletTransactionType.Income,
        walletId: 1,
      },
    ];
  }

  return  [
    {
      id: 4,
      creationDate: new Date(2018, 7, 12).toISOString(),
      date: new Date(2018, 7, 13).toISOString(),
      description: 'description 4',
      amount: 320,
      type: WalletTransactionType.Income,
      walletId: 1,
    },
    {
      id: 5,
      creationDate: new Date(2018, 1, 5).toISOString(),
      date: new Date(2018, 1, 6).toISOString(),
      description: 'description 5', amount: 150,
      type: WalletTransactionType.Expense,
      walletId: 1,
    },
    {
      id: 6,
      creationDate: new Date(2018, 3, 1).toISOString(),
      date: new Date(2018, 3, 2).toISOString(),
      description: 'description 6',
      amount: 510,
      type: WalletTransactionType.Income,
      walletId: 1,
    },
  ];
}

export function WALLET_TRANSACTIONS_OBJECTS_MOCK(id: number): WalletTransaction[]  {
  return WALLET_TRANSACTIONS_API_RESPONSE_MOCK(id).map(
    (item: IWalletTransactionApiResponse) => new WalletTransaction(item),
  );
}

export function UPDATED_WALLET_TRANSACTIONS_OBJECT_MOCK(id: number): WalletTransaction  {
  const object = WALLET_TRANSACTIONS_API_RESPONSE_MOCK(id)[0];

  const updatedObject = { ...object, amount: 500, description: 'Some updated description' };

  return new WalletTransaction(updatedObject);
}

export const TRANSACTION_PAYLOAD_MOCK: ITransactionPayload = {
  description: 'Desc 1',
  amount: 200,
  date: new Date().toISOString(),
  type: WalletTransactionType.Income,
  walletId: 1,
};

export const UPDATED_TRANSACTION_PAYLOAD_MOCK: ITransactionPayload = {
  description: 'Desc 1',
  amount: 200,
  date: new Date().toISOString(),
  type: WalletTransactionType.Income,
  walletId: 1,
};

export const WALLET_TRANSACTIONS_API_RESPONSE_1 = [
  {
    id: 1,
    creationDate: new Date(2020, 7, 12).toISOString(),
    description: 'description 1',
    amount: 300,
    type: WalletTransactionType.Income,
  },
  {
    id: 2,
    creationDate: new Date(2020, 1, 5).toISOString(),
    description: 'description 2',
    amount: 50,
    type: WalletTransactionType.Expense,
  },
  {
    id: 3,
    creationDate: new Date(2020, 3, 1).toISOString(),
    description: 'description 3',
    amount: 230,
    type: WalletTransactionType.Income,
  },
];

export const WALLET_TRANSACTIONS_API_RESPONSE_2 = [
  {
    id: 4,
    creationDate: new Date(2018, 7, 12).toISOString(),
    description: 'description 4',
    amount: 320,
    type: WalletTransactionType.Income,
  },
  {
    id: 5,
    creationDate: new Date(2018, 1, 5).toISOString(),
    description: 'description 5',
    amount: 150,
    type: WalletTransactionType.Expense,
  },
  {
    id: 6,
    creationDate: new Date(2018, 3, 1).toISOString(),
    description: 'description 6',
    amount: 510,
    type: WalletTransactionType.Income,
  },
];

export const WALLET_TRANSACTIONS_INCOME_MOCK = new WalletTransaction({
  id: 10,
  amount: 150,
  creationDate: new Date(2018, 3, 1).toISOString(),
  date: new Date(2018, 3, 1).toISOString(),
  type: WalletTransactionType.Income,
  description: 'Some description 1',
  walletId: 1,
});

export const WALLET_TRANSACTIONS_TO_CREATE_INCOME_MOCK = new WalletTransaction({
  id: null,
  amount: 150,
  creationDate: new Date(2018, 3, 1).toISOString(),
  date: new Date(2018, 3, 1).toISOString(),
  type: WalletTransactionType.Income,
  description: 'Some description 1',
  walletId: 1,
});

export const WALLET_TRANSACTIONS_CREATED_INCOME_MOCK = new WalletTransaction({
  id: 200,
  amount: 150,
  creationDate: new Date(2018, 3, 1).toISOString(),
  date: new Date(2018, 3, 1).toISOString(),
  type: WalletTransactionType.Income,
  description: 'Some description 1',
  walletId: 1,
});

export const UPDATED_WALLET_TRANSACTIONS_INCOME_MOCK = new WalletTransaction({
  id: 10,
  amount: 250,
  creationDate: new Date(2018, 3, 1).toISOString(),
  date: new Date(2018, 3, 1).toISOString(),
  type: WalletTransactionType.Income,
  description: 'Some updated description 1',
  walletId: 1,
});

export const WALLET_TRANSACTIONS_EXPENSE_MOCK = new WalletTransaction({
  id: 15,
  amount: 50,
  creationDate: new Date(2018, 3, 1).toISOString(),
  date: new Date(2018, 3, 1).toISOString(),
  type: WalletTransactionType.Expense,
  description: 'Some description 2',
  walletId: 1,
});
