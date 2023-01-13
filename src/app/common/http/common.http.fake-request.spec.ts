import { fakeRequest } from './common.http.fake-request';

describe('fakeRequest', () => {
  it('should emit data', (done) => {
    fakeRequest(99).subscribe(val => {
      expect(val).toBe(99);

      done();
    });
  });
});
