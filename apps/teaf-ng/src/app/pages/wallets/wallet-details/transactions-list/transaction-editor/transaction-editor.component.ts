import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormFieldComponent } from '../../../../../common/forms/form-field/form-field.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Transaction } from '../../../../../domains/transactions/transaction.model';
import { TransactionsGatewayService } from '../../../../../domains/transactions/transactions-gateway.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsUtils } from '../../../../../common/forms/forms.utils';
import { map, Observable, startWith } from 'rxjs';
import { TransactionType } from '../../../../../domains/transactions/transaction.constants';
import { TServerEntityId } from '../../../../../common/types';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Category } from '../../../../../domains/categories/category.model';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'teaf-ng-transaction-editor',
  standalone: true,
  imports: [CommonModule, ButtonModule, FormFieldComponent, InputTextModule, ReactiveFormsModule, InputNumberModule, RadioButtonModule, DropdownModule, CalendarModule],
  templateUrl: './transaction-editor.component.html',
  styleUrls: ['./transaction-editor.component.scss'],
})
export class TransactionEditorComponent implements OnInit {
  public isSaving = false;
  public transactionTypes = TransactionType;
  public visibleCategories: (Category<true> | Category)[] = [];

  public form = new FormGroup({
    amount: new FormControl(0, {
      validators: [
        Validators.required,
      ],
      nonNullable: true,
    }),
    description: new FormControl<string | null>(null),
    date: new FormControl(new Date(), {
      validators: [
        Validators.required,
      ],
      nonNullable: true,
    }),
    type: new FormControl(TransactionType.Income, {
      validators: [
        Validators.required,
      ],
      nonNullable: true,
    }),
    category: new FormControl<TServerEntityId | null>(null, {
      nonNullable: false,
    }),
  });

  private transaction: Transaction | undefined;
  private walletId!: TServerEntityId;
  private categories: Category[] = [];

  public constructor(
    private readonly gateway: TransactionsGatewayService,
    private readonly dialogRef: DynamicDialogRef,
    private readonly messageService: MessageService,
    private readonly dialogConfig: DynamicDialogConfig<{ categories: Category[], walletId: TServerEntityId, transaction?: Transaction }>,
  ) {
  }

  public ngOnInit(): void {
    if (this.dialogConfig.data === undefined) {
      throw new Error('Data is not defined');
    }

    this.transaction = this.dialogConfig.data.transaction;
    this.categories = this.dialogConfig.data.categories;
    this.walletId = this.dialogConfig.data.walletId;

    this.buildVisibleCategories(this.transaction?.type || TransactionType.Income);

    if (this.transaction) {
      this.form.patchValue({
        description: this.transaction.description || '',
        type: this.transaction.type,
        amount: this.transaction.amount,
        category: this.transaction.categoryId,
        date: this.transaction.date,
      });
    }

    this.form.controls.type.valueChanges.pipe(startWith(TransactionType.Income)).subscribe((type: TransactionType) => {
      this.buildVisibleCategories(type);
    });
  }

  public save(): void {
    FormsUtils.markAllControlsAsDirty([this.form]);

    if (this.form.invalid) {
      return;
    }

    this.isSaving = true;

    const observable = this.transaction ? this.updateTransaction() : this.createTransaction();

    observable.subscribe({
      next: (transaction) => {
        this.isSaving = false;

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Transaction saved',
        });

        this.dialogRef.close(transaction);
      },
      error: () => {
        this.isSaving = false;

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to save transaction',
        });
      }
    });
  }

  public cancel(): void {
    this.dialogRef.close();
  }

  private createTransaction(): Observable<Transaction> {
    const transaction = Transaction.create({
      id: null,
      description: this.form.controls.description.value,
      type: this.form.controls.type.value,
      amount: this.form.controls.amount.value,
      walletId: this.walletId,
      categoryId: this.form.controls.category.value,
      date: this.form.controls.date.value,
    });

    return this.gateway.createTransaction(transaction.toPayload()).pipe(
      map(resp => Transaction.fromResponse(resp)),
    );
  }

  private buildVisibleCategories(categoryType: TransactionType): void {
    this.visibleCategories = [
      Category.create({ id: null, name: 'No category', type: TransactionType.Income }),
      ...this.categories.filter(category => category.type === categoryType),
    ];
  }

  private updateTransaction(): Observable<Transaction> {
    if (this.transaction === undefined) {
      throw new Error('Transaction is not defined');
    }

    const transaction = this.transaction.copy({
      description: this.form.controls.description.value,
      type: this.form.controls.type.value,
      amount: this.form.controls.amount.value,
      categoryId: this.form.controls.category.value,
      date: this.form.controls.date.value,
    });

    return this.gateway.updateTransaction(this.transaction.id, transaction.toPayload()).pipe(
      map(resp => Transaction.fromResponse(resp)),
    );
  }
}
