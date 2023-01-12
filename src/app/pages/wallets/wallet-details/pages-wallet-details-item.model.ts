import { IWalletTransactionApiResponse, IWalletTransactionItemData, WalletTransactionType } from 'src/app/domains/wallets/domains.wallets.types';
import { ITransactionModalData } from './transaction-editor/pages-wallet-transaction.editor.types';

export class WalletsDetailsTransaction {
  public readonly id: number | null;
  public readonly date: Date;
  public readonly description: string | null;
  public readonly type: WalletTransactionType;
  public readonly amount: number;

  public constructor(data: IWalletTransactionItemData) {
    this.id = data.id;
    this.date = new Date(data.creationDate);
    this.description = data.description ?? null;
    this.type = data.type;
    this.amount = data.amount;
  }

  public static create(data: Partial<IWalletTransactionApiResponse>) {
    return new WalletsDetailsTransaction({
      id: data.id ?? null,
      amount: data.amount ?? 0,
      creationDate: data.creationDate ?? '',
      description: data.creationDate ?? '',
      type: data.type ?? WalletTransactionType.Incomes,
    })
  }

  public static createFromModalEditorData(id: number, data: ITransactionModalData) {
    return new WalletsDetailsTransaction({
      id: id ?? null,
      amount: data.amount,
      creationDate: data.date.toString() ?? '',
      description: data.description ?? '',
      type: data.type,
    })
  }
}