import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA }  from '@angular/material/dialog';
import { MyWallet } from '../../pages-wallets-my-wallet.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-wallet-form-modal',
  templateUrl: './wallet-form-modal.component.html',
  styleUrls: ['./wallet-form-modal.component.scss']
})
export class WalletFormModalComponent {
    public form!: FormGroup;

    constructor(
        private readonly dialogRef: MatDialogRef<WalletFormModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: MyWallet | undefined,
        private formBuilder: FormBuilder,
    ) {
        this.form = this.formBuilder.group({
            name: [this.data?.name || '']
        });
    }

    public save(): void {
        this.dialogRef.close(this.form.value);
    }

    public cancel(): void {
        this.dialogRef.close(null);
    }
}