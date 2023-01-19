import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomainsWalletsModule } from './wallets/domains.wallets.module';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DomainsTransactionsModule } from './transactions/domains.transactions.module';

@NgModule({
  imports: [
    CommonModule,
    DomainsWalletsModule,
    DomainsTransactionsModule,
    HttpClientModule,
    MatSnackBarModule,
  ],
})
export class DomainsModule { }
