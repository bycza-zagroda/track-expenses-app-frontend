import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TServerEntityId } from 'src/app/common/http/common.http.types';
import { checkInputError } from 'src/app/common/utils/forms/formUtils';
import { WalletTransactionType } from 'src/app/domains/transactions/domains.transactions.constants';
import { WalletsDetailsTransaction } from '../pages-wallet-details-item.model';
import { IWalletTransactionModalFormType } from './pages-wallet-transaction.editor.types';

export const regexAmount = /(^(\d{1,})$)|((^\d{1,})\.\d{1,2}$)/;

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
        ],
        nonNullable: false,
      }),
      description: new FormControl(this.data.description),
      date: new FormControl(this.data.date, {
        validators: [
          Validators.required,
        ],
        nonNullable: true,
      }),
      type: new FormControl(this.data.type, {
        validators: [
          Validators.required,
        ],
        nonNullable: false,
      }),
    });
  }

  public checkInputError(inputName: string, errorType: string): boolean {
    return checkInputError(this.form, inputName, errorType);
  }

  public get amountIsNotProvided(): boolean {
    return this.checkInputError('amount', 'required');
  }

  public get amountHasInvalidFormat(): boolean {
    return this.checkInputError('amount', 'pattern');
  }

  public save(): void {
    if (this.form.invalid) {
      return;
    }

    this.dialogRef.close(WalletsDetailsTransaction.create({
      id: this.transactionId ?? undefined,
      amount: this.form.get('amount')!.value ?? undefined,
      creationDate: this.form.get('date')!.value.toString(),
      type: this.form.get('type')!.value ?? undefined,
      description: this.form.get('description')!.value ?? undefined,
    }));
  }

  public setTransactionType(value: WalletTransactionType): void {
    this.form.controls.type.setValue(value);
  }

  public cancel(): void {
    this.dialogRef.close(null);
  }
}
