import { IWalletData, IWalletPayload, IWalletResponse } from './wallets.types';
import { faker } from '@faker-js/faker';
import { TServerEntityId } from '../../common/types';
import { DateUtils } from '../../common/dates/date-utils';

export class Wallet<IsNew extends boolean = false> {
  public readonly createdAt: Date;
  public readonly name: string;
  public readonly description: string | null;
  public readonly currency: string;
  public readonly id: IsNew extends true ? null : TServerEntityId
  public readonly balance: number;

  private constructor(data: IWalletData<IsNew>) {
    this.id = data.id;
    this.createdAt = data?.createdAt ? DateUtils.parseDate(data.createdAt) : new Date();
    this.name = data.name;
    this.description = faker.helpers.arrayElement([faker.lorem.sentence(), null]);
    this.currency = faker.finance.currencyCode();
    this.balance = Number(faker.finance.amount(-1000, 1000, 2));
  }

  public static create<IsNew extends boolean = true>(data: IWalletData<IsNew>): Wallet<IsNew> {
    return new Wallet(data);
  }

  public static fromResponse(response: IWalletResponse): Wallet<false> {
    return new Wallet({
      id: response.id,
      name: response.name,
      createdAt: response.creationDate,
    });
  }

  public copy(data: Partial<IWalletData>): Wallet<IsNew> {
    return new Wallet({
      id: data.id || this.id,
      createdAt: data.createdAt || this.createdAt,
      name: data.name || this.name,
    });
  }

  public toPayload(): IWalletPayload {
    return {
      name: this.name,
    };
  }
}
