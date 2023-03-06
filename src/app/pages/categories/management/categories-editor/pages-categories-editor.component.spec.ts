import { ComponentFixture, fakeAsync, flush, flushMicrotasks, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';
import { SystemNotificationsService } from 'src/app/common/utils/system-notifications/system-notifications.service';
import { NotificationType } from 'src/app/common/utils/system-notifications/system.notifications.constants';
import { categoryFullObjectMockFunc } from 'src/app/domains/categories/domains.transaction-categories.mocks';
import { WalletTransactionType } from 'src/app/domains/transactions/domains.transactions.constants';
import { MaterialModule } from 'src/app/material.module';
import { PagesTransactionCategoriesService } from '../../pages-transaction-categories.service';
import { TransactionCategoryFull } from '../../transaction-category-full.model';
import { PagesCategoriesEditorComponent } from './pages-categories-editor.component';
import { ITransactionCategoryEditorPayload } from './pages-categories-editor.types';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('PagesCategoriesEditorComponent', () => {
  let component: PagesCategoriesEditorComponent;
  let fixture: ComponentFixture<PagesCategoriesEditorComponent>;
  let ERROR_MESSAGE_REQUIRED: string;
  let ERROR_MESSAGE_ALREADY_USED: string;
  let transactionCategoriesServiceMock: SpyObj<PagesTransactionCategoriesService>;
  let notificationServiceMock: SpyObj<SystemNotificationsService>;
  let ERROR_MESSAGE_MAXLENGTH: string;
  let categoryFullObjectSubjectMockResponse: Subject<TransactionCategoryFull>;
  let categoryPayloadMock: ITransactionCategoryEditorPayload;
  let categoryFullObjectMock_counter0: TransactionCategoryFull;
  let categoryFullObjectMock_counter2: TransactionCategoryFull;
  let dialogRefMock: SpyObj<MatDialogRef<PagesCategoriesEditorComponent>>;

  describe('creating category', () => {
    beforeEach(async () => {
      categoryPayloadMock = { type: WalletTransactionType.Income };
      categoryFullObjectSubjectMockResponse = new Subject<TransactionCategoryFull>();
      categoryFullObjectMock_counter0 = categoryFullObjectMockFunc(0);
      categoryFullObjectMock_counter2 = categoryFullObjectMockFunc(2);

      transactionCategoriesServiceMock = createSpyObj<PagesTransactionCategoriesService>
      (PagesTransactionCategoriesService.name, [ 'getTransactionCategoryById' ]);
      transactionCategoriesServiceMock.getTransactionCategoryById.and.returnValue(categoryFullObjectSubjectMockResponse);

      await TestBed.configureTestingModule({
        declarations: [
          PagesCategoriesEditorComponent,
        ],
        imports: [
          ReactiveFormsModule,
          MaterialModule,
          NoopAnimationsModule,
        ],
        providers: [
          { provide: MatDialogRef, useValue: null },
          { provide: MAT_DIALOG_DATA, useValue: categoryPayloadMock },
          { provide: PagesTransactionCategoriesService, useValue: transactionCategoriesServiceMock },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(PagesCategoriesEditorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('ngOnInit', () => {
      it('should not call api for checking if category is already used', fakeAsync(() => {
        categoryFullObjectSubjectMockResponse.next(categoryFullObjectMock_counter0);
        flushMicrotasks();
        fixture.detectChanges();

        expect(transactionCategoriesServiceMock.getTransactionCategoryById).not.toHaveBeenCalled();
      }));

      it('should enable type form control', fakeAsync(() => {
        categoryFullObjectSubjectMockResponse.next(categoryFullObjectMock_counter0);
        flushMicrotasks();
        fixture.detectChanges();

        const typeDisabled = component.form!.get('type')!.disabled;

        expect(typeDisabled).toBeFalse();
      }));

      it('should display "Create Category" title', fakeAsync(() => {
        categoryFullObjectSubjectMockResponse.next(categoryFullObjectMock_counter0);
        flushMicrotasks();
        fixture.detectChanges();

        const titleFixture = fixture.debugElement.query(By.css('h1'));
        const title: HTMLDivElement = titleFixture.nativeElement as HTMLDivElement;

        expect(title.textContent!.trim()).toBe('Create Category');
      }));

      it('should set name input as empty string', fakeAsync(() => {
        categoryFullObjectSubjectMockResponse.next(categoryFullObjectMock_counter2);
        flushMicrotasks();

        fixture.detectChanges();
        const nameInput = component.form!.get('name');

        expect(nameInput!.value).toEqual('');
      }));

      it('should set type input as Income', fakeAsync(() => {
        categoryFullObjectSubjectMockResponse.next(categoryFullObjectMock_counter2);
        flushMicrotasks();

        fixture.detectChanges();
        const typeInput = component.form!.get('type');

        expect(typeInput!.value).toEqual(categoryFullObjectMock_counter0.type);
      }));

      it('should disable save button when form is opened', fakeAsync(() => {
        categoryFullObjectSubjectMockResponse.next(categoryFullObjectMock_counter2);
        flushMicrotasks();

        fixture.detectChanges();
        const saveBtnFixture = fixture.debugElement.queryAll(By.css('.mat-button-base'))[1];
        const saveBtn: HTMLButtonElement = saveBtnFixture.nativeElement as HTMLButtonElement;

        expect(saveBtn.disabled).toBeTrue();
      }));
    });

    describe('form validation', () => {
      beforeEach( () => {
        ERROR_MESSAGE_REQUIRED = 'Name is required';
        ERROR_MESSAGE_MAXLENGTH = 'Name can\'t have more than 20 characters';
      });

      it('should show validation error if name input is empty', fakeAsync(() => {
        categoryFullObjectSubjectMockResponse.next(categoryFullObjectMock_counter2);
        flushMicrotasks();

        component.form!.get('name')?.setValue('');
        component.form!.get('name')?.markAsTouched();
        component.form!.get('name')?.markAsDirty();
        fixture.detectChanges();

        const errorMessageFixture = fixture.debugElement.query(By.css('.mat-error'));
        const errorMessage: HTMLDivElement = errorMessageFixture.nativeElement as HTMLDivElement;

        expect(errorMessage.textContent!.trim()).toBe(ERROR_MESSAGE_REQUIRED);
      }));

      it('should show validation error if name input has more than 20 characters', fakeAsync(() => {
        categoryFullObjectSubjectMockResponse.next(categoryFullObjectMock_counter2);
        flushMicrotasks();

        component.form!.get('name')?.setValue('Text have more than twenty characters for sure');
        component.form!.get('name')?.markAsTouched();
        component.form!.get('name')?.markAsDirty();
        fixture.detectChanges();

        const errorMessageFixture = fixture.debugElement.query(By.css('.mat-error'));
        const errorMessage: HTMLDivElement = errorMessageFixture.nativeElement as HTMLDivElement;

        expect(errorMessage.textContent!.trim()).toBe(ERROR_MESSAGE_MAXLENGTH);
      }));

      it('should disable save button when form is invalid', fakeAsync(() => {
        categoryFullObjectSubjectMockResponse.next(categoryFullObjectMock_counter2);
        flushMicrotasks();

        component.form!.get('name')?.setValue('Text have more than twenty characters for sure');
        component.form!.get('name')?.markAsTouched();
        component.form!.get('name')?.markAsDirty();
        fixture.detectChanges();

        const saveBtnFixture = fixture.debugElement.queryAll(By.css('.mat-button-base'))[1];
        const saveBtn: HTMLButtonElement = saveBtnFixture.nativeElement as HTMLButtonElement;

        expect(saveBtn.disabled).toBeTrue();
      }));

      it('should enable save button when form is valid', fakeAsync(() => {
        categoryFullObjectSubjectMockResponse.next(categoryFullObjectMock_counter2);
        flushMicrotasks();

        component.form!.get('name')?.setValue('Only few chars');
        component.form!.get('name')?.markAsTouched();
        component.form!.get('name')?.markAsDirty();
        fixture.detectChanges();

        const saveBtnFixture = fixture.debugElement.queryAll(By.css('.mat-button-base'))[1];
        const saveBtn: HTMLButtonElement = saveBtnFixture.nativeElement as HTMLButtonElement;

        expect(saveBtn.disabled).toBeFalse();
      }));
    });
  });

  describe('updating category', () => {
    beforeEach(async () => {
      categoryPayloadMock = { type: WalletTransactionType.Expense, categoryId: 1 };
      categoryFullObjectSubjectMockResponse = new Subject<TransactionCategoryFull>();
      categoryFullObjectMock_counter0 = categoryFullObjectMockFunc(0);
      categoryFullObjectMock_counter2 = categoryFullObjectMockFunc(2);
      ERROR_MESSAGE_ALREADY_USED = 'Category is already used by transaction(s)';

      transactionCategoriesServiceMock = createSpyObj<PagesTransactionCategoriesService>
      (PagesTransactionCategoriesService.name, [ 'getTransactionCategoryById' ]);
      transactionCategoriesServiceMock.getTransactionCategoryById.and.returnValue(categoryFullObjectSubjectMockResponse);

      notificationServiceMock = createSpyObj<SystemNotificationsService>
      (SystemNotificationsService.name, [ 'showNotification' ]);

      dialogRefMock = createSpyObj<MatDialogRef<PagesCategoriesEditorComponent>>(MatDialogRef.name, [ 'close' ]);

      await TestBed.configureTestingModule({
        declarations: [
          PagesCategoriesEditorComponent,
        ],
        imports: [
          ReactiveFormsModule,
          MaterialModule,
          NoopAnimationsModule,
        ],
        providers: [
          { provide: MatDialogRef, useValue: dialogRefMock },
          { provide: MAT_DIALOG_DATA, useValue: categoryPayloadMock },
          { provide: PagesTransactionCategoriesService, useValue: transactionCategoriesServiceMock },
          { provide: SystemNotificationsService, useValue: notificationServiceMock },
        ],
      }).compileComponents();

      fixture = TestBed.createComponent(PagesCategoriesEditorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('ngOnInit', () => {
      it('should call api for checking if category is already used', fakeAsync(() => {
        categoryFullObjectSubjectMockResponse.next(categoryFullObjectMock_counter0);

        flushMicrotasks();
        fixture.detectChanges();

        expect(transactionCategoriesServiceMock.getTransactionCategoryById).toHaveBeenCalled();
      }));

      describe('should receive data from api', () => {
        describe('error', () => {
          it('should invoke error notification', fakeAsync(() => {
            categoryFullObjectSubjectMockResponse.error('error');

            flushMicrotasks();
            fixture.detectChanges();
            flush();

            expect(notificationServiceMock.showNotification).toHaveBeenCalledWith({
              message: 'Could not open category editor',
              type: NotificationType.Error,
            });
          }));
        });

        describe('success', () => {
          it('should disable type form control when api returns info that category is already used', fakeAsync(() => {
            categoryFullObjectSubjectMockResponse.next(categoryFullObjectMock_counter2);

            flushMicrotasks();
            fixture.detectChanges();
            const disabled = component.form!.get('type')!.disabled;

            expect(disabled).toBeTrue();
          }));

          it('should display hint when type form control is disabled', fakeAsync(() => {
            categoryFullObjectSubjectMockResponse.next(categoryFullObjectMock_counter2);

            flushMicrotasks();
            fixture.detectChanges();
            const hintFixture = fixture.debugElement.query(By.css('.mat-hint'));
            const hint: HTMLDivElement = hintFixture.nativeElement as HTMLDivElement;

            expect(hint.textContent?.trim()).toBe(ERROR_MESSAGE_ALREADY_USED);
          }));

          it('should enable type form control when api returns info that category is not used already', fakeAsync(() => {
            categoryFullObjectSubjectMockResponse.next(categoryFullObjectMock_counter0);

            flushMicrotasks();
            fixture.detectChanges();
            const typeDisabled = component.form!.get('type')!.disabled;

            expect(typeDisabled).toBeFalse();
          }));

          it('should set name input as empty string', fakeAsync(() => {
            categoryFullObjectSubjectMockResponse.next(categoryFullObjectMock_counter2);
            flushMicrotasks();

            fixture.detectChanges();
            const nameInput = component.form!.get('name');

            expect(nameInput!.value).toEqual(categoryFullObjectMock_counter0.name);
          }));

          it('should display "Update Category" title', fakeAsync(() => {
            categoryFullObjectSubjectMockResponse.next(categoryFullObjectMock_counter0);
            flushMicrotasks();
            fixture.detectChanges();

            const titleFixture = fixture.debugElement.query(By.css('h1'));
            const errorMessage: HTMLDivElement = titleFixture.nativeElement as HTMLDivElement;

            expect(errorMessage.textContent!.trim()).toBe('Update Category');
          }));
        });
      });
    });
  });
});
