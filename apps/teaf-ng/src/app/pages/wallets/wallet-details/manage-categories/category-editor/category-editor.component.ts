import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormFieldComponent } from '../../../../../common/forms/form-field/form-field.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsUtils } from '../../../../../common/forms/forms.utils';
import { map, Observable } from 'rxjs';
import { TransactionType } from '../../../../../domains/transactions/transaction.constants';
import { Category } from '../../../../../domains/categories/category.model';
import { CategoriesGatewayService } from '../../../../../domains/categories/categories-gateway.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'teaf-ng-category-editor',
  standalone: true,
  imports: [CommonModule, ButtonModule, FormFieldComponent, InputTextModule, ReactiveFormsModule, RadioButtonModule],
  templateUrl: './category-editor.component.html',
  styleUrls: ['./category-editor.component.scss'],
})
export class CategoryEditorComponent implements OnInit {
  public isSaving = false;

  public form = new FormGroup({
    name: new FormControl<string>({ value: '', disabled: false }, { nonNullable: true, validators: [Validators.required,  Validators.maxLength(20),] }),
    type: new FormControl<TransactionType>({ value: TransactionType.Income, disabled: false }, { nonNullable: true, validators: [Validators.required] }),
  });

  public transactionTypes: typeof TransactionType = TransactionType;

  private category: Category | undefined;

  public constructor(
    private readonly gateway: CategoriesGatewayService,
    private readonly dialogRef: DynamicDialogRef,
    private readonly messageService: MessageService,
    private readonly dialogConfig: DynamicDialogConfig<{ category?: Category, type?: TransactionType }>,
  ) {
  }

  public ngOnInit(): void {
    if (this.dialogConfig.data === undefined) {
      throw new Error('Data is not defined');
    }

    this.category = this.dialogConfig.data.category;

    if (this.category) {
      this.gateway.getCategoryById(this.category.id).subscribe({
        next: () => {
          // implement disabling type field if category is used in transactions
        },
      })

      this.form.patchValue({
        name: this.category.name || '',
        type: this.category.type,
      });
    } else if (this.dialogConfig.data?.type) {
      this.form.controls.type.setValue(this.dialogConfig.data.type);
    }
  }

  public save(): void {
    FormsUtils.markAllControlsAsDirty([this.form]);

    if (this.form.invalid) {
      return;
    }

    this.isSaving = true;

    const observable = this.category ? this.updateCategory() : this.createCategory();

    observable.subscribe({
      next: (category) => {
        this.isSaving = false;

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Category saved',
        });

        this.dialogRef.close(category);
      },
      error: () => {
        this.isSaving = false;

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to save category',
        });
      }
    });
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  private createCategory(): Observable<Category> {
    const category = Category.create({
      id: null,
      name: this.form.controls.name.value,
      type: this.form.controls.type.value,
    });

    return this.gateway.createCategory(category.toPayload()).pipe(
      map(resp => Category.fromResponse(resp)),
    );
  }

  private updateCategory(): Observable<Category> {
    if (this.category === undefined) {
      throw new Error('Category is not defined');
    }

    const category = this.category.copy({
      name: this.form.controls.name.value,
      type: this.form.controls.type.value,
    });

    return this.gateway.updateCategory(this.category.id, category.toPayload()).pipe(
      map(resp => Category.fromResponse(resp)),
    );
  }
}
