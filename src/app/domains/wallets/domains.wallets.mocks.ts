import { MyWallet } from 'src/app/pages/wallets/my-wallets/pages-wallets-my-wallet.model';

export const WALLET_RESP_MOCK = { name: 'Wallet 1', creationDate: '2022-10-22T09:47:52.595721658Z', id: 1 };
export const WALLET_PAYLOAD_MOCK = { name: 'Wallet 6' };
export const WALLET_INSTANCE_MOCK = new MyWallet(WALLET_RESP_MOCK);