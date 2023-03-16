import { FormControl } from "@angular/forms";
import { TransactionCategory } from "src/app/pages/categories/transaction-category.model";
import { TServerEntityId } from "../http/common.http.types";

export interface ITransactionCategoryDeletingModalData {
    headerText: string
    confirmationText: string,
    confirmBtnText?: string,
    denyBtnText?: string,
    categories: TransactionCategory[];
    // categoryId: TServerEntityId | null;

  }

export interface ITransactionCategoryDeletingModalFormType {
  category: FormControl<number  | null>;
}
  