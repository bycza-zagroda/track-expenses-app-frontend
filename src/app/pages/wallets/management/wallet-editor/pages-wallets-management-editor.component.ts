import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA }  from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
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
            name: new FormControl(this.data?.name ?? '', { nonNullable: true }),
        });
    }

    public save(): void {
        this.dialogRef.close(this.form.value);
    }

    public cancel(): void {
        this.dialogRef.close(null);
    }
}
