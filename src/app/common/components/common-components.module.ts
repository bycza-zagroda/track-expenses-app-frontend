import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsNavbarComponent } from './navbar/common-components-navbar.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationModalComponent } from '../confirmation-modal/confirmation-modal.component';
import { LoadingModalComponent } from '../loading-modal/loading-modal.component';
import { SystemMessageComponent } from './system-message/system-message.component';
import {
  TransactionTypeMatSelectComponent,
} from './mat-controls/transaction-type-mat-select/transaction-type-mat-select.component';

@NgModule({
  declarations: [
    CommonComponentsNavbarComponent,
    ConfirmationModalComponent,
    LoadingModalComponent,
    SystemMessageComponent,
    TransactionTypeMatSelectComponent,
  ],
  exports: [
    CommonComponentsNavbarComponent,
    SystemMessageComponent,
    TransactionTypeMatSelectComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CommonComponentsModule {}
