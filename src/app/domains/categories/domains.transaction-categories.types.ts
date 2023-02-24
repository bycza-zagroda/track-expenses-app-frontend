import { TServerEntityId } from "src/app/common/http/common.http.types";
import { WalletTransactionType } from "../transactions/domains.transactions.constants";

export type CategorySelectionValue = WalletTransactionType | '';

export interface ITransactionCategoryApiResponse {
  id: TServerEntityId;
  name: string;
  type: WalletTransactionType;
}

export class TransactionCategory {
  public readonly id: TServerEntityId | null;
  public readonly name: string;
  public readonly type: WalletTransactionType;

  constructor(id: TServerEntityId | null, name: string, type: WalletTransactionType) {
    this.id = id;
    this.name = name;
    this.type = type;
  }
}