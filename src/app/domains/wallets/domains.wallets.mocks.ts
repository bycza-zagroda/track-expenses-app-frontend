import { WalletsManagementItem } from 'src/app/pages/wallets/management/pages-wallets-wallets-management-item.model';
import { IWalletApiResponse, IWalletTransactionApiResponse, WalletTransactionType } from './domains.wallets.types';

export const WALLET_RESP_MOCK = { name: 'Wallet 1', creationDate: '2022-10-22T09:47:52.595721658Z', id: 1 } as const;
export const WALLET_PAYLOAD_MOCK = { name: 'Wallet 6' } as const;
export const WALLET_INSTANCE_MOCK = new WalletsManagementItem(WALLET_RESP_MOCK);

export function WALLET_DETAILS_API_RESPONSE_MOCK(id: number): IWalletTransactionApiResponse[] {
  return  [
      { id: 1, creationDate: new Date(2020, 7, 12).toLocaleDateString(), description: 'description 1', amount: 300, type: WalletTransactionType.Incomes },
      { id: 2, creationDate: new Date(2020, 1, 5).toLocaleDateString(), description: 'description 2', amount: -50, type: WalletTransactionType.Expenses },
      { id: 3, creationDate: new Date(2020, 3, 1).toLocaleDateString(), description: 'description 3', amount: 230, type: WalletTransactionType.Incomes },
    ]
}

export function GET_WALLETS_API_RESPONSE_MOCK(): IWalletApiResponse[] {
  return [
    {id: 1, name: 'wallet1', creationDate: '',},
    {id: 2, name: 'wallet2', creationDate: '',},
  ]
}