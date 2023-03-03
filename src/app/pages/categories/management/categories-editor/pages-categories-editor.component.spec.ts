import { ComponentFixture, fakeAsync, flushMicrotasks, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';
import { WalletTransactionType } from 'src/app/domains/transactions/domains.transactions.constants';
import { MaterialModule } from 'src/app/material.module';
import { PagesTransactionCategoriesService } from '../../pages-transaction-categories.service';
import { TransactionCategory } from '../../transaction-category.model';
import { PagesCategoriesEditorComponent } from './pages-categories-editor.component';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;

describe('PagesCategoriesEditorComponent', () => {
  let component: PagesCategoriesEditorComponent;
  let fixture: ComponentFixture<PagesCategoriesEditorComponent>;
  let ERROR_MESSAGE_REQUIRED: string;
  let transactionCategoriesServiceMock: SpyObj<PagesTransactionCategoriesService>;
  let ERROR_MESSAGE_MAXLENGTH: string;
  let isAlreadyUsedMockResponse: Subject<boolean>;
  let categoryObjectMock: TransactionCategory;

  describe('creating category', () => {
    beforeEach(async () => {
      categoryObjectMock =
        new TransactionCategory({ id: null, name: '', type: WalletTransactionType.Income });
      isAlreadyUsedMockResponse = new Subject<boolean>();

      transactionCategoriesServiceMock = createSpyObj<PagesTransactionCategoriesService>
      (PagesTransactionCategoriesService.name, [ 'isTransactionCategoryAlreadyUsed' ]);
      transactionCategoriesServiceMock.isTransactionCategoryAlreadyUsed.and.returnValue(isAlreadyUsedMockResponse);

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
          { provide: MAT_DIALOG_DATA, useValue: categoryObjectMock },
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
        isAlreadyUsedMockResponse.next(true);
        flushMicrotasks();
        fixture.detectChanges();

        expect(transactionCategoriesServiceMock.isTransactionCategoryAlreadyUsed).not.toHaveBeenCalled();
      }));

      it('should enable type form control', fakeAsync(() => {
        isAlreadyUsedMockResponse.next(true);
        flushMicrotasks();
        fixture.detectChanges();

        const typeDisabled = component.form.get('type')!.disabled;

        expect(typeDisabled).toBeFalse();
      }));

      it('should display "Create Category" title', fakeAsync(() => {
        isAlreadyUsedMockResponse.next(true);
        flushMicrotasks();
        fixture.detectChanges();

        const titleFixture = fixture.debugElement.query(By.css('h1'));
        const title: HTMLDivElement = titleFixture.nativeElement as HTMLDivElement;

        expect(title.textContent!.trim()).toBe('Create Category');
      }));

      it('should set name input as empty string', fakeAsync(() => {
        isAlreadyUsedMockResponse.next(false);
        flushMicrotasks();

        fixture.detectChanges();
        const nameInput = component.form.get('name');

        expect(nameInput!.value).toEqual(categoryObjectMock.name);
      }));

      it('should set type input as Income', fakeAsync(() => {
        isAlreadyUsedMockResponse.next(false);
        flushMicrotasks();

        fixture.detectChanges();
        const typeInput = component.form.get('type');

        expect(typeInput!.value).toEqual(categoryObjectMock.type);
      }));

      it('should disable save button when form is opened', fakeAsync(() => {
        isAlreadyUsedMockResponse.next(false);
        flushMicrotasks();

        fixture.detectChanges();
        const saveBtnFixture = fixture.debugElement.query(By.css('.btn__save'));
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
        isAlreadyUsedMockResponse.next(false);
        flushMicrotasks();

        component.form.get('name')?.setValue('');
        component.form.get('name')?.markAsTouched();
        component.form.get('name')?.markAsDirty();
        fixture.detectChanges();

        const errorMessageFixture = fixture.debugElement.query(By.css('.mat-error'));
        const errorMessage: HTMLDivElement = errorMessageFixture.nativeElement as HTMLDivElement;

        expect(errorMessage.textContent!.trim()).toBe(ERROR_MESSAGE_REQUIRED);
      }));

      it('should show validation error if name input has more than 20 characters', fakeAsync(() => {
        isAlreadyUsedMockResponse.next(false);
        flushMicrotasks();

        component.form.get('name')?.setValue('Text have more than twenty characters for sure');
        component.form.get('name')?.markAsTouched();
        component.form.get('name')?.markAsDirty();
        fixture.detectChanges();

        const errorMessageFixture = fixture.debugElement.query(By.css('.mat-error'));
        const errorMessage: HTMLDivElement = errorMessageFixture.nativeElement as HTMLDivElement;

        expect(errorMessage.textContent!.trim()).toBe(ERROR_MESSAGE_MAXLENGTH);
      }));

      it('should disable save button when form is invalid', fakeAsync(() => {
        isAlreadyUsedMockResponse.next(false);
        flushMicrotasks();

        component.form.get('name')?.setValue('Text have more than twenty characters for sure');
        component.form.get('name')?.markAsTouched();
        component.form.get('name')?.markAsDirty();
        fixture.detectChanges();

        const saveBtnFixture = fixture.debugElement.query(By.css('.btn__save'));
        const saveBtn: HTMLButtonElement = saveBtnFixture.nativeElement as HTMLButtonElement;

        expect(saveBtn.disabled).toBeTrue();
      }));

      it('should enable save button when form is valid', fakeAsync(() => {
        isAlreadyUsedMockResponse.next(false);
        flushMicrotasks();

        component.form.get('name')?.setValue('Only few chars');
        component.form.get('name')?.markAsTouched();
        component.form.get('name')?.markAsDirty();
        fixture.detectChanges();

        const saveBtnFixture = fixture.debugElement.query(By.css('.btn__save'));
        const saveBtn: HTMLButtonElement = saveBtnFixture.nativeElement as HTMLButtonElement;

        expect(saveBtn.disabled).toBeFalse();
      }));
    });
  });

  describe('updating category', () => {
    beforeEach(async () => {
      categoryObjectMock = new TransactionCategory({ id: 1, name: 'Category Name 1', type: WalletTransactionType.Income });
      isAlreadyUsedMockResponse = new Subject<boolean>();

      transactionCategoriesServiceMock = createSpyObj<PagesTransactionCategoriesService>
      (PagesTransactionCategoriesService.name, [ 'isTransactionCategoryAlreadyUsed' ]);
      transactionCategoriesServiceMock.isTransactionCategoryAlreadyUsed.and.returnValue(isAlreadyUsedMockResponse);

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
          { provide: MAT_DIALOG_DATA, useValue: categoryObjectMock },
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
      it('should call api for checking if category is already used', fakeAsync(() => {
        isAlreadyUsedMockResponse.next(true);

        flushMicrotasks();
        fixture.detectChanges();

        expect(transactionCategoriesServiceMock.isTransactionCategoryAlreadyUsed).toHaveBeenCalled();
      }));

      it('should disable type form control when api returns info that category is already used', fakeAsync(() => {
        isAlreadyUsedMockResponse.next(true);

        flushMicrotasks();
        fixture.detectChanges();
        const disabled = component.form.get('type')!.disabled;

        expect(disabled).toBeTrue();
      }));

      it('should enable type form control when api returns info that category is not used already', fakeAsync(() => {
        isAlreadyUsedMockResponse.next(false);

        flushMicrotasks();
        fixture.detectChanges();
        const typeDisabled = component.form.get('type')!.disabled;

        expect(typeDisabled).toBeFalse();
      }));

      it('should set name input as empty string', fakeAsync(() => {
        isAlreadyUsedMockResponse.next(false);
        flushMicrotasks();

        fixture.detectChanges();
        const nameInput = component.form.get('name');

        expect(nameInput!.value).toEqual(categoryObjectMock.name);
      }));

      it('should display "Update Category" title', fakeAsync(() => {
        isAlreadyUsedMockResponse.next(true);
        flushMicrotasks();
        fixture.detectChanges();

        const titleFixture = fixture.debugElement.query(By.css('h1'));
        const errorMessage: HTMLDivElement = titleFixture.nativeElement as HTMLDivElement;

        expect(errorMessage.textContent!.trim()).toBe('Update Category');
      }));
    });
  });
});
