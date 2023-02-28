import { ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';
import { SystemMessageComponent } from 'src/app/common/components/system-message/system-message.component';
import { LoadingModalComponent } from 'src/app/common/loading-modal/loading-modal.component';
import { transactionCategoriesObjectsMockFunc } from 'src/app/domains/categories/domains.transaction-categories.mocks';
import { WalletTransactionType } from 'src/app/domains/transactions/domains.transactions.constants';
import { MaterialModule } from 'src/app/material.module';
import { TransactionCategory } from '../transaction-category.model';
import { PagesCategoriesManagementComponent } from './pages-categories-management.component';
import { PagesTransactionCategoriesService } from '../pages-transaction-categories.service';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import { NoResultsComponent } from 'src/app/common/components/no-results/no-results.component';
import { sortAlphabeticallyByProp } from 'src/app/common/utils/sorts/common.util.sort,sortAlphabeticallyByProp';

describe('PagesCategoriesManagementComponent', () => {
  let component: PagesCategoriesManagementComponent;
  let fixture: ComponentFixture<PagesCategoriesManagementComponent>;
  let pagesTransactionCategoriesServiceMock: SpyObj<PagesTransactionCategoriesService>;
  let categoriesSubject: Subject<TransactionCategory[]>;

  beforeEach(async () => {
    categoriesSubject = new Subject<TransactionCategory[]>();

    pagesTransactionCategoriesServiceMock = createSpyObj<PagesTransactionCategoriesService>
    (PagesTransactionCategoriesService.name, [ 'getCategories' ]);
    pagesTransactionCategoriesServiceMock.getCategories.and.returnValue(categoriesSubject.asObservable());

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
      }));
    });
  });
});
