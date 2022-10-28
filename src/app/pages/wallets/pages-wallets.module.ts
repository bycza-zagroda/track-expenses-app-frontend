import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesWalletsMyWalletsComponent } from './my-wallets/pages-wallets-my-wallets.component';
import { RouterModule, Routes } from '@angular/router';
import { DomainsWalletsModule } from '../../domains/wallets/domains.wallets.module';
import { PagesWalletsMyWalletsMyWalletComponent } from './my-wallets/my-wallet/pages-wallets-my-wallets-my-wallet.component';
import { MaterialModule } from '../../material.module';
import { PagesWalletsMyWalletsAddNewWalletComponent } from './my-wallets/add-new-wallet/pages-wallets-my-wallets-add-new-wallet.component';

const routes: Routes = [
  {
    path: 'my',
    component: PagesWalletsMyWalletsComponent,
  }
];

@NgModule({
  declarations: [
    PagesWalletsMyWalletsComponent,
    PagesWalletsMyWalletsMyWalletComponent,
    PagesWalletsMyWalletsAddNewWalletComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    DomainsWalletsModule,
    MaterialModule,
  ],
  exports: [
    RouterModule,
  ]
})
export class PagesWalletsModule {}
