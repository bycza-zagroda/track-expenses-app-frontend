import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, flushMicrotasks, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';
import { SystemMessageComponent } from 'src/app/common/components/system-message/system-message.component';
import { LoadingModalComponent } from 'src/app/common/loading-modal/loading-modal.component';
import {
  createdTransactionCategoryObjectMockFunc,
  transactionCategoriesObjectsMockFunc,
  updatedTransactionCategoryObjectMockFunc,
} from 'src/app/domains/categories/domains.transaction-categories.mocks';
import { WalletTransactionType } from 'src/app/domains/transactions/domains.transactions.constants';
import { MaterialModule } from 'src/app/material.module';
import { TransactionCategory } from '../transaction-category.model';
import { PagesCategoriesManagementComponent } from './pages-categories-management.component';
import { PagesTransactionCategoriesService } from '../pages-transaction-categories.service';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import { NoResultsComponent } from 'src/app/common/components/no-results/no-results.component';
import { sortAlphabeticallyByProp } from 'src/app/common/utils/sorts/common.util.sort.';
import { PagesCategoriesEditorService } from './categories-editor/pages-categories-editor.service';

describe('PagesCategoriesManagementComponent', () => {
  let component: PagesCategoriesManagementComponent;
  let fixture: ComponentFixture<PagesCategoriesManagementComponent>;
  let pagesTransactionCategoriesServiceMock: SpyObj<PagesTransactionCategoriesService>;
  let pagesCategoriesEditorServiceMock: SpyObj<PagesCategoriesEditorService>;
  let categoriesSubject: Subject<TransactionCategory[]>;
  let editorSubject: Subject<TransactionCategory | null>;

  beforeEach(async () => {
    categoriesSubject = new Subject<TransactionCategory[]>();
    editorSubject = new Subject<TransactionCategory | null>();

    pagesTransactionCategoriesServiceMock = createSpyObj<PagesTransactionCategoriesService>
    (PagesTransactionCategoriesService.name, [ 'getCategories' ]);
    pagesTransactionCategoriesServiceMock.getCategories.and.returnValue(categoriesSubject.asObservable());

    pagesCategoriesEditorServiceMock = createSpyObj<PagesCategoriesEditorService>
    (PagesCategoriesEditorService.name, [ 'openEditor' ]);
    pagesCategoriesEditorServiceMock.openEditor.and.returnValue(editorSubject.asObservable());

    await TestBed.configureTestingModule({
      declarations: [
        PagesCategoriesManagementComponent,
        LoadingModalComponent,
        SystemMessageComponent,
        NoResultsComponent,
      ],
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: PagesTransactionCategoriesService, useValue: pagesTransactionCategoriesServiceMock },
        { provide: PagesCategoriesEditorService, useValue: pagesCategoriesEditorServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PagesCategoriesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    describe('get transaction categories', () => {
      describe('success', () => {
        describe('empty table', () => {
          it('should not display table', fakeAsync(() => {
            categoriesSubject.next([]);
            flushMicrotasks();
            fixture.detectChanges();

            const table = fixture.debugElement.query(
              By.css('.mat-table'),
            );

            expect(table).toBeFalsy();
          }));
        });

        describe('not empty table', () => {
          it('should display categories in table', fakeAsync(() => {
            categoriesSubject.next(transactionCategoriesObjectsMockFunc());
            flushMicrotasks();
            fixture.detectChanges();

            const table = fixture.debugElement.query(
              By.css('.mat-table'),
            ).nativeElement as HTMLDivElement;

            const sortecCategories = sortAlphabeticallyByProp<TransactionCategory, 'name'>
            (transactionCategoriesObjectsMockFunc(), 'name');

            expect(table).toBeTruthy();
            expect(component.transactionCategoriesData.hasError).toBeFalse();
            expect(component.transactionCategoriesData.data).toEqual(sortecCategories);
          }));
        });
      });

      describe('error', () => {
        it('should set TStateData.error as true and data as null', fakeAsync(() => {
          categoriesSubject.error('Some error');
          flushMicrotasks();

          expect(component.transactionCategoriesData.hasError).toBeTrue();
          expect(component.transactionCategoriesData.data).toEqual(null);
        }));

        it('should display error wall', fakeAsync(() => {
          categoriesSubject.error('Some error');
          flushMicrotasks();
          fixture.detectChanges();

          const messageDiv = fixture.debugElement.query(
            By.css('.message-container'),
          ).nativeElement as HTMLDivElement;

          expect(messageDiv).toBeTruthy();
        }));
      });
    });
  });

  describe('filter transactions', () => {
    let matSelect: HTMLDivElement;

    beforeEach( fakeAsync(() => {
      categoriesSubject.next(transactionCategoriesObjectsMockFunc());
      flushMicrotasks();
      fixture.detectChanges();

      matSelect = fixture.debugElement.query(
        By.css('.mat-select-trigger'),
      ).nativeElement as HTMLDivElement;

      matSelect.click();
      fixture.detectChanges();
    }));

    describe('filter categories by Expenses', () => {
      it('selected Expenses on select-box should filter categories with expense type', fakeAsync( async () => {
        const expensesOption: HTMLDivElement = fixture.debugElement.queryAll(
          By.css('.mat-option'),
        )[1].nativeElement as HTMLDivElement;
        expensesOption.click();
        fixture.detectChanges();
        flushMicrotasks();
        flush();

        await fixture.whenStable();

        expect(component.displayedCategories.length)
          .toBe(transactionCategoriesObjectsMockFunc().filter(c => c.type === WalletTransactionType.Expense).length);

        discardPeriodicTasks();
        flush();
      }));
    });

    describe('filter categories by Incomes', () => {
      it('selected Incomes on select-box should filter categories with incomes type', fakeAsync( async () => {
        const incomesOption: HTMLElement = fixture.debugElement.queryAll(
          By.css('.mat-option'),
        )[2].nativeElement as HTMLDivElement;

        incomesOption.click();
        fixture.detectChanges();
        flushMicrotasks();
        flush();

        await fixture.whenStable();

        expect(component.displayedCategories.length)
          .toBe(transactionCategoriesObjectsMockFunc().filter(c => c.type === WalletTransactionType.Income).length);

        discardPeriodicTasks();
        flush();
      }));
    });
  });

  describe('handleCreateCategory', () => {
    beforeEach( fakeAsync( () => {
      categoriesSubject.next(transactionCategoriesObjectsMockFunc());
      flushMicrotasks();
      fixture.detectChanges();
    }));

    describe('click income button', () => {
      it('should invoke openEditor with TransactionCategory object with Income transaction type', fakeAsync( () => {
        const createTransactionIncomeFixture = fixture.debugElement.query(
          By.css('button.income'),
        );
        const btn: HTMLButtonElement = createTransactionIncomeFixture.nativeElement as HTMLButtonElement;

        btn.click();
        fixture.detectChanges();

        expect(pagesCategoriesEditorServiceMock.openEditor)
          .toHaveBeenCalledWith(new TransactionCategory({ id: null, name: '', type: WalletTransactionType.Income }));

        flush();
      }));
    });

    describe('click expense button', () => {
      it('should invoke openEditor with TransactionCategory object with expense transaction type', fakeAsync( () => {
        const createTransactionExpenseFixture = fixture.debugElement.query(
          By.css('button.expense'),
        );
        const btn: HTMLButtonElement = createTransactionExpenseFixture.nativeElement as HTMLButtonElement;

        btn.click();
        fixture.detectChanges();

        expect(pagesCategoriesEditorServiceMock.openEditor)
          .toHaveBeenCalledWith(new TransactionCategory({ id: null, name: '', type: WalletTransactionType.Expense }));

        flush();
      }));
    });

    describe('close editor', () => {
      beforeEach(() => {
        const createTransactionExpenseFixture = fixture.debugElement.query(
          By.css('button.expense'),
        );
        const btn: HTMLButtonElement = createTransactionExpenseFixture.nativeElement as HTMLButtonElement;

        btn.click();
        fixture.detectChanges();
      });

      describe('with null', () => {
        it('nunber of objects should remain unchanged',  fakeAsync( () => {
          editorSubject.next(null);
          flushMicrotasks();

          fixture.detectChanges();

          expect(component.transactionCategoriesData.data!.length).toBe(3);
        }));
      });

      describe('with created object', () => {
        it('should add new object to TState.data', fakeAsync(() => {
          const returnedObject = createdTransactionCategoryObjectMockFunc(WalletTransactionType.Expense);
          editorSubject.next(returnedObject);

          flushMicrotasks();
          fixture.detectChanges();
          const created = component.transactionCategoriesData.data!.find(c => c.id === returnedObject.id)!;

          expect(created.name).toBe(returnedObject.name);
          expect(component.transactionCategoriesData.data!.length).toBe(4);
        }));
      });
    });
  });

  describe('handleUpdateCategory', () => {
    beforeEach( fakeAsync( () => {
      categoriesSubject.next(transactionCategoriesObjectsMockFunc());
      flushMicrotasks();
      fixture.detectChanges();
    }));

    describe('click edit button', () => {
      it('should invoke openEditor with TransactionCategory object', fakeAsync( () => {
        const createTransactionIncomeFixture = fixture.debugElement.queryAll(
          By.css('.updateBtn'),
        );
        const btn: HTMLButtonElement = createTransactionIncomeFixture[0].nativeElement as HTMLButtonElement;

        btn.click();
        fixture.detectChanges();

        expect(pagesCategoriesEditorServiceMock.openEditor)
          .toHaveBeenCalledWith(sortAlphabeticallyByProp(transactionCategoriesObjectsMockFunc(), 'name')[0]);

        flush();
      }));
    });

    describe('close editor', () => {
      beforeEach(() => {
        const createTransactionExpenseFixture = fixture.debugElement.query(
          By.css('.updateBtn'),
        );
        const btn: HTMLButtonElement = createTransactionExpenseFixture.nativeElement as HTMLButtonElement;

        btn.click();
        fixture.detectChanges();
      });

      describe('with null', () => {
        it('munber of objects should remain unchanged',  fakeAsync(() => {
          editorSubject.next(null);
          flushMicrotasks();

          fixture.detectChanges();

          expect(component.transactionCategoriesData.data!.length).toBe(3);
        }));
      });

      describe('with updated object', () => {
        it('should update object data', fakeAsync(() => {
          const returnedObject = updatedTransactionCategoryObjectMockFunc();
          editorSubject.next(returnedObject);

          flushMicrotasks();
          fixture.detectChanges();
          const updated = component.transactionCategoriesData.data!.find(c => c.id === returnedObject.id)!;

          expect(updated.name).toBe(returnedObject.name);
        }));
      });
    });
  });
});
