import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  WalletSelectionValue,
} from 'src/app/common/components/mat-controls/transaction-type-mat-select/transaction-type-mat-select.component';
import { WalletTransactionType } from 'src/app/domains/wallets/domains.wallets.types';
import { WalletsDetailsTransaction } from '../pages-wallet-details-item.model';
import { IWalletTransactionModalFormType } from './pages-wallet-transaction.editor.types';

@Component({
  selector: 'app-transaction-editor',
  templateUrl: './pages-wallet-transaction-editor.component.html',
  styleUrls: [ './pages-wallet-transaction-editor.component.scss' ],
})
export class PagesWalletTransactionEditorComponent {
  public form!: FormGroup<IWalletTransactionModalFormType>;

  public constructor(
    private readonly dialogRef: MatDialogRef<PagesWalletTransactionEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Partial<WalletsDetailsTransaction>,
  ) {
    this.form = new FormGroup<IWalletTransactionModalFormType>({
      amount: new FormControl(this.data.amount ?? 100, {
        validators: [
          Validators.required,
          Validators.min(1),
        ],
        nonNullable: true,
      }),
      description: new FormControl(this.data.description ?? ''),
      date: new FormControl(this.data.date ?? new Date(), {
        validators: [
          Validators.min(1),
        ],
        nonNullable: true,
      }),
      type: new FormControl(this.data.type!, {
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

  public setTransactionType(value: WalletSelectionValue): void {
    this.form.controls.type.setValue(value as WalletTransactionType);
  }

  public cancel(): void {
    this.dialogRef.close(null);
  }
}
