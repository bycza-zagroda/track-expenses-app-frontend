import { getRandomNumber } from './common.utils.random';

describe('utils random', () => {
  describe('getRandomNumber', () => {
    it('should get random number', () => {
      expect(getRandomNumber(5, 10)).toBeLessThan(11);
      expect(getRandomNumber(5, 10)).toBeGreaterThan(4);
    });
  });
});
