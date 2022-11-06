import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateOrUpdateWalletComponent } from 'src/app/common/components/modals/dialog-create-or-update-wallet/dialog-create-or-update-wallet.component';
import { MyWallet } from '../pages-wallets-my-wallet.model';

@Component({
  selector: 'app-my-wallet',
  templateUrl: './pages-wallets-my-wallets-my-wallet.component.html',
  styleUrls: ['./pages-wallets-my-wallets-my-wallet.component.scss']
})
export class PagesWalletsMyWalletsMyWalletComponent {
  @Input() public wallet!: MyWallet;

  constructor(
    public dialog: MatDialog,
  ) {}

  openEditWalletDialog() {
    const dialogRef = this.dialog.open(DialogCreateOrUpdateWalletComponent, {
        width: '350px',
        height: '300px',
        data: { title: 'Update Wallet', btn: "Update", inputData: this.wallet.name }
    });

    dialogRef.afterClosed().subscribe(result => {
        if(result) {
            // request?
        }
        console.log(result);

    });
  }
}