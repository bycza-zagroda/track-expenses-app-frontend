import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-create-or-update-wallet',
  templateUrl: './dialog-create-or-update-wallet.component.html',
  styleUrls: ['./dialog-create-or-update-wallet.component.scss']
})
export class DialogCreateOrUpdateWalletComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<DialogCreateOrUpdateWalletComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { title: string, btn: string, inputData: string}
    ) { }

    ngOnInit(): void {
    }

    cancel(data: any): void {
        this.dialogRef.close(data);
    }

}
