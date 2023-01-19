import { WalletsDetailsTransaction } from 'src/app/pages/wallets/wallet-details/pages-wallet-details-item.model';
import { NEW_DATE_EXAMPLE1 } from '../wallets/domains.wallets.mocks';
import { WalletTransactionType } from './domains.transactions.constants';
import { ITransactionPayload, IWalletTransactionApiResponse } from './domains.transactions.types';

export function WALLET_TRANSACTIONS_API_RESPONSE_MOCK(id: number): IWalletTransactionApiResponse[] {
  if(id === 1) {
    return  [
      {
        id: 1,
        creationDate: new Date(2020, 7, 12).toLocaleDateString(),
        description: 'description 1',
        amount: 300,
        type: WalletTransactionType.Incomes,
      },
      {
        id: 2,
        creationDate: new Date(2020, 1, 5).toLocaleDateString(),
        description: 'description 2',
        amount: 50,
        type: WalletTransactionType.Expenses,
      },
      {
        id: 3,
        creationDate: new Date(2020, 3, 1).toLocaleDateString(),
        description: 'description 3',
        amount: 230,
        type: WalletTransactionType.Incomes,
      },
    ];
  }

  return  [
    {
      id: 4, creationDate: new Date(2018, 7, 12).toLocaleDateString(),
      description: 'description 4',
      amount: 320,
      type: WalletTransactionType.Incomes,
    },
    {
      id: 5,
      creationDate: new Date(2018, 1, 5).toLocaleDateString(),
      description: 'description 5', amount: 150,
      type: WalletTransactionType.Expenses,
    },
    {
      id: 6,
      creationDate: new Date(2018, 3, 1).toLocaleDateString(),
      description: 'description 6',
      amount: 510,
      type: WalletTransactionType.Incomes,
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
  date: new Date(),
  type: WalletTransactionType.Incomes,
};

export const UPDATED_TRANSACTION_PAYLOAD_MOCK: ITransactionPayload = {
  description: 'Desc 1',
  amount: 200,
  date: new Date(),
  type: WalletTransactionType.Incomes,
};

export const WALLET_TRANSACTIONS_API_RESPONSE_1 = [
  {
    id: 1,
    creationDate: new Date(2020, 7, 12).toLocaleDateString(),
    description: 'description 1',
    amount: 300,
    type: WalletTransactionType.Incomes,
  },
  {
    id: 2,
    creationDate: new Date(2020, 1, 5).toLocaleDateString(),
    description: 'description 2',
    amount: 50,
    type: WalletTransactionType.Expenses,
  },
  {
    id: 3,
    creationDate: new Date(2020, 3, 1).toLocaleDateString(),
    description: 'description 3',
    amount: 230,
    type: WalletTransactionType.Incomes,
  },
];

export const WALLET_TRANSACTIONS_API_RESPONSE_2 = [
  {
    id: 4,
    creationDate: new Date(2018, 7, 12).toLocaleDateString(),
    description: 'description 4',
    amount: 320,
    type: WalletTransactionType.Incomes,
  },
  {
    id: 5,
    creationDate: new Date(2018, 1, 5).toLocaleDateString(),
    description: 'description 5',
    amount: 150,
    type: WalletTransactionType.Expenses,
  },
  {
    id: 6,
    creationDate: new Date(2018, 3, 1).toLocaleDateString(),
    description: 'description 6',
    amount: 510,
    type: WalletTransactionType.Incomes,
  },
];

export const WALLET_TRANSACTIONS_INCOME_MOCK = new WalletsDetailsTransaction({
  id: 10,
  amount: 150,
  creationDate: NEW_DATE_EXAMPLE1,
  type: WalletTransactionType.Incomes,
  description: 'Some description 1',
});

export const WALLET_TRANSACTIONS_TO_CREATE_INCOME_MOCK = new WalletsDetailsTransaction({
  id: null,
  amount: 150,
  creationDate: NEW_DATE_EXAMPLE1,
  type: WalletTransactionType.Incomes,
  description: 'Some description 1',
});

export const WALLET_TRANSACTIONS_CREATED_INCOME_MOCK = new WalletsDetailsTransaction({
  id: 200,
  amount: 150,
  creationDate: NEW_DATE_EXAMPLE1,
  type: WalletTransactionType.Incomes,
  description: 'Some description 1',
});

export const UPDATED_WALLET_TRANSACTIONS_INCOME_MOCK = new WalletsDetailsTransaction({
  id: 10,
  amount: 250,
  creationDate: NEW_DATE_EXAMPLE1,
  type: WalletTransactionType.Incomes,
  description: 'Some updated description 1',
});

export const WALLET_TRANSACTIONS_EXPENSE_MOCK = new WalletsDetailsTransaction({
  id: 15,
  amount: 50,
  creationDate: NEW_DATE_EXAMPLE1,
  type: WalletTransactionType.Expenses,
  description: 'Some description 2',
});
