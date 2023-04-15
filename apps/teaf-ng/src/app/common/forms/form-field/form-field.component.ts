import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'teaf-ng-form-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FormFieldComponent {
  @Input() public control: AbstractControl | undefined;
  @Input() public validationMessages: Record<string, string> = {};

  public get validations(): string[] {
    if (!this.control?.dirty) {
      return [];
    }

    return Object.entries(this.validationMessages)
      .filter(([key]) => this.control?.hasError(key))
      .map((item) => item[1]);
  }
}
