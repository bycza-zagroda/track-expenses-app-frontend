import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WalletsManagementItem } from '../pages-wallets-wallets-management-item.model';
import { IWalletModalFormType } from './pages-wallets-management-editor.types';

@Component({
  selector: 'app-wallet-form-modal',
  templateUrl: './pages-wallets-management-editor.component.html',
  styleUrls: ['./pages-wallets-management-editor.component.scss'],
})
export class PagesWalletsManagementEditorComponent {
  public form!: FormGroup<IWalletModalFormType>;

  public constructor(
    private readonly dialogRef: MatDialogRef<PagesWalletsManagementEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WalletsManagementItem | undefined,
  ) {
    this.form = new FormGroup<IWalletModalFormType>({
      name: new FormControl(this.data?.name ?? '', {
        validators: [
          Validators.required,
          Validators.maxLength(20),
        ],
        nonNullable: true,
      }),
    });
  }

  public get nameIsNotProvided(): boolean {
    return this.checkInputError('name', 'required');
  }

  public get nameHasMoreThan20Characters(): boolean {
    return this.checkInputError('name', 'maxlength');
  }

  public checkInputError(inputName: string, errorType: string): boolean {
    return !!(this.form.get(inputName)?.invalid && this.form.get(inputName)?.touched && this.form.get(inputName)?.errors?.[errorType]);
  }

  public save(): void {
    if (this.form.invalid) {
      return;
    }

    this.dialogRef.close(this.form.value);
  }

  public cancel(): void {
    this.dialogRef.close(null);
  }
}
