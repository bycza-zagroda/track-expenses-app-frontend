import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA }  from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { MyWallet } from '../pages-wallets-my-wallet.model';
import { IWalletModalFormType } from './pages-wallets-my-wallets-wallet-form-modal';

@Component({
  selector: 'app-wallet-form-modal',
  templateUrl: './wallet-form-modal.component.html',
  styleUrls: ['./wallet-form-modal.component.scss'],
})
export class WalletFormModalComponent {
    public form!: FormGroup<IWalletModalFormType>;

    public constructor(
        private readonly dialogRef: MatDialogRef<WalletFormModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: MyWallet | undefined,
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
