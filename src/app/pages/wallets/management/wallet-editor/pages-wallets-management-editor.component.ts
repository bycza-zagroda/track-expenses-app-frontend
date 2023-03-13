import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IWalletModalFormType } from './pages-wallets-management-editor.types';
import { checkInputError } from 'src/app/common/utils/forms/common-utils-forms-form-utils';
import { WalletsManagementItem } from '../pages-wallets-wallets-management-item.model';

@Component({
  selector: 'app-wallet-form-modal',
  templateUrl: './pages-wallets-management-editor.component.html',
  styleUrls: [ './pages-wallets-management-editor.component.scss' ],
})
export class PagesWalletsManagementEditorComponent implements OnInit {
  public form!: FormGroup<IWalletModalFormType>;

  public constructor(
    private readonly dialogRef: MatDialogRef<PagesWalletsManagementEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: WalletsManagementItem,
  ) {}

  public get nameIsNotProvided(): boolean {
    return checkInputError(this.form, 'name', 'required');
  }

  public get nameHasMoreThan20Characters(): boolean {
    return checkInputError(this.form, 'name', 'maxlength');
  }

  public ngOnInit(): void {
    this.form = new FormGroup<IWalletModalFormType>({
      name: new FormControl(this.data.name, {
        validators: [
          Validators.required,
          Validators.maxLength(20),
        ],
        nonNullable: true,
      }),
    });
  }

  public save(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    if (this.data.id) {
      this.dialogRef.close(WalletsManagementItem.create({ id: this.data.id, name: this.form.controls.name.value }));
    } else {
      this.dialogRef.close(WalletsManagementItem.create({ name: this.form.controls.name.value }));
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }
}
