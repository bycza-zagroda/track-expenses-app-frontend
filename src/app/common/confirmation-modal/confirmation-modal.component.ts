import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IConfirmationModalData } from './confirmation-modal.types';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: [ './confirmation-modal.component.scss' ],
})
export class ConfirmationModalComponent {
  public constructor(@Inject(MAT_DIALOG_DATA) public data: IConfirmationModalData) {
  }
}
