import { WalletTransactionType } from 'src/app/domains/transactions/domains.transactions.constants';
import { TransactionAmountPipe } from './transaction-amount.pipe';

describe('TransactionAmountPipe', () => {
  let pipe: TransactionAmountPipe;
  let amount: number;

  beforeEach(() => {
    pipe = new TransactionAmountPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('adds minus to negative value', () => {
    amount = 30;
    const transformedValue: string = pipe.transform(amount, WalletTransactionType.Expense);

    expect(transformedValue).toBe(`- ${amount.toFixed(2)}`);
  });

  it('adds plus to positive value', () => {
    amount = 20;
    const transformedValue: string = pipe.transform(amount, WalletTransactionType.Income);

    expect(transformedValue).toBe(`+ ${amount.toFixed(2)}`);
  });

  it('throw error for value = 0', () => {
    amount = 0;
    const transformedValue = pipe.transform(amount);

    expect(transformedValue).toBe(amount.toFixed(2));
  });
});
