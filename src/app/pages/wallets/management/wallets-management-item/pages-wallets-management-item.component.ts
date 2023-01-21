import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WalletsManagementItem } from '../pages-wallets-wallets-management-item.model';

@Component({
  selector: 'app-my-wallet',
  templateUrl: './pages-wallets-management-item.component.html',
  styleUrls: [ './pages-wallets-management-item.component.scss' ],
})
export class PagesWalletsManagementItemComponent {
  @Input() public wallet!: WalletsManagementItem;

  @Output() public walletEdit = new EventEmitter<WalletsManagementItem>();

  @Output() public walletDelete = new EventEmitter<WalletsManagementItem>();

  @Output() public walletDetailsOpen = new EventEmitter<WalletsManagementItem>();

  public editWallet(): void {
    this.walletEdit.emit(this.wallet);
  }

  public deleteWallet(): void {
    this.walletDelete.emit(this.wallet);
  }

  public openWalletDetails(): void {
    this.walletDetailsOpen.emit(this.wallet);
  }
}
