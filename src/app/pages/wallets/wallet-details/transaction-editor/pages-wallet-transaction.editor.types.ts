import { FormControl } from "@angular/forms";
import { WalletTransactionType } from "src/app/domains/wallets/domains.wallets.types";

export interface ITransactionModalData {
  amount: number;
  description?: string;
  date: Date;
  type: WalletTransactionType;
}

export interface IWalletTransactionModalFormType {
  amount: FormControl<number>;
  description?: FormControl<string | null>;
  date: FormControl<Date>;
  type: FormControl<WalletTransactionType>;
}