import { transactionCategoriesObjectsMockFunc } from 'src/app/domains/categories/domains.transaction-categories.mocks';
import { WALLET_TRANSACTIONS_OBJECTS_MOCK } from 'src/app/domains/transactions/domains.transactions.mocks';
import { WalletTransaction } from 'src/app/pages/wallets/wallet-details/pages-wallet-details-item.model';
import { sortAlphabeticallyByProp, sortByDate } from './common.util.sort.';

describe('utils sorts', () => {
  describe('sortAlphabeticallyByProp', () => {
    it('should return sorted array', () => {
      const tab = transactionCategoriesObjectsMockFunc();

      const sortedTab = sortAlphabeticallyByProp(transactionCategoriesObjectsMockFunc(), 'name');

      expect(sortedTab[0].name).toBe(tab[1].name);
      expect(sortedTab[1].name).toBe(tab[2].name);
      expect(sortedTab[2].name).toBe(tab[0].name);
    });
  });

  describe('sortByDate', () => {
    it('should return sorted array', () => {
      const tab: WalletTransaction[] = WALLET_TRANSACTIONS_OBJECTS_MOCK(1);

      const sortedTab = sortByDate(WALLET_TRANSACTIONS_OBJECTS_MOCK(1), 'date');

      expect(sortedTab[0].date).toEqual(tab[0].date);
      expect(sortedTab[1].date).toEqual(tab[2].date);
      expect(sortedTab[2].date).toEqual(tab[1].date);
    });

    it('should return sorted array descending', () => {
      const tab: WalletTransaction[] = WALLET_TRANSACTIONS_OBJECTS_MOCK(1);

      const sortedTab = sortByDate(WALLET_TRANSACTIONS_OBJECTS_MOCK(1), 'date', true);

      expect(sortedTab[0].date).toEqual(tab[1].date);
      expect(sortedTab[1].date).toEqual(tab[2].date);
      expect(sortedTab[2].date).toEqual(tab[0].date);
    });
  });
});
