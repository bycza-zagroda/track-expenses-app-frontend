import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MyWallet } from '../pages-wallets-my-wallet.model';

@Component({
  selector: 'app-my-wallet',
  templateUrl: './pages-wallets-my-wallets-my-wallet.component.html',
  styleUrls: ['./pages-wallets-my-wallets-my-wallet.component.scss']
})
export class PagesWalletsMyWalletsMyWalletComponent {
  @Input() public wallet!: MyWallet;

  @Output('walletEdit') public walletEdit = new EventEmitter<MyWallet>();

  public openEditWalletModal(): void {
    this.walletEdit.emit(this.wallet);
  }
}