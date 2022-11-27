import { WALLET_PAYLOAD_MOCK, WALLET_RESP_MOCK } from 'src/app/domains/wallets/domains.wallets.mocks';
import { IWalletApiResponse, IWalletPayload } from 'src/app/domains/wallets/domains.wallets.types';
import { MyWallet } from './pages-wallets-my-wallet.model';

describe('MyWallet', () => {

  describe('toPayload', () => {
    let wallet: MyWallet;

    beforeEach(() => {
      wallet = new MyWallet(WALLET_RESP_MOCK);
    });

    it('should return IWalletPayload', () => {
      const payload = wallet.toPayload();

      expect(payload.name).toEqual(wallet.name);
    });
  });

  describe('create', () => {
    let walletPayload: IWalletPayload;
    let wallet: Partial<IWalletApiResponse>;

    it('should create wallet when the data is provided', () => {
      walletPayload = WALLET_PAYLOAD_MOCK;

      const payload = MyWallet.create(walletPayload);

      expect(payload.id).toEqual(null);
      expect(payload.name).toEqual(walletPayload.name);
    });

    it('should update wallet with data provided', () => {
        wallet = { id: 999, name: 'Wallet 6' };

        const payload = MyWallet.create(wallet);

        expect(payload.id).toEqual(wallet.id!);
        expect(payload.name).toEqual(wallet.name!);
    });
  });

});