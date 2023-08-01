import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectButtonModule } from 'primeng/selectbutton';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TransactionType } from '../../../../domains/transactions/transaction.constants';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { Category } from '../../../../domains/categories/category.model';
import { FilterByTextPipe } from '../../../../common/pipes/filter-by.pipe';
import { DialogService } from 'primeng/dynamicdialog';
import { CategoryEditorComponent } from './category-editor/category-editor.component';
import { CategoriesGatewayService } from '../../../../domains/categories/categories-gateway.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TServerEntityId } from '../../../../common/types';
import { SortByTextPipe } from '../../../../common/pipes/sort-by-text.pipe';
import { NoResultsComponent } from '../../../../common/components/no-results/no-results.component';

interface ICategoryTypeOption {
  label: string;
  value: TransactionType;
}

@Component({
  selector: 'teaf-ng-manage-categories',
  standalone: true,
  imports: [
    CommonModule,
    SelectButtonModule,
    ReactiveFormsModule,
    ButtonModule,
    ChipModule,
    FilterByTextPipe,
    SortByTextPipe,
    NoResultsComponent,
  ],
  templateUrl: './manage-categories.component.html',
  styleUrls: [ './manage-categories.component.scss' ],
})
export class ManageCategoriesComponent {
  @Input() public categories: Category[] = [];

  @Output() public addCategory = new EventEmitter<Category>();
  @Output() public removeCategory = new EventEmitter<Category>();
  @Output() public updateCategory = new EventEmitter<Category>();

  public categoryTypesControl = new FormControl<TransactionType>({ value: TransactionType.Income, disabled: false }, { nonNullable: true });
  public transactionTypes = TransactionType;

  public categoryTypesOptions: ICategoryTypeOption[] = [
    { label: 'Incomes', value: TransactionType.Income },
    { label: 'Expenses', value: TransactionType.Expense },
  ];

  public currentlyDeletedCategories: Record<TServerEntityId, boolean> = {};
  public currentlyEditedCategories: Record<TServerEntityId, boolean> = {};

  public get hasNoIncomeCategories(): boolean {
    return this.categories.filter((category: Category) => category.type === TransactionType.Income).length === 0;
  }

  public get hasNoExpenseCategories(): boolean {
    return this.categories.filter((category: Category) => category.type === TransactionType.Expense).length === 0;
  }

  public constructor(
    private readonly dialogService: DialogService,
    private readonly gateway: CategoriesGatewayService,
    private readonly messageService: MessageService,
    private readonly confirmationService: ConfirmationService,
  ) {}

  public onCategoryRemove($event: MouseEvent, category: Category): void {
    if ($event.target === null || this.currentlyDeletedCategories[category.id]) {
      return;
    }

    this.confirmationService.confirm({
      target: $event.target,
      message: `Are you sure you want to delete ${category.name} category? All related transactions will be unassigned`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteCategory(category);
      },
    });
  }

  public onCategoryCreate(): void {
    const ref = this.dialogService.open(CategoryEditorComponent, {
      header: 'Create category',
      width: 'min(100%, 600px)',
      data: {
        type: this.categoryTypesControl.value,
      },
    });

    ref.onClose.subscribe({
      next: (category: Category | undefined) => {
        if (category) {
          this.addCategory.emit(category);
        }
      },
    });
  }

  public onCategoryEdit(category: Category): void {
    this.currentlyEditedCategories[category.id] = true;

    this.gateway.getCategoryById(category.id).subscribe({
      next: (resp) => {
        const isCategoryUsed = resp.financialTransactionsCounter > 0;

        const ref = this.dialogService.open(CategoryEditorComponent, {
          header: 'Edit category',
          width: 'min(100%, 600px)',
          data: {
            category,
            isCategoryUsed,
            type: this.categoryTypesControl.value,
          },
        });

        ref.onClose.subscribe({
          next: (cat: Category | undefined) => {
            this.currentlyEditedCategories[category.id] = false;

            if (cat) {
              this.updateCategory.emit(cat);
            }
          },
        });
      },
      error: () => {
        this.currentlyEditedCategories[category.id] = false;

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to open category editor',
        });
      },
    });
  }

  private deleteCategory(category: Category): void {
    this.currentlyDeletedCategories[category.id] = true;

    this.gateway.deleteCategory(category.id).subscribe({
      next: () => {
        this.removeCategory.emit(category);

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Category deleted',
        });
      },
      error: () => {
        this.currentlyDeletedCategories[category.id] = false;

        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete category',
        });
      },
    });
  }
}
