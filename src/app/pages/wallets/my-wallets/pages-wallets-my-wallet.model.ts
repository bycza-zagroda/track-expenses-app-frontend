import { IWalletApiResponse, IWalletPayload } from '../../../domains/wallets/domains.wallets.types';

export class MyWallet {
  public readonly id: number | null;
  public readonly createdAt: Date;
  public readonly name: string;

  public constructor(data: IWalletApiResponse) {
    this.id = data.id === 0 ? null : data.id;
    this.createdAt = new Date(data.creationDate);
    this.name = data.name;
  }

  public toPayload(): IWalletPayload {
    return { name: this.name }
  }

  public static toAddNewWallet(name: string, creationDate: string = '2022-10-23T09:47:52.595721658Z'): MyWallet {
    return new MyWallet({ id: 0, creationDate, name })
  }

  public static toUpdateWallet(id: number, name: string): MyWallet {
    return new MyWallet({ id, creationDate: '2022-10-23T09:47:52.595721658Z', name })
  }
}
