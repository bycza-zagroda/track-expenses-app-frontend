import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogCreateOrUpdateWalletComponent } from 'src/app/common/components/modals/dialog-create-or-update-wallet/dialog-create-or-update-wallet.component';

@Component({
  selector: 'app-add-new-wallet',
  templateUrl: './pages-wallets-my-wallets-add-new-wallet.component.html',
  styleUrls: ['./pages-wallets-my-wallets-add-new-wallet.component.scss']
})
export class PagesWalletsMyWalletsAddNewWalletComponent {

    @Output('getWalletName') getWalletName = new EventEmitter<string>();

    newWalletName: string = "";

    constructor(
        public dialog: MatDialog,
    ) {}

    openAddNewWalletDialog() {
        const dialogRef = this.dialog.open(DialogCreateOrUpdateWalletComponent, {
            width: '350px',
            height: '300px',
            data: { title: 'Create New Wallet', btn: "Create", inputData: this.newWalletName }
        });

        dialogRef.afterClosed().subscribe(result => {
            if(result) {
                this.newWalletName = result;
                this.getWalletName.emit(this.newWalletName);
            }
        });
    }
}
