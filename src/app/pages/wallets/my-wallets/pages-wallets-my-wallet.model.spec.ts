import { MyWallet } from './pages-wallets-my-wallet.model';

describe('MyWallet Class', () => {
  describe('toPayload', () => {
    const wallet = new MyWallet({ id: 999, creationDate: '2022-10-23T09:47:52.595721658Z', name: "wallet 5" });

    it('should return IWalletPayload', () => {
      const payload = wallet.toPayload();

      expect(payload.name).toEqual(wallet.name);
    });
  });

  describe('create', () => {
    const wallet = { name: "Wallet 6" };

    it('should return MyWallet for Create', () => {
      const payload = MyWallet.create(wallet);
      expect(payload.id).toEqual(null);
      expect(payload.name).toEqual(wallet.name);
    });
  });

  describe('create', () => {
    const wallet = { id: 999, name: "Wallet 6" };

    it('should return MyWallet for Update', () => {
      const payload = MyWallet.create(wallet);
      expect(payload.id).toEqual(wallet.id);
      expect(payload.name).toEqual(wallet.name);
    });
  });
});