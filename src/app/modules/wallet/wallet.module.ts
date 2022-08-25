import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletComponent } from './components/wallet/wallet.component';
import { WalletRoutingModule } from './wallet-routing.module';

@NgModule({
  declarations: [WalletComponent],
  imports: [CommonModule, WalletRoutingModule],
})
export class WalletModule {}
