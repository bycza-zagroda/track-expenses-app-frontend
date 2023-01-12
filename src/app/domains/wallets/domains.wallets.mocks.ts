import { WalletsManagementItem } from 'src/app/pages/wallets/management/pages-wallets-wallets-management-item.model';
import { WalletsDetailsTransaction } from 'src/app/pages/wallets/wallet-details/pages-wallet-details-item.model';
import { IWalletApiResponse, IWalletTransactionApiResponse, WalletTransactionType } from './domains.wallets.types';

export const DATE_EXAMPLE = '2022-10-22T09:47:52.595721658Z';

export const WALLET_RESP_MOCK = { name: 'Wallet Mock 1', creationDate: DATE_EXAMPLE, id: 1 } as const;
export const UPDATED_WALLET_RESP_MOCK = { name: 'Wallet Mock 1 - changed name', creationDate: DATE_EXAMPLE, id: 1 } as const;
export const WALLET_PAYLOAD_MOCK = { name: 'Wallet 6' } as const;
export const WALLET_INSTANCE_MOCK = new WalletsManagementItem(WALLET_RESP_MOCK);
export const UPDATED_WALLET_INSTANCE_MOCK = new WalletsManagementItem(UPDATED_WALLET_RESP_MOCK);

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
        amount: -50,
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
      description: 'description 5', amount: -150,
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

export function GET_WALLETS_API_RESPONSE_MOCK(): IWalletApiResponse[] {
  return [
    { id: 1, name: 'wallet1', creationDate: '' },
    { id: 2, name: 'wallet2', creationDate: '' },
  ];
}
