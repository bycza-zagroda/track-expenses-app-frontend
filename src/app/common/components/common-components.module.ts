import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsNavbarComponent } from './navbar/common-components-navbar.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SystemMessageComponent } from './errors/system-message/system-message.component';

@NgModule({
  declarations: [
    CommonComponentsNavbarComponent,
    SystemMessageComponent,
  ],
  exports: [
    CommonComponentsNavbarComponent,
    SystemMessageComponent,
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
