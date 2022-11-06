import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsNavbarComponent } from './navbar/common-components-navbar.component';
import { RouterModule } from '@angular/router';
import { DialogCreateOrUpdateWalletComponent } from './modals/dialog-create-or-update-wallet/dialog-create-or-update-wallet.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CommonComponentsNavbarComponent, DialogCreateOrUpdateWalletComponent],
  exports: [CommonComponentsNavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CommonComponentsModule { }
