import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA }  from '@angular/material/dialog';
import { IWalletModalData } from 'src/app/domains/wallets/domains.wallets.types';

@Component({
  selector: 'app-wallet-form-modal',
  templateUrl: './wallet-form-modal.component.html',
  styleUrls: ['./wallet-form-modal.component.scss']
})
export class WalletFormModalComponent {

    constructor(
        public dialogRef: MatDialogRef<WalletFormModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: IWalletModalData,
    ) { }

    public save(data: any): void {
        this.dialogRef.close(data);
    }

    public cancel(): void {
        this.dialogRef.close(null);
    }

}
