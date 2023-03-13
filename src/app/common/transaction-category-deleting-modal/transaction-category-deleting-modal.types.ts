import { TransactionCategory } from "src/app/pages/categories/transaction-category.model"

export interface ITransactionCategoryDeletingModalData {
    headerText: string
    confirmationText: string,
    confirmBtnText?: string,
    denyBtnText?: string,
    transactionCategories: TransactionCategory[];
  }
  