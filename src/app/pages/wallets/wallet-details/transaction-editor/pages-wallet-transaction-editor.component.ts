import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TServerEntityId } from 'src/app/common/http/common.http.types';
import { checkInputError } from 'src/app/common/utils/forms/common-utils-forms-form-utils';
import { WalletTransactionType } from 'src/app/domains/transactions/domains.transactions.constants';
import { WalletsDetailsTransaction } from '../pages-wallet-details-item.model';
import { IWalletTransactionModalFormType } from './pages-wallet-transaction.editor.types';

export const regexAmount = /^\d+(\.\d{1,2})?$/;
export const regexDate = /\d{2}\/\d{2}\/\d{4}/;

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
          this.datePattern(),
          //Validators.pattern(regexDate),
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

  public datePattern(): ValidatorFn {

    return (control: AbstractControl) => {debugger
      const x: Date = control.value as Date;

      if(x == null) {

        const checkPattern = control.value.match(regexDate);

        if(!checkPattern) {
          return { datePatternError: true };
        }

        const dateString = (control.value as string).split("/");
        const newDate = new Date(parseInt(dateString[2]), parseInt(dateString[1]), parseInt(dateString[0]));

        return { datePatternError: true };
      }
      return null;
  }

  }

  public checkInputError(inputName: string, errorType: string): boolean {
    return checkInputError(this.form, inputName, errorType);
  }

  public get datePattern2(): boolean {
    const a2 = this.form.get('date');
    const a3 = this.form.get('date')?.errors;

    const a = this.checkInputError('date', 'datePatternError');
    return a;
  }

  public get amountIsNotProvided(): boolean {
    return this.checkInputError('amount', 'required');
  }

  public get amountHasInvalidFormat(): boolean {
    return this.checkInputError('amount', 'pattern');
  }

  public get dateIsNotProvided(): boolean {
    return this.checkInputError('date', 'required');
  }

  public get dateHasInvalidFormat(): boolean {
    return this.checkInputError('date', 'pattern');
  }

  public save(): void {
    if (this.form.invalid) {
      return;
    }

    this.dialogRef.close(WalletsDetailsTransaction.create({
      id: this.transactionId ?? undefined,
      amount: this.form.get('amount')!.value ?? undefined,
      creationDate: this.form.get('date')!.value!.toString(),
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
