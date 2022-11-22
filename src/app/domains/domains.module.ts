import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomainsWalletsModule } from './wallets/domains.wallets.module';

@NgModule({
  imports: [
    CommonModule,
    DomainsWalletsModule,
  ],
})
export class DomainsModule { }
