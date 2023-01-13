import { WALLET_PAYLOAD_MOCK, WALLET_RESP_MOCK } from 'src/app/domains/wallets/domains.wallets.mocks';
import { IWalletApiResponse, IWalletPayload } from 'src/app/domains/wallets/domains.wallets.types';
import { WalletsManagementItem } from '../pages-wallets-wallets-management-item.model';

describe('WalletsManagementItem', () => {
  describe('toPayload', () => {
    let wallet: WalletsManagementItem;

    beforeEach(() => {
      wallet = new WalletsManagementItem(WALLET_RESP_MOCK);
    });

    it('should return IWalletPayload', () => {
      const payload = wallet.toPayload();

      expect(payload.name).toEqual(wallet.name);
    });
  });

  describe('create', () => {
    let walletPayload: IWalletPayload;
    let wallet: Partial<IWalletApiResponse>;

    it('should create wallet with id = null when data with no id is provided', () => {
      walletPayload = WALLET_PAYLOAD_MOCK;

      const payload = WalletsManagementItem.create(walletPayload);

      expect(payload.id).toEqual(null);
      expect(payload.name).toEqual(walletPayload.name);
    });

    it('should create wallet with number id when data with id is provided', () => {
      walletPayload = WALLET_PAYLOAD_MOCK;

      const payload = WalletsManagementItem.create({ ...walletPayload, id: 5 });

      expect(payload.id).toEqual(5);
      expect(payload.name).toEqual(walletPayload.name);
    });

    it('should update wallet with data provided', () => {
      wallet = { id: 999, name: 'Wallet 6' };

      const payload = WalletsManagementItem.create(wallet);

      expect(payload.id).toEqual(wallet.id!);
      expect(payload.name).toEqual(wallet.name!);
    });
  });
});
