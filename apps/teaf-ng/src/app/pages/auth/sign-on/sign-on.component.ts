import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ContainerComponent } from '../../../ui/container/container.component';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { FormFieldComponent } from '../../../common/forms/form-field/form-field.component';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { markAllControlsAsDirty } from '../../../common/forms/forms.utils';
import { AuthService } from '../../../common/auth/auth.service';
import { Router } from '@angular/router';
import { EMAIL_REGEX_STRING, PASSWORD_REGEX_STRING } from '../../../domains/auth/auth.constants';

const passwordConfirmationValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.parent?.get('password')?.value as string;
  const passwordConfirmation = control.value as string;

  return password === passwordConfirmation ? null : { passwordConfirmation: true };
};

@Component({
  selector: 'teaf-ng-sign-on',
  standalone: true,
  imports: [
    CommonModule,
    ContainerComponent,
    FormFieldComponent,
    InputTextModule,
    ReactiveFormsModule,
    CheckboxModule,
    ButtonModule,
    NgOptimizedImage,
  ],
  templateUrl: './sign-on.component.html',
  styleUrls: [ './sign-on.component.scss' ],
})
export class SignOnComponent {
  public isSaving = false;

  public form = new FormGroup({
    email: new FormControl(
      { value: '', disabled: false },
      { nonNullable: true, validators: [ Validators.required, Validators.pattern(EMAIL_REGEX_STRING) ] },
    ),
    username: new FormControl(
      { value: '', disabled: false },
      { nonNullable: true, validators: [ Validators.required ] },
    ),
    password: new FormControl(
      { value: '', disabled: false },
      { nonNullable: true, validators: [ Validators.required, Validators.pattern(PASSWORD_REGEX_STRING) ] },
    ),
    passwordConfirmation: new FormControl(
      { value: '', disabled: false },
      { nonNullable: true, validators: [ Validators.required, passwordConfirmationValidator ] },
    ),
  });

  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  public register(): void {
    markAllControlsAsDirty([ this.form ]);

    if (this.form.invalid) {
      return;
    }

    this.isSaving = true;

    const formValue = this.form.value;

    // due to the eslint rule to disallow using "!" -> find better way to do this
    if (!formValue.email || !formValue.password || !formValue.username) {
      return;
    }

    this.authService.signOn({
      email: formValue.email,
      username: formValue.username,
      password: formValue.password ,
    }).subscribe({
      next: () => {
        this.isSaving = false;
        void this.router.navigate([ '/auth/sign-in' ]);
      },
      error: () => {
        this.isSaving = false;
      },
    });
  }
}
