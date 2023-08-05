import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ContainerComponent } from '../../../ui/container/container.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormFieldComponent } from '../../../common/forms/form-field/form-field.component';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { markAllControlsAsDirty } from '../../../common/forms/forms.utils';
import {
  EMAIL_REGEX_STRING,
  PASSWORD_REGEX_STRING,
} from '../../../domains/auth/auth.constants';
import { AuthService } from '../../../common/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'teaf-ng-sign-in',
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
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  public isSaving = false;

  public form = new FormGroup({
    email: new FormControl(
      { value: '', disabled: false },
      {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.pattern(EMAIL_REGEX_STRING),
        ],
      },
    ),
    password: new FormControl(
      { value: '', disabled: false },
      {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.pattern(PASSWORD_REGEX_STRING),
        ],
      },
    ),
    isRememberMe: new FormControl(
      { value: false, disabled: false },
      { nonNullable: true },
    ),
  });

  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  public logIn(): void {
    markAllControlsAsDirty([this.form]);

    if (this.form.invalid) {
      return;
    }

    this.isSaving = true;

    const formValue = this.form.value;

    // due to the eslint rule to disallow using "!" -> find better way to do this
    if (
      !formValue.email ||
      !formValue.password ||
      formValue.isRememberMe === undefined
    ) {
      return;
    }

    this.authService
      .signIn({
        email: formValue.email,
        password: formValue.password,
        isRememberMe: formValue.isRememberMe,
      })
      .subscribe({
        next: () => {
          this.isSaving = false;
          void this.router.navigate(['/wallets']);
        },
        error: () => {
          this.isSaving = false;
        },
      });
  }
}
