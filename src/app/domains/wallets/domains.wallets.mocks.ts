import { WalletsManagementItem } from 'src/app/pages/wallets/management/pages-wallets-wallets-management-item.model';

export const WALLET_RESP_MOCK = { name: 'Wallet 1', creationDate: '2022-10-22T09:47:52.595721658Z', id: 1 } as const;
export const WALLET_PAYLOAD_MOCK = { name: 'Wallet 6' } as const;
export const WALLET_INSTANCE_MOCK = new WalletsManagementItem(WALLET_RESP_MOCK);
