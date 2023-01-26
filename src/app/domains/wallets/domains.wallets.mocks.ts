import { WalletsManagementItem } from 'src/app/pages/wallets/management/pages-wallets-wallets-management-item.model';
import {
  IWalletApiResponse,
} from './domains.wallets.types';

export const DATE_EXAMPLE = '2022-10-22T09:47:52.595721658Z';
export const DATE_EXAMPLE2 = '2022-15-22T09:57:52.595721658Z';
export const NEW_DATE_EXAMPLE1 = new Date().toString();
export const NEW_DATE_EXAMPLE2 = new Date().setDate(new Date().getDate() + 2).toString();
export const WALLET_RESP_MOCK = { name: 'Wallet Mock 1', creationDate: DATE_EXAMPLE, id: 1 } as const;
export const UPDATED_WALLET_RESP_MOCK = { name: 'Wallet Mock 1 - changed name', creationDate: DATE_EXAMPLE, id: 1 } as const;
export const WALLET_PAYLOAD_MOCK = { name: 'Wallet 6' } as const;
export const WALLET_INSTANCE_MOCK = new WalletsManagementItem(WALLET_RESP_MOCK);
export const UPDATED_WALLET_INSTANCE_MOCK = new WalletsManagementItem(UPDATED_WALLET_RESP_MOCK);

export function GET_WALLETS_API_RESPONSE_MOCK(): IWalletApiResponse[] {
  return [
    { id: 1, name: 'wallet1', creationDate: '' },
    { id: 2, name: 'wallet2', creationDate: '' },
  ];
}
