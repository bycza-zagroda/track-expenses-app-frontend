import { TServerDateTime } from 'src/app/common/date-and-time/common-date-and-time.types';
import { TServerEntityId } from 'src/app/common/http/common.http.types';
import { IWalletDetailsApiResponse, IWalletDetailsTransactionApiResponse } from 'src/app/domains/wallets/domains.wallets.types';

export class WalletDetailsItem {
  public readonly id: number | null;
  public readonly name: string;
  public readonly transactions: WalletsDetailsTransaction[];

  public constructor(data: IWalletDetailsApiResponse) {
    this.id = data.id === 0 ? null : data.id;
    this.name = data.name;
    this.transactions = data.transactions.map((item: IWalletDetailsTransactionApiResponse) => new WalletsDetailsTransaction(item));
  }

  //TOCHECK
  // przez to ze nie mozna overload contructora to musialem takie spagetti zrobic
  public static updateWalletDetailsItemName(wallet: WalletDetailsItem, newWalletName: string): WalletDetailsItem {
    return new WalletDetailsItem({
      id: wallet.id as TServerEntityId,
      name: newWalletName,
      creationDate: new Date().toString() as TServerDateTime,
      transactions: wallet.transactions.map( (item: WalletsDetailsTransaction) => {
        return {
          id: item.id as TServerEntityId,
          amount: item.amount,
          date: item.date.toString() as TServerDateTime,
          description: item.description,
        } as IWalletDetailsTransactionApiResponse;
      }),
    });
  }
}

export class WalletsDetailsTransaction {
  public readonly id: number | null;
  public readonly date: Date;
  public readonly description: string;
  public readonly amount: number;

  public constructor(data: IWalletDetailsTransactionApiResponse) {
    this.id = data.id === 0 ? null : data.id;
    this.date = new Date(data.date);
    this.description = data.description;
    this.amount = data.amount;
  }
}