import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  TransactionTypeMatSelectComponent,
} from 'src/app/common/components/mat-controls/transaction-type-mat-select/transaction-type-mat-select.component';
import { MaterialModule } from 'src/app/material.module';
import { PagesWalletTransactionEditorComponent } from './pages-wallet-transaction-editor.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import SpyObj = jasmine.SpyObj;
import createSpyObj = jasmine.createSpyObj;
import { PagesWalletsManagementEditorComponent }
  from '../../management/wallet-editor/pages-wallets-management-editor.component';
import { WALLET_TRANSACTIONS_EXPENSE_MOCK } from 'src/app/domains/wallets/domains.wallets.mocks';

describe('TransactionEditorComponent', () => {
  let component: PagesWalletTransactionEditorComponent;
  let fixture: ComponentFixture<PagesWalletTransactionEditorComponent>;
  let ERROR_MESSAGE_MIN_AMOUNT: string;
  let matDialogMock: SpyObj<MatDialog>;
  let matDialogRef: SpyObj<MatDialogRef<PagesWalletsManagementEditorComponent>>;

  beforeEach(async () => {
    ERROR_MESSAGE_MIN_AMOUNT = 'Amount must be bigger than 0';
    matDialogRef = createSpyObj<MatDialogRef<PagesWalletsManagementEditorComponent>>(MatDialogRef.name, [ 'close' ]);
    matDialogRef.close.and.callThrough();
    matDialogMock = createSpyObj<MatDialog>(MatDialog.name, [ 'open' ]);
    matDialogMock.open.and.returnValue(matDialogRef);

    await TestBed.configureTestingModule({
      declarations: [
        PagesWalletTransactionEditorComponent,
        TransactionTypeMatSelectComponent,
      ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MaterialModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: null },
        { provide: MatDialog, useValue: matDialogMock },
        { provide: MAT_DIALOG_DATA, useValue: WALLET_TRANSACTIONS_EXPENSE_MOCK },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PagesWalletTransactionEditorComponent);
    TestBed.inject<HttpTestingController>(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('form validation', () => {
    describe('Init form values', () => {
      it('amount', () => {
        const x = component.form.get('amount');
        expect(x!.value).toBe(WALLET_TRANSACTIONS_EXPENSE_MOCK.amount);
      });

      it('description', () => {
        const x = component.form.get('description');
        expect(x!.value).toBe(WALLET_TRANSACTIONS_EXPENSE_MOCK.description);
      });

      it('date', () => {
        const x = component.form.get('date');
        expect(x!.value).toEqual(WALLET_TRANSACTIONS_EXPENSE_MOCK.date);
      });

      it('type', () => {
        const x = component.form.get('type');
        expect(x!.value).toEqual(WALLET_TRANSACTIONS_EXPENSE_MOCK.type);
      });
    });

    describe('amount field validation', () => {
      describe('error', () => {
        it('should show validation error if amount input is 0', () => {
          component.form.get('amount')?.setValue(0);
          component.form.get('amount')?.markAsTouched();

          fixture.detectChanges();
          const errorMessageDiv = fixture.debugElement.query(By.css('.mat-error'));
          const errorMessageText: HTMLDivElement = errorMessageDiv.nativeElement as HTMLDivElement;

          expect(errorMessageText.textContent!.trim()).toBe(ERROR_MESSAGE_MIN_AMOUNT);
        });

        it('should show validation error if amount input is less than 0', () => {
          component.form.get('amount')?.setValue(-10);
          component.form.get('amount')?.markAsTouched();

          fixture.detectChanges();
          const errorMessageDiv = fixture.debugElement.query(By.css('.mat-error'));
          const errorMessageText: HTMLDivElement = errorMessageDiv.nativeElement as HTMLDivElement;

          expect(errorMessageText.textContent!.trim()).toBe(ERROR_MESSAGE_MIN_AMOUNT);
        });
      });

      describe('success', () => {
        it('should show no validation error if amount input is bigger than 0', () => {
          component.form.get('amount')?.setValue(10);
          component.form.get('amount')?.markAsTouched();

          fixture.detectChanges();

          const errorMessageDiv = fixture.debugElement.query(By.css('.mat-error'));
          expect(errorMessageDiv).toBeFalsy();
        });
      });
    });

    describe('description field validation', () => {
      describe('error', () => {
        it('should show no validation error if description input is empty', () => {
          component.form.get('description')?.setValue('');
          component.form.get('description')?.markAsTouched();

          fixture.detectChanges();

          const errorMessageDiv = fixture.debugElement.query(By.css('.mat-error'));
          expect(errorMessageDiv).toBeFalsy();
        });
      });

      describe('success', () => {
        it('should show validation error if description input is filled', () => {
          component.form.get('description')?.setValue('Some description');
          component.form.get('description')?.markAsTouched();

          fixture.detectChanges();

          const errorMessageDiv = fixture.debugElement.query(By.css('.mat-error'));
          expect(errorMessageDiv).toBeFalsy();
        });
      });
    });

    describe('date field validation', () => {
      describe('success', () => {
        it('should show validation error if description input is filled', () => {
          component.form.get('date')?.setValue(new Date());
          component.form.get('date')?.markAsTouched();

          fixture.detectChanges();

          const errorMessageDiv = fixture.debugElement.query(By.css('.mat-error'));
          expect(errorMessageDiv).toBeFalsy();
        });
      });
    });
  });

  describe('save method', () => {
    describe('invalid form', () => {
      it('should set form as not valid', () => {
        component.form.get('amount')?.setValue(0);
        component.form.get('amount')?.markAsTouched();
        fixture.detectChanges();

        const errorMessageDiv: HTMLButtonElement =
          fixture.debugElement.query(By.css('.btn__save')).nativeElement as HTMLButtonElement;
        errorMessageDiv.click();
        fixture.detectChanges();

        expect(component.form.valid).toBeFalse();
      });

      it('should not invoke close dialogRef if amount form in invalid', () => {
        component.form.get('amount')?.setValue(0);
        component.form.get('amount')?.markAsTouched();
        fixture.detectChanges();

        const errorMessageDiv: HTMLButtonElement =
          fixture.debugElement.query(By.css('.btn__save')).nativeElement as HTMLButtonElement;
        errorMessageDiv.click();
        fixture.detectChanges();

        expect(matDialogRef.close).not.toHaveBeenCalled();
      });
    });

    describe('valid form', () => {
      it('should set form as valid', () => {
        component.form.get('amount')?.setValue(10);
        component.form.get('amount')?.markAsTouched();

        fixture.detectChanges();

        const errorMessageDiv: HTMLButtonElement =
          fixture.debugElement.query(By.css('.btn__save')).nativeElement as HTMLButtonElement;
        errorMessageDiv.click();

        fixture.detectChanges();

        expect(component.form.valid).toBeTrue();
      });

      it('should invoke close dialogRef if amount form in valid', () => {
        component.form.get('amount')?.setValue(10);
        component.form.get('amount')?.markAsTouched();
        fixture.detectChanges();

        const errorMessageDiv: HTMLButtonElement =
          fixture.debugElement.query(By.css('.btn__save')).nativeElement as HTMLButtonElement;
        errorMessageDiv.click();
        fixture.detectChanges();

        expect(matDialogRef.close).toHaveBeenCalled(); //help!
      });
    });
  });
});
