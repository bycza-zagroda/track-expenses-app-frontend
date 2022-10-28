import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonComponentsNavbarComponent } from './navbar/common-components-navbar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CommonComponentsNavbarComponent],
  exports: [CommonComponentsNavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
})
export class CommonComponentsModule { }
