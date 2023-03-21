import { transactionCategoriesObjectsMockFunc } from 'src/app/domains/categories/domains.transaction-categories.mocks';
import { sortAlphabeticallyByProp } from './common.util.sort.';

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
});
