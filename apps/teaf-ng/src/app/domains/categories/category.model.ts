import {
  ICategoryData,
  ICategoryPayload,
  ICategoryResponse,
} from './categories.types';
import { TransactionType } from '../transactions/transaction.constants';
import { TServerEntityId } from '../../common/types';

export class Category<IsNew extends boolean = false> {
  public readonly name: string;
  public readonly type: TransactionType;
  public readonly id: IsNew extends true ? null : TServerEntityId;

  private constructor(data: ICategoryData<IsNew>) {
    this.name = data.name;
    this.type = data.type;
    this.id = data.id;
  }

  public static create<IsNew extends boolean = true>(
    data: ICategoryData<IsNew>,
  ): Category<IsNew> {
    return new Category(data);
  }

  public static fromResponse(response: ICategoryResponse): Category {
    return new Category({
      id: response.id,
      name: response.name,
      type: response.type,
    });
  }

  public copy(data: Partial<ICategoryData<IsNew>>): Category<IsNew> {
    return new Category({
      id: data.id ?? this.id,
      name: data.name ?? this.name,
      type: data.type ?? this.type,
    });
  }

  public toPayload(): ICategoryPayload {
    return {
      name: this.name,
      type: this.type,
    };
  }
}
