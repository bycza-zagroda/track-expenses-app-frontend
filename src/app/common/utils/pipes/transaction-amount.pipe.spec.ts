import { TransactionAmountPipe } from './transaction-amount.pipe';

describe('TransactionAmountPipe', () => {
  it('create an instance', () => {
    const pipe = new TransactionAmountPipe();
    expect(pipe).toBeTruthy();
  });
});
