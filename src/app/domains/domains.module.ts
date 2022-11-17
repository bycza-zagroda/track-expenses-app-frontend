import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomainsWalletsModule } from './wallets/domains.wallets.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    DomainsWalletsModule,
    HttpClientModule,
  ]
})
export class DomainsModule { }
