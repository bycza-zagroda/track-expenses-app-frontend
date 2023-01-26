import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TServerEntityId } from 'src/app/common/http/common.http.types';
import { checkInputError } from 'src/app/common/utils/forms/common-utils-forms-form-utils';
import { WalletTransactionType } from 'src/app/domains/transactions/domains.transactions.constants';
import { WalletsDetailsTransaction } from '../pages-wallet-details-item.model';
import { IWalletTransactionModalFormType } from './pages-wallet-transaction.editor.types';

export const regexAmount = /^\d+(\.\d{1,2})?$/;

@Component({
  selector: 'app-transaction-editor',
  templateUrl: './pages-wallet-transaction-editor.component.html',
  styleUrls: [ './pages-wallet-transaction-editor.component.scss' ],
})
export class PagesWalletTransactionEditorComponent {
  public selectTransactionsTypes: Record<string, WalletTransactionType> = {
    'Income': WalletTransactionType.Incomes,
    'Expense': WalletTransactionType.Expenses,
  };

  public form!: FormGroup<IWalletTransactionModalFormType>;

  private transactionId: TServerEntityId | null = null;

  public constructor(
    private readonly dialogRef: MatDialogRef<PagesWalletTransactionEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WalletsDetailsTransaction,
  ) {
    this.transactionId = this.data.id;

    this.form = new FormGroup<IWalletTransactionModalFormType>({
      amount: new FormControl(this.data.amount === 0 ? null : this.data.amount, {
        validators: [
          Validators.required,
          Validators.pattern(regexAmount),
          this.amountBiggerThan0(),
        ],
        nonNullable: false,
      }),
      description: new FormControl(this.data.description),
      date: new FormControl(this.data.transactionDate, {
        validators: [
          Validators.required,
        ],
        nonNullable: false,
      }),
      type: new FormControl(this.data.type, {
        validators: [
          Validators.required,
        ],
        nonNullable: true,
      }),
    });
  }

  public get amountIsNotProvided(): boolean {
    return checkInputError(this.form, 'amount', 'required');
  }

  public get amountIs0(): boolean {
    return checkInputError(this.form, 'amount', 'amountIs0');
  }

  public get amountHasInvalidFormat(): boolean {
    return checkInputError(this.form, 'amount', 'pattern');
  }

  public get dateIsNotProvided(): boolean {
    return checkInputError(this.form, 'date', 'required');
  }

  public save(): void {
    if (this.form.invalid) {
      return;
    }

    this.dialogRef.close(WalletsDetailsTransaction.create({
      id: this.transactionId ?? undefined,
      amount: parseFloat(this.form.get('amount')!.value!.toString()),
      creationDate: this.form.get('date')!.value!.toString(),
      type: this.form.get('type')!.value!,
      description: this.form.get('description')!.value!,
    }));
  }

  public setTransactionType(value: WalletTransactionType): void {
    this.form.controls.type.setValue(value);
  }

  public cancel(): void {
    this.dialogRef.close(null);
  }

  private amountBiggerThan0(): ValidatorFn {
    return (control: AbstractControl) => {
      const value: number = parseFloat(control.value as string);

      if(value && value > 0) {
        return null;
      }

      return { amountIs0: true };
    };
  }
}
