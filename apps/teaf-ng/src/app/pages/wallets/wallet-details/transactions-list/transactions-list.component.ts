import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Transaction } from '../../../../domains/transactions/transaction.model';
import { TableModule } from 'primeng/table';
import { DatePipe } from '../../../../common/pipes/date.pipe';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { TransactionEditorComponent } from './transaction-editor/transaction-editor.component';
import { TServerEntityId } from '../../../../common/types';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TransactionsGatewayService } from '../../../../domains/transactions/transactions-gateway.service';
import { Category } from '../../../../domains/categories/category.model';
import { NoResultsComponent } from '../../../../common/components/no-results/no-results.component';
import { TransactionType } from '../../../../domains/transactions/transaction.constants';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'teaf-ng-transactions-list',
  standalone: true,
  imports: [CommonModule, TableModule, DatePipe, ButtonModule, NoResultsComponent, ChipModule],
  templateUrl: './transactions-list.component.html',
  styleUrls: ['./transactions-list.component.scss'],
})
export class TransactionsListComponent {
  @Input() public transactions: Transaction[] = [];
  @Input() public walletId!: TServerEntityId;

  @Input() public set categories(categories: Category[]) {
    this.categoriesList = categories;

    this.categoriesMap = categories.reduce((acc, category) => {
      acc[category.id] = category;

      return acc;
    }, {} as Record<TServerEntityId, Category>);
  }

  @Output() public addTransaction = new EventEmitter<Transaction>();
  @Output() public removeTransaction = new EventEmitter<Transaction>();
  @Output() public updateTransaction = new EventEmitter<Transaction>();

  public currentlyDeletedTransactions: Record<TServerEntityId, boolean> = {};
  public transactionTypes = TransactionType;
  public categoriesMap: Record<number, Category> = {};

  private categoriesList: Category[] = [];

  public constructor(
    private readonly dialogService: DialogService,
    private readonly messageService: MessageService,
    private readonly confirmationService: ConfirmationService,
    private readonly gateway: TransactionsGatewayService,
  ) {}

  public onTransactionCreate(): void {
    const ref = this.dialogService.open(TransactionEditorComponent, {
      header: 'Create transaction',
      width: 'min(100%, 600px)',
      data: {
        categories: this.categoriesList,
        walletId: this.walletId,
      }
    });

    ref.onClose.subscribe({
      next: (transaction: Transaction | undefined) => {
        if (transaction) {
          this.addTransaction.emit(transaction);
        }
      }
    });
  }

  public onTransactionRemove($event: MouseEvent, transaction: Transaction): void {
    if ($event.target === null || this.currentlyDeletedTransactions[transaction.id]) {
      return;
    }

    this.confirmationService.confirm({
      target: $event.target,
      message: 'Are you sure you want to delete this transaction?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteTransaction(transaction);
      },
    });
  }

  public onTransactionEdit(transaction: Transaction): void {
    const ref = this.dialogService.open(TransactionEditorComponent, {
      header: 'Edit transaction',
      width: 'min(100%, 600px)',
      data: {
        transaction,
        categories: this.categoriesList,
        walletId: this.walletId,
      }
    });

    ref.onClose.subscribe({
      next: (transaction: Transaction | undefined) => {
        if (transaction) {
          this.updateTransaction.emit(transaction);
        }
      }
    });
  }

  private deleteTransaction(transaction: Transaction): void {
    this.currentlyDeletedTransactions[transaction.id] = true;

    this.gateway.deleteTransaction(transaction.id).subscribe({
      next: () => {
        this.removeTransaction.emit(transaction);

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Transaction deleted',
        });
      },
      error: () => {
        this.currentlyDeletedTransactions[transaction.id] = false;

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete transaction',
        });
      },
    });
  }
}
