import { Component, Inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { WalletTransactionType } from 'src/app/domains/transactions/domains.transactions.types';
import { WalletsDetailsTransaction } from '../pages-wallet-details-item.model';
import { IWalletTransactionModalFormType } from './pages-wallet-transaction.editor.types';

export type WalletSelectionValue = WalletTransactionType | '';

@Component({
  selector: 'app-transaction-editor',
  templateUrl: './pages-wallet-transaction-editor.component.html',
  styleUrls: [ './pages-wallet-transaction-editor.component.scss' ],
})
export class PagesWalletTransactionEditorComponent implements OnDestroy {

  public selectTransactionsTypes: Record<string, WalletTransactionType> = {
    'Incomes': WalletTransactionType.Incomes,
    'Expenses': WalletTransactionType.Expenses,
  };

  public transactionsTypeForm = new FormControl<WalletTransactionType>(WalletTransactionType.Incomes);

  private transactionTypeSub!: Subscription;

  public form!: FormGroup<IWalletTransactionModalFormType>;

  public constructor(
    private readonly dialogRef: MatDialogRef<PagesWalletTransactionEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WalletsDetailsTransaction,
  ) {
    this.form = new FormGroup<IWalletTransactionModalFormType>({
      amount: new FormControl(this.data.amount, {
        validators: [
          Validators.required,
          Validators.min(1),
        ],
        nonNullable: true,
      }),
      description: new FormControl(this.data.description),
      date: new FormControl(this.data.date, {
        nonNullable: true,
      }),
      type: new FormControl(this.data.type, {
        nonNullable: true,
      }),
    });

  }

  public checkInputError(inputName: string, errorType: string): boolean {
    return !!(this.form.get(inputName)?.invalid
      && this.form.get(inputName)?.touched
      && this.form.get(inputName)?.errors?.[errorType]
    );
  }

  public get amountIsNotProvided(): boolean {
    return this.checkInputError('amount', 'required');
  }

  public get amountIsZeroOrLess(): boolean {
    return this.checkInputError('amount', 'min');
  }

  public save(): void {
    if (this.form.invalid) {
      return;
    }

    this.dialogRef.close(this.form.value);
  }

  public setTransactionType(value: WalletTransactionType): void {
    this.form.controls.type.setValue(value);
  }

  public cancel(): void {
    this.dialogRef.close(null);
  }

  public ngOnDestroy(): void {
    this.transactionTypeSub.unsubscribe();
  }
}
