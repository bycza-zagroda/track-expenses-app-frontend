import { WalletTransactionType } from 'src/app/domains/transactions/domains.transactions.types';
import { TransactionAmountPipe } from './transaction-amount.pipe';

describe('TransactionAmountPipe', () => {
  let pipe: TransactionAmountPipe;

  beforeEach(() => {
    pipe = new TransactionAmountPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('adds minus to negative value', () => {
    const transformedValue: string = pipe.transform(30, WalletTransactionType.Expenses);

    expect(transformedValue).toBe('- 30');
  });

  it('adds plus to positive value', () => {
    const transformedValue: string = pipe.transform(20, WalletTransactionType.Incomes);

    expect(transformedValue).toBe('+ 20');
  });

  it('throw error for value = 0', () => {
    const transformedValue = pipe.transform(0);

    expect(transformedValue).toBe('0');
  });
});
