import { FormControl } from '@angular/forms';

export interface ITransactionCategoryDeletingModalData {
    headerText: string
    confirmationText: string,
    confirmBtnText?: string,
    denyBtnText?: string,
  }

export interface ITransactionCategoryDeletingModalFormType {
  category: FormControl<number  | null>;
}
  